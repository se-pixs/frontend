import type { NextPage } from 'next';
import Head from 'next/head';
import Start from '../components/Start';
import def from '../default.json';
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
      <Start actionsList={props.actionsList} configsObject={props.configsObject} activeActionName={props.activeActionName} />
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  let actionsListTemp: actionObject[] = [];
  let configsObjectTemp = {};
  let activeActionNameTemp = '';

  try {
    const data = await fetch('http://localhost:8000/');
    const jsonData = await data.json();

    activeActionNameTemp = jsonData.actions[2].name;
    actionsListTemp = getAvailableActions(activeActionNameTemp, jsonData);
    configsObjectTemp = getConfigObjectForAction(activeActionNameTemp, jsonData);
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      actionsList: actionsListTemp,
      configsObject: configsObjectTemp,
      activeActionName: activeActionNameTemp,
    },
  };
}

// actionName which is provided is the actionName which is active
function getAvailableActions(actionName: string, data: any) {
  if (actionName === '') {
    return JSON.parse(JSON.stringify(def.actions));
  }

  let newActionList: actionObject[] = JSON.parse(JSON.stringify(data.actions));

  // set icon correctly
  for (let action of newActionList) {
    action.icon = action.icon != '' && action.icon != null ? pixsConfig.backend + action.icon : pixsConfig.iconPlaceholder;
  }

  return newActionList;
}

function getConfigObjectForAction(actionName: string, data: any) {
  // backend.actions.filter((action) => action.name === actionName)[0]

  if (actionName === '') {
    return JSON.parse(JSON.stringify(def.actions));
  }
  return JSON.parse(JSON.stringify(data.actions.filter((action: any) => action.name === actionName)[0]));
}
