import type { NextPage } from 'next';
import Head from 'next/head';
import Start from '../components/Start';
import pixsConfig from '../pixs.config.json';
import { actionObject } from '../components/SideBar/types';

interface IProps {
  actionsList: actionObject[];
}

const Home: NextPage<IProps> = (props: IProps) => {
  return (
    <div>
      <Head>
        <title>PiXS - Image Manipulation Extended</title>
        <meta name='description' content='PiXS - Image Manipulation Extended' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Start actionsList={props.actionsList} />
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  let actionsListTemp: actionObject[] = [];
  let activeActionNameTemp = '';

  try {
    const data = await fetch(pixsConfig.backend);
    const jsonData = await data.json();

    actionsListTemp = jsonData.actions.slice(2);
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
    },
  };
}
