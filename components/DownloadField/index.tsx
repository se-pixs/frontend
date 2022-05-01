import { useState } from 'react';
import { saveAs } from 'file-saver';
import useStore from '../../utils/store/globalStore';

import Button from '../Button';
import BackgroundBlur from '../BackgroundBlur';

interface IProps {
  className?: string;
  imageData: string;
  deleteAndRetry(): void;
  reverse(): void;
}

function DownloadField(props: IProps) {
  const { uploadedImage, setUploadedImage, clearUploadedImage } = useStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // save file to user's device
  function saveFile() {
    if (uploadedImage !== null) {
      let type = uploadedImage.type.split('/')[1];
      if (type === 'png') {
        saveAs(uploadedImage, 'pixs-image.png');
      } else if (type === 'jpeg') {
        saveAs(uploadedImage, 'pixs-image.jpeg');
      } else {
        saveAs(uploadedImage, 'pixs-image.zip');
      }
    }
  }

  function deleteAndRetry() {
    props.deleteAndRetry();
    clearUploadedImage();
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
        <img src={props.imageData} alt='Downloaded' height='fill' width='fill' />
      </div>

      <div className='flex justify-around'>
        <Button className='mt-4' onclick={() => saveFile()} disabled={false}>
          Download
        </Button>
        <Button className='mt-4' onclick={() => props.reverse()} disabled={false}>
          Reverse
        </Button>
        <Button className='mt-4' onclick={() => setShowDeleteModal(true)} disabled={false} type={'error'}>
          Delete and retry
        </Button>
      </div>
    </div>
  );
}

export default DownloadField;
