import type { NextPage } from "next";
import Head from "next/head";
import Start from "../components/Start";
import def from "../default.json";
import { actionObject } from "../components/SideBar/types";

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
        <meta name="description" content="PiXS - Image Manipulation Extended" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Start
        actionsList={props.actionsList}
        configsObject={props.configsObject}
        activeActionName={props.activeActionName}
      />
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  let actionsListTemp: actionObject[] = [];
  let configsObjectTemp = {};
  let activeActionNameTemp = "";

  try {
    const data = await fetch("http://localhost:8000/");
    const jsonData = await data.json();

    activeActionNameTemp = jsonData.actions[2].name;
    actionsListTemp = getAvailableActions(activeActionNameTemp, jsonData);
    configsObjectTemp = getConfigObjectForAction(
      activeActionNameTemp,
      jsonData
    );
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
  if (actionName === "") {
    return JSON.parse(JSON.stringify(def.actions));
  }

  // const defaultIcon: any = (
  //   <svg
  //     aria-hidden="true"
  //     focusable="false"
  //     data-prefix="fas"
  //     data-icon="crop-alt"
  //     className="w-8 h-8"
  //     role="img"
  //     xmlns="http://www.w3.org/2000/svg"
  //     fill="currentColor"
  //     stroke="none"
  //     viewBox="0 0 512 512"
  //   >
  //     <path d="M488 352h-40V96c0-17.67-14.33-32-32-32H192v96h160v328c0 13.25 10.75 24 24 24h48c13.25 0 24-10.75 24-24v-40h40c13.25 0 24-10.75 24-24v-48c0-13.26-10.75-24-24-24zM160 24c0-13.26-10.75-24-24-24H88C74.75 0 64 10.74 64 24v40H24C10.75 64 0 74.74 0 88v48c0 13.25 10.75 24 24 24h40v256c0 17.67 14.33 32 32 32h224v-96H160V24z"></path>
  //   </svg>
  // );

  let newActionList: actionObject[] = JSON.parse(JSON.stringify(data.actions));
  return newActionList;
}

function getConfigObjectForAction(actionName: string, data: any) {
  // backend.actions.filter((action) => action.name === actionName)[0]

  if (actionName === "") {
    return JSON.parse(JSON.stringify(def.actions));
  }
  return JSON.parse(
    JSON.stringify(
      data.actions.filter((action: any) => action.name === actionName)[0]
    )
  );
}
