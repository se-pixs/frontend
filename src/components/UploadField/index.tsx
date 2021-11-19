import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useStore } from '../../util/globalStore';

import Button from '../Button';

interface IProps {
  className?: string;
}

function UploadField(props: IProps) {
  const { setUploadedImage, clearUploadedImage } = useStore();

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles.length);
    setFileName(acceptedFiles[0].path);
    setUploaded(true);
    setUploadedImage(acceptedFiles[0]);
  }, []);

  const [uploaded, setUploaded] = useState(false);
  const [filename, setFileName] = useState('');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  let imgPreview: React.ReactNode = (
    <div className='w-full flex flex-col items-center justify-center'>
      <svg xmlns='http://www.w3.org/2000/svg' className='h-24 w-24' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
      </svg>
      <p className='text-md'>{filename}</p>
    </div>
  );

  function clearUpload() {
    setFileName('');
    setUploaded(false);
    clearUploadedImage();
  }

  let activeParagraph = (
    <p>
      <span className='font-bold text-custompurple-500'>Drop</span> your image here
    </p>
  );

  let inactiveParagraph = (
    <p>
      Drag 'n' <span className='font-bold text-custompurple-500'>drop</span> some files here, or click to <span className='font-bold text-custompurple-500'>select</span> files.
    </p>
  );
  let nonAccepted = isDragActive ? activeParagraph : inactiveParagraph;

  return (
    <div>
      <div {...getRootProps()} className={'w-full text-center border-custompurple-500 border-4 py-20 rounded-lg cursor-pointer' + (uploaded ? ' border-solid ' : ' border-dashed ') + props.className}>
        <input {...getInputProps()} multiple={false} />
        <div className='text-xl'>{uploaded ? imgPreview : nonAccepted}</div>
      </div>
      <Button className='mt-4' onclick={() => clearUpload()} disabled={!uploaded}>
        clear upload
      </Button>
    </div>
  );
}

export default UploadField;
