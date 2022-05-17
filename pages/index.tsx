import type { NextPage } from 'next';
import Head from 'next/head';
import Start from '../components/Start';
import pixsConfig from '../pixs.config';
import { actionObject } from '../components/SideBar/types';
import { axiosGetIpInterceptor, axiosObjectInterceptor, axiosPostIpInterceptor } from '../utils/axiosInterceptor';
import { AppError } from '../utils/error';
import useStore from '../utils/store/globalStore';
import Modal from '../components/Modal';

import { useState } from 'react';

interface IProps {
  actionsList: actionObject[];
  cookie: string;
  uploadingAndDownloadingAction: actionObject[];
  error?: string;
}

const Home: NextPage<IProps> = (props: IProps) => {
  const showModal: boolean = useStore((state) => state.showModal);
  const [errorOccurred, setErrorOccurred] = useState(false);
  let actionsOfNewCookie: actionObject[] = [];
  const { uploadedImage, setUploadedImage, clearUploadedImage } = useStore();

  if (typeof props.error !== 'undefined') {
    handleError(props.error);
  }

  async function getDownloadImage() {
    let res = null;
    try {
      res = await axiosPostIpInterceptor(pixsConfig.backend.external_address, new FormData(), { withCredentials: true });
    } catch (error) {
      console.log('error');
    }

    const parsedResult: Omit<IProps, 'error'> = parseActions(res);
    const downloadingAction: actionObject = parsedResult.uploadingAndDownloadingAction[1];
    actionsOfNewCookie = parsedResult.actionsList;

    let res2 = null;
    try {
      res2 = await axiosObjectInterceptor({
        method: 'get',
        url: pixsConfig.backend.external_address + downloadingAction.path,
        responseType: 'blob',
        withCredentials: true,
      });
    } catch (error: any) {
      // throws 500 error if no image is available
      //todo: handle error
      return;
    }

    if (uploadedImage === null) {
      setUploadedImage(res2.data);
    }
    // console.log(res2);
  }

  // handle cookie
  if (typeof document !== 'undefined') {
    const prevCookie: string | null = getSessionIdCookieIfAvailable(document);

    if (prevCookie !== null) {
      document.cookie = prevCookie;

      getDownloadImage().then(() => {
        // console.log('done');
      });
    } else {
      document.cookie = props.cookie;
    }
  }

  function handleError(error: string) {
    console.log(error);
    if (!errorOccurred) setErrorOccurred(true);
    // initModalForError();
  }

  return (
    <div>
      <Head>
        <title>PiXS - Image Manipulation Extended</title>
        <meta name='description' content='PiXS - Image Manipulation Extended' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {errorOccurred && <Modal />}
      {!errorOccurred && <Start actionsList={actionsOfNewCookie.length === 0 ? props.actionsList : actionsOfNewCookie} uploadingAndDownloadingAction={props.uploadingAndDownloadingAction} onError={(error: AppError) => handleError(error.message)} />}
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  let response;

  try {
    response = await axiosGetIpInterceptor(pixsConfig.backend.external_address);
  } catch (error: AppError | any) {
    if (error instanceof AppError) {
      return { props: returnPropsForOnError(error) };
    } else {
      return { props: returnPropsForOnError(new AppError('InternalServerError', 'Loading data failed', error.message)) };
    }
  }

  let parsedResponse = parseActions(response);

  if (parsedResponse.cookie == '') {
    return { props: returnPropsForOnError(new AppError('InternalServerError', 'No cookie received')) };
  }

  // setting icons accordingly
  for (let action of parsedResponse.actionsList) {
    action.icon = action.icon == '' ? pixsConfig.iconPlaceholder : pixsConfig.backend.external_address + action.icon;
  }

  return {
    props: {
      actionsList: parsedResponse.actionsList,
      cookie: parsedResponse.cookie,
      uploadingAndDownloadingAction: parsedResponse.uploadingAndDownloadingAction,
    },
  };
}

function parseActions(response: any): Omit<IProps, 'error'> {
  return {
    uploadingAndDownloadingAction: response.data.actions.slice(0, 3),
    actionsList: response.data.actions.slice(3),
    cookie: response.headers['set-cookie'] ? response.headers['set-cookie'][0] : '',
  };
}

function returnPropsForOnError(error: AppError): IProps {
  return {
    actionsList: getMockDataForOnError(),
    cookie: '',
    uploadingAndDownloadingAction: getMockDataForOnError(),
    error: error.message,
  };
}

function getMockDataForOnError(): actionObject[] {
  return [
    {
      name: 'customAction1',
      displayName: 'Action 1',
      icon: '/servestatic/icon/testIcon.svg',
      active: false,
      description: 'Description for an action',
      path: '/execute/customAction1',
    },
    {
      name: 'customAction2',
      displayName: 'Action 2',
      icon: '/servestatic/icon/testIcon.svg',
      active: false,
      description: 'Description for an action',
      path: '/execute/customAction2',
    },
  ];
}

function initModalForError(text?: string) {
  const setShowModal = useStore((state) => state.setShowModal);
  const setModalHeading = useStore((state) => state.setModalHeading);
  const setModalBody = useStore((state) => state.setModalBody);
  const setModalButton = useStore((state) => state.setModalButton);
  const setModalButtonOnClick = useStore((state) => state.setModalButtonOnClick);

  function handleReload() {
    setShowModal(false);
    // @ts-ignore
    window.location.reload(true);
  }

  setModalHeading('An error occured');
  setModalBody('An error occurred. Please reload the page and try again.');
  setModalButton('Reload');
  setModalButtonOnClick(handleReload);
  setShowModal(true);
}

function getSessionIdCookieIfAvailable(document: any): string | null {
  const cookies: string[] = document.cookie.split(';').map((cookie: string) => cookie.trim());
  const sessionId: string[] = cookies.filter((c: string) => c.includes('sessionid'));

  if (sessionId.length === 0) {
    return null;
  }

  return sessionId[0].split('=')[1];
}
