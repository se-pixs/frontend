import Button from '../Button';
import useStore from '../../utils/store/globalStore';
import BackgroundBlur from '../BackgroundBlur';

interface IProps {
  className?: string;
  show: boolean;
  deleteAndRetry: () => void;
  showDeleteModal: (showModal: boolean) => void;
}
function Modal(props: IProps) {
  return (
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
                props.deleteAndRetry();
              }}
              disabled={false}>
              Yes
            </Button>
            <Button className='mt-4' onclick={() => props.showDeleteModal(false)} disabled={false} type={'error'}>
              No
            </Button>
          </div>
        </div>
      </div>
    </BackgroundBlur>
  );
}

export default Modal;
