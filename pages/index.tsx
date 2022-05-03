import type { NextPage } from 'next';
import Head from 'next/head';
import Start from '../components/Start';
import pixsConfig from '../pixs.config';
import { actionObject } from '../components/SideBar/types';
import { axiosGetIpInterceptor } from '../utils/axiosInterceptor';
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

  if (typeof props.error !== 'undefined') {
    handleError(props.error);
  }

  if (typeof document !== 'undefined') {
    document.cookie = props.cookie;
    // ! DEBUG
    // console.log(props.cookie);
    // console.log(document.cookie);
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
      {!errorOccurred && <Start actionsList={props.actionsList} uploadingAndDownloadingAction={props.uploadingAndDownloadingAction} onError={(error: AppError) => handleError(error.message)} />}
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  let actionsListTemp: actionObject[] = [];
  // let activeActionNameTemp = '';
  let customCookie: string = '';
  let uploadingAndDownloadingActionTemp: actionObject[] = [];

  try {
    let response;
    try {
      response = await axiosGetIpInterceptor(pixsConfig.backend.api);
    } catch (error: AppError | any) {
      if (error instanceof AppError) {
        return { props: returnPropsForOnError(error) };
      } else {
        return { props: returnPropsForOnError(new AppError('InternalServerError', 'Loading data failed', error.message)) };
      }
    }

    uploadingAndDownloadingActionTemp = response.data.actions.slice(0, 3);
    actionsListTemp = response.data.actions.slice(3);
    customCookie = response.headers['set-cookie'] ? response.headers['set-cookie'][0] : '';
  } catch (e) {
    console.log(e);
  }

  if (customCookie == '') {
    return { props: returnPropsForOnError(new AppError('InternalServerError', 'No cookie received')) };
  }

  // setting icons accordingly
  for (let action of actionsListTemp) {
    action.icon = action.icon == '' ? pixsConfig.iconPlaceholder : pixsConfig.backend.resources + action.icon;
  }

  return {
    props: {
      actionsList: actionsListTemp,
      cookie: customCookie,
      uploadingAndDownloadingAction: uploadingAndDownloadingActionTemp,
    },
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
