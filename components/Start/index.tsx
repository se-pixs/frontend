import { useState, useEffect } from 'react';
import { useStore } from '../../util/globalStore';

import SideBar from '../SideBar';
import Header from '../Header';
import Footer from '../Footer';
import UploadField from '../UploadField';
import Title from '../Title';
import Config from '../Config';
import Spacer from '../Spacer';
import Preview from '../Preview';
import ProgressBar from '../ProgressBar';
import { actionObject } from '../SideBar/types';
import backend from '../../example.json';

interface IProps {
  actionsList: actionObject[];
  configsObject: any;
  activeActionName: string;
}

export default function Start(props: IProps) {
  // const [actionName, setActionName] = useState(backend.actions[0].name);
  const [actionName, setActionName] = useState(props.activeActionName);
  const { uploadedImage, setUploadedImage, clearUploadedImage } = useStore();
  const [imgsrc, setImgSrc] = useState('/preview-placeholder.jpeg');

  // set the image src to the uploaded image
  if (typeof window !== 'undefined') {
    let reader = new FileReader();
    reader.onload = (e) => {
      setImgSrc((e.target === null ? '/preview-placeholder.jpeg' : e.target.result) as string);
      if (e.target !== null && e.target.result !== null) {
        // setUploadedImage(new File(e.target.result, "uploaded img")); // doesn't work
      }
    };
    if (uploadedImage !== null) {
      reader.readAsDataURL(uploadedImage as Blob);
    }
  }

  function onActionChange(name: string) {
    setActionName('');
    setTimeout(function () {
      setActionName(name);
    }, 0.001);
  }

  const UPLOADED: boolean = true;

  return (
    <div className='bg-gray-200 flex'>
      <div className='flex-initial'>
        <SideBar onSelectAction={onActionChange} actionsList={props.actionsList} selectedAction={actionName} />
      </div>
      <div className='flex-grow'>
        <Header />
        <div className='bg-customwhite-500 flex flex-col justify-between px-40 py-20'>
          <ProgressBar />
          <Title title={actionName.toUpperCase()} description={actionName !== '' ? props.actionsList.filter((action) => action.name === actionName)[0].description : ''} />
          <UploadField />
          <Spacer />
          <Config runAction={runAction} uploaded={UPLOADED} configList={props.configsObject} />
          {uploadedImage !== null && <Spacer />}
          {uploadedImage !== null && <Preview imgSrc={imgsrc} />}
        </div>
        <Footer />
      </div>
    </div>
  );
}

function runAction(event: any) {
  let output = JSON.parse(JSON.stringify(backend.actions.filter((action) => action.name === event[0])[0]));

  output.icon = '';

  let sliders = event[1];
  let inputfields = event[2];
  let colorpickers = event[3];

  if (output.parameters) {
    if (output.parameters?.sliders) {
      for (let i = 0; i < output.parameters?.sliders.length; i++) {
        output.parameters.sliders[i].value = sliders[i].value;
      }
    }
    if (output.parameters?.valuefields) {
      for (let i = 0; i < output.parameters?.valuefields.length; i++) {
        output.parameters.valuefields[i].value = inputfields[i].value;
      }
    }
    if (output.parameters?.colorpickers) {
      for (let i = 0; i < output.parameters?.colorpickers.length; i++) {
        output.parameters.colorpickers[i].input.red = colorpickers[0].value[0].value;
        output.parameters.colorpickers[i].input.green = colorpickers[0].value[1].value;
        output.parameters.colorpickers[i].input.blue = colorpickers[0].value[2].value;
      }
    }
  }

  console.log(JSON.stringify(output));

  //TODO further actions ... (send JSON to Backend)
}
