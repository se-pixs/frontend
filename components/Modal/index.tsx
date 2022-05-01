import Button from '../Button';
import useStore from '../../utils/store/globalStore';

function Modal() {
  const modalHeadingText: string = useStore((state) => state.modalHeading);
  const modalBodyText: string = useStore((state) => state.modalBody);
  const modalButtonOnClick = useStore((state) => state.modalButtonOnClick);

  return (
    <div className='absolute w-full h-full z-50'>
      <div className='fixed w-full h-full bg-gray-800 opacity-90 z-20'></div>
      <div className='fixed top-1/4 left-1/4 w-full h-full z-30'>
        <div className={'bg-white p-5 top-2 rounded-lg border border-gray-200  w-3/4 md:w-2/4 h-fit'}>
          <h3 className='mb-2'>{modalHeadingText}</h3>
          <hr />
          <div className='mt-3'>{modalBodyText}</div>
          <div className='flex w-full justify-end'>
            <Button className={'mt-3'} onclick={modalButtonOnClick}>
              Reload
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
