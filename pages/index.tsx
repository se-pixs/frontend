import type { NextPage } from 'next';
import Head from 'next/head';
import Start from '../components/Start';
import pixsConfig from '../pixs.config.json';
import { actionObject } from '../components/SideBar/types';
import { axiosGetIpInterceptor } from '../utils/axiosInterceptor';
// import cookieCutter from 'cookie-cutter';

interface IProps {
  actionsList: actionObject[];
  cookie: string;
  uploadingAndDownloadingAction: actionObject[];
}

const Home: NextPage<IProps> = (props: IProps) => {
  const error: boolean = props.cookie === '';

  if (typeof document !== 'undefined') {
    document.cookie = props.cookie;
    console.log(props.cookie);
    console.log(document.cookie);
  }

  return (
    <div>
      <Head>
        <title>PiXS - Image Manipulation Extended</title>
        <meta name='description' content='PiXS - Image Manipulation Extended' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {!error && <Start actionsList={props.actionsList} uploadingAndDownloadingAction={props.uploadingAndDownloadingAction} />}
      {error && <div>An error occured. Please try reloading the page</div>}
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
    // const data = await fetch(pixsConfig.backend);
    let response = await axiosGetIpInterceptor(pixsConfig.backend);

    uploadingAndDownloadingActionTemp = response.data.actions.slice(0, 3);
    actionsListTemp = response.data.actions.slice(3);
    customCookie = response.headers['set-cookie'] ? response.headers['set-cookie'][0] : '';
  } catch (e) {
    console.log(e);
  }

  // setting icons accordingly
  for (let action of actionsListTemp) {
    action.icon = action.icon == '' ? pixsConfig.iconPlaceholder : pixsConfig.backend + action.icon;
  }

  return {
    props: {
      actionsList: actionsListTemp,
      cookie: customCookie,
      uploadingAndDownloadingAction: uploadingAndDownloadingActionTemp,
    },
  };
}
