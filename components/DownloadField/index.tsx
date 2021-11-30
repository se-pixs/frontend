// import { useStore } from '../../util/globalStore';

import Button from '../Button';

interface IProps {
  className?: string;
  imageData: string;
}

function DownloadField(props: IProps) {
  return (
    <div className={'flex flex-col' + ' ' + props.className}>
      <h2 className='text-2xl font-bold text-customblue-200 mb-5'>Here is your edited image:</h2>
      <img src={props.imageData} alt='' />
      <div className='flex justify-between'>
        <Button className='mt-4' onclick={() => console.log('download')} disabled={false}>
          Download as PNG
        </Button>
        <Button className='mt-4' onclick={() => console.log('download')} disabled={false}>
          Download as JPEG
        </Button>
        <Button className='mt-4' onclick={() => console.log('download')} disabled={false} type={'error'}>
          Delete and retry
        </Button>
      </div>
    </div>
  );
}

export default DownloadField;
