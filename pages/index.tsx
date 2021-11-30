import type { NextPage } from 'next';
import Head from 'next/head';
import Start from '../components/Start';
import pixsConfig from '../pixs.config.json';
import { actionObject } from '../components/SideBar/types';

interface IProps {
  actionsList: actionObject[];
  configsObject: any;
  activeActionName: string;
}

const Home: NextPage<IProps> = (props: IProps) => {
  return (
    <div>
      <Head>
        <title>PiXS - Image Manipulation Extended</title>
        <meta name='description' content='PiXS - Image Manipulation Extended' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Start
        actionsList={props.actionsList}
        activeActionName={props.activeActionName}
      />
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  let actionsListTemp: actionObject[] = [];
  let activeActionNameTemp = "";

  try {
    const data = await fetch('http://localhost:8000/');
    const jsonData = await data.json();

    activeActionNameTemp = jsonData.actions[2].name;
    actionsListTemp = jsonData.actions;
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      actionsList: actionsListTemp,
      activeActionName: activeActionNameTemp,
    },
  };
}
