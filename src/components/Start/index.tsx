import { useState } from 'react';
import { useStore } from '../../util/globalStore';

import SideBar from '../SideBar';
import Header from '../Header';
import Footer from '../Footer';
import UploadField from '../UploadField';
import Title from '../Title';
import Config from '../Config';
import Spacer from '../Spacer';
import Preview from '../Preview';

import backend from '../../example.json'
import ProgressBar from '../ProgressBar';

interface actionObject {
  name: string;
  icon: React.ReactNode;
  active: boolean;
}

const actionIndex = 1; //TODO action wählbar

function Start() {
  const { uploadedImage, setUploadedImage, clearUploadedImage } = useStore();
  const actionsList: actionObject[] = getActionList();
  const configList: any = getConfigList();

  const [imgsrc, setImgSrc] = useState('/preview-placeholder.jpeg');

  // set the image src to the uploaded image
  let reader = new FileReader();
  reader.onload = (e) => {
    setImgSrc((e.target === null ? '/preview-placeholder.jpeg' : e.target.result) as string);
  };

  if (uploadedImage !== null) {
    reader.readAsDataURL(uploadedImage);
  }

  let UPLOADED: boolean = true;

  return (
    <div className='bg-gray-200 flex'>
      <div className='flex-initial'>
        <SideBar actionsList={actionsList} />
      </div>
      <div className='flex-grow'>
        <Header />
        <div className='bg-customwhite-500 flex flex-col justify-between px-40 py-20'>
          <ProgressBar/>
          <Title title='Action title' description='action description' />
          <UploadField />
          <Spacer />
          <Config runAction={runAction} uploaded={UPLOADED} configList={configList} />
          {uploadedImage !== null && <Spacer />}
          {uploadedImage !== null && <Preview imgSrc={imgsrc} />}
        </div>
        <Footer />
      </div>
    </div>
  );
}

function runAction(event: any){
  let output = backend.actions[actionIndex];

  let sliders = event[0];
  let inputfields = event[1];
  let colorpickers = event[2];

  if(output.parameters){  
    for(let i = 0; i < output.parameters?.sliders.length; i++){
      output.parameters.sliders[i].value = sliders[i].value;  
    }
    for(let i = 0; i < output.parameters?.valuefields.length; i++){
      output.parameters.valuefields[i].value = inputfields[i].value;  
    }
    for(let i = 0; i < output.parameters?.colorpickers.length; i++){
      output.parameters.colorpickers[i].input.red = colorpickers[0].value[0].value;
      output.parameters.colorpickers[i].input.green = colorpickers[0].value[1].value;
      output.parameters.colorpickers[i].input.blue = colorpickers[0].value[2].value;
    }
  }

  console.log(JSON.stringify(output))

  //TODO further actions ... (send JSON to Backend)
}

function getActionList(): actionObject[] {
  const defaultActive: boolean = false;

  const defaultIcon: React.ReactNode = (
    <svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='crop-alt' className='w-8 h-8' role='img' xmlns='http://www.w3.org/2000/svg' fill='currentColor' stroke='none' viewBox='0 0 512 512'>
      <path d='M488 352h-40V96c0-17.67-14.33-32-32-32H192v96h160v328c0 13.25 10.75 24 24 24h48c13.25 0 24-10.75 24-24v-40h40c13.25 0 24-10.75 24-24v-48c0-13.26-10.75-24-24-24zM160 24c0-13.26-10.75-24-24-24H88C74.75 0 64 10.74 64 24v40H24C10.75 64 0 74.74 0 88v48c0 13.25 10.75 24 24 24h40v256c0 17.67 14.33 32 32 32h224v-96H160V24z'></path>
    </svg>
  );
  return [
    {
      name: 'Convert2LowPoly',
      active: defaultActive,
      icon: defaultIcon,
    },
    {
      name: 'InstaSplit',
      active: defaultActive,
      icon: defaultIcon,
    },
    {
      name: 'Crop',
      active: defaultActive,
      icon: defaultIcon,
    },
  ];
}

function getConfigList(): any {
  return backend.actions[actionIndex];
}

export default Start;
