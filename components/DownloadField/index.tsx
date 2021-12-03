// import { useStore } from '../../util/globalStore';
import { useState } from 'react';
import { saveAs } from 'file-saver';
import { useStore } from '../../util/globalStore';

import Button from '../Button';
import BackgroundBlur from '../BackgroundBlur';

interface IProps {
  className?: string;
  imageData: string;
}

function DownloadField(props: IProps) {
  const { uploadedImage, setUploadedImage, clearUploadedImage } = useStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // save file to user's device
  function saveFile(type: 'PNG' | 'JPEG') {
    if (uploadedImage !== null) {
      console.log('type', type);
      if (type === 'PNG') {
        const pngImage = getPNGImage(uploadedImage);
        saveAs(pngImage, 'pixs-image.png');
      } else {
        const jpegImage = getJPEGImage(uploadedImage);
        saveAs(jpegImage, 'pixs-image.jpeg');
      }
    }
  }

  function getPNGImage(imageData: Blob): Blob {
    // TODO: implement with backend call
    return imageData;
  }

  function getJPEGImage(imageData: Blob): Blob {
    // TODO: implement with backend call
    return imageData;
  }

  return (
    <div className={'flex flex-col' + ' ' + props.className}>
      {showDeleteModal && (
        <BackgroundBlur>
          <div className='bg-white p-5 rounded-lg'>
            <h2 className='text-xl font-bold'>Delete and retry</h2>
            <hr className='mb-4 border-gray-300' />
            <div>
              <p className='text-lg px-2'>Do you really want to delete your image manipulation and retry?</p>
              <div className='w-full flex justify-evenly'>
                <Button
                  className='mt-4'
                  onclick={() => {
                    setShowDeleteModal(false);
                    deleteAndRetry();
                  }}
                  disabled={false}>
                  Yes
                </Button>
                <Button className='mt-4' onclick={() => setShowDeleteModal(false)} disabled={false} type={'error'}>
                  No
                </Button>
              </div>
            </div>
          </div>
        </BackgroundBlur>
      )}
      <h2 className='text-2xl font-bold text-customblue-200 mb-5 text-center'>Your edited image</h2>
      <div className='flex justify-center mb-5'>
        <div className='w-1/2 h-1/2'>
          <img src={props.imageData} alt='Downloaded' height='fill' width='fill' />
        </div>
      </div>

      <div className='flex justify-around'>
        <Button className='mt-4' onclick={() => saveFile('PNG')} disabled={false}>
          Download as PNG
        </Button>
        <Button className='mt-4' onclick={() => saveFile('JPEG')} disabled={false}>
          Download as JPEG
        </Button>
        <Button className='mt-4' onclick={() => setShowDeleteModal(true)} disabled={false} type={'error'}>
          Delete and retry
        </Button>
      </div>
    </div>
  );
}

export default DownloadField;

function deleteAndRetry() {
  console.log('delete and retry');
}
