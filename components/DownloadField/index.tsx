import { useState } from 'react';
import { saveAs } from 'file-saver';
import useStore from '../../utils/store/globalStore';

import Button from '../Button';
import BackgroundBlur from '../BackgroundBlur';
import DeleteModal from '../Modal/deleteModal';

interface IProps {
  className?: string;
  imageData: string;
  deleteAndRetry(): void;
  reverse(): void;
}

function DownloadField(props: IProps) {
  const { uploadedImage, clearUploadedImage } = useStore();
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
    setShowDeleteModal(false);
    props.deleteAndRetry();
  }

  return (
    <div className={'flex flex-col' + ' ' + props.className}>
      {showDeleteModal && <DeleteModal show={false} deleteAndRetry={deleteAndRetry} showDeleteModal={(showModal: boolean) => setShowDeleteModal(showModal)} />}
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
