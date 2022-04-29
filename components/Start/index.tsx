import { useState, useRef, useEffect } from 'react';
import { useStore } from '../../utils/globalStore';
import { getFormatOfImage } from '../../utils/imageUtils';
import { axiosPostIpInterceptor, axiosObjectInterceptor } from '../../utils/axiosInterceptor';

import SideBar from '../SideBar';
import Header from '../Header';
import Footer from '../Footer';
import UploadField from '../UploadField';
import DownloadField from '../DownloadField';
import Title from '../Title';
import Config from '../Config';
import Spacer from '../Spacer';
import Preview from '../Preview';
import ProgressBar from '../ProgressBar';
import BackgroundBlur from '../BackgroundBlur';

import pixsConfig from '../../pixs.config.template';
import { actionObject } from '../SideBar/types';

interface IProps {
  actionsList: actionObject[];
  uploadingAndDownloadingAction: actionObject[];
}

export default function Start(props: IProps) {
  const [actionName, setActionName] = useState(props.actionsList[0].name);
  const [configsObject, setConfigsObject] = useState(props.actionsList.filter((action: any) => action.name === actionName)[0]);

  const [processIsRunning, setProcessIsRunning] = useState(false);
  const [responseArrived, setResponseArrrived] = useState(true);

  const { uploadedImage, setUploadedImage, clearUploadedImage } = useStore();
  const [imgsrc, setImgSrc] = useState('/preview-placeholder.jpeg');
  const [readyToBeDownloaded, setReadyToBeDownloaded] = useState(uploadedImage !== null);
  const hasBeenUploaded = useRef(uploadedImage !== null);

  // set the image src to the uploaded image
  if (typeof window !== 'undefined') {
    let reader = new FileReader();

    reader.onload = (e) => {
      setImgSrc((e.target === null ? '/preview-placeholder.jpeg' : e.target.result) as string);
      // ! for test usage
      // setReadyToBeDownloaded(uploadedImage !== null);
    };

    if (uploadedImage !== null) {
      reader.readAsDataURL(uploadedImage as Blob);

      // only upload image if it has been uploaded yet
      if (!hasBeenUploaded.current) {
        hasBeenUploaded.current = true;

        let data = new FormData();
        if (uploadedImage.type === 'image/jpeg' || uploadedImage.type === 'image/png') {
          data.append('image', uploadedImage);
          data.append('format', getFormatOfImage(uploadedImage));
          console.log(getFormatOfImage(uploadedImage));
        } else if (uploadedImage.type.includes('zip')) {
          data.append('zip', uploadedImage);
          data.append('format', 'ZIP');
        } else {
          console.error('File type not supported');
        }

        let config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        };

        axiosPostIpInterceptor(pixsConfig.backend.resources + props.uploadingAndDownloadingAction[0].path, data, config).then((data) => {
          console.log(data);
        });
      }
    }
  }

  function onActionChange(name: string) {
    setActionName('');
    setConfigsObject(JSON.parse(JSON.stringify({})));
    setTimeout(function () {
      setActionName(name);
      setConfigsObject(JSON.parse(JSON.stringify(props.actionsList.filter((action: any) => action.name === name)[0])));
    }, 0.001);
  }

  function newUpload() {
    hasBeenUploaded.current = false;
  }

  function onProcessFinished() {
    setProcessIsRunning(false);
  }

  async function runAction(event: any) {
    let output = JSON.parse(JSON.stringify(props.actionsList.filter((action) => action.name === event[0])[0]));

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
          output.parameters.colorpickers[i].value.red = colorpickers[0].value[0].value;
          output.parameters.colorpickers[i].value.green = colorpickers[0].value[1].value;
          output.parameters.colorpickers[i].value.blue = colorpickers[0].value[2].value;
        }
      }
    }
    // ! for test usage
    // console.log(JSON.stringify(output));

    let url = pixsConfig.backend.resources + output.path;

    setResponseArrrived(false);
    setProcessIsRunning(true);

    const axiosConfig = {
      method: 'post',
      url: url,
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(output),
      withCredentials: true,
    };

    const response = await axiosObjectInterceptor(axiosConfig);

    setResponseArrrived(true);
    updateImg();
  }

  async function updateImg() {
    const axiosConfig = {
      method: 'get',
      url: pixsConfig.backend.resources + props.uploadingAndDownloadingAction[1].path,
      responseType: 'blob', // necessary because JS is a terrible language, stupid and requires this ~ Github Copilot
      withCredentials: true,
    };

    const response2 = await axiosObjectInterceptor(axiosConfig);

    setReadyToBeDownloaded(true);

    if (response2.data.type === 'image/png' || response2.data.type === 'image/jpeg' || response2.data.type.includes('zip')) {
      let fileName = 'uploaded.' + response2.data.type.split('/')[1];
      let file = new File([response2.data], fileName, { type: response2.data.type });
      setUploadedImage(file);
    }
  }

  function deleteAndRetry() {
    setReadyToBeDownloaded(false);
  }

  async function reverse() {
    const axiosConfig = {
      method: 'get',
      url: pixsConfig.backend.resources + props.uploadingAndDownloadingAction[2].path,
      responseType: 'blob', // necessary because JS is a terrible language, stupid and requires this ~ Github Copilot
      withCredentials: true,
    };

    // Axios(axiosConfig);
    axiosObjectInterceptor(axiosConfig);
    updateImg();
  }

  return (
    <div className='bg-gray-200 flex'>
      <div className='flex-initial'>
        <SideBar onSelectAction={onActionChange} actionsList={props.actionsList} selectedAction={actionName} />
      </div>
      <div className='flex-grow'>
        <Header />
        <div className='bg-customwhite-500 flex flex-col justify-between px-40 py-20'>
          {processIsRunning && (
            <BackgroundBlur className=''>
              <div className='w-screen px-10'>
                <ProgressBar className='' response={responseArrived} onEnd={onProcessFinished} />
              </div>
            </BackgroundBlur>
          )}
          <Title title={actionName.toUpperCase()} description={actionName !== '' ? props.actionsList.filter((action) => action.name === actionName)[0].description : ''} />
          {readyToBeDownloaded && <DownloadField deleteAndRetry={deleteAndRetry} reverse={reverse} imageData={imgsrc} />}
          {!readyToBeDownloaded && <UploadField onUpload={newUpload} />}
          <Spacer />
          <Config runAction={runAction} disabled={readyToBeDownloaded} uploaded={uploadedImage !== null} configList={configsObject} />
          {uploadedImage !== null && <Spacer />}
          {uploadedImage !== null && <Preview imgSrc={imgsrc} />}
        </div>
        <Footer />
      </div>
    </div>
  );
}
