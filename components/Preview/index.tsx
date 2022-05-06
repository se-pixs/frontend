interface IProps {
  className?: string;
  imgSrc?: string;
  imgSrcManipulated?: string;
}

function Preview(props: IProps) {
  if (typeof props.imgSrc === 'undefined') {
    return <div></div>;
  }

  let loadingPreview: boolean = false;
  if (typeof props.imgSrcManipulated === 'undefined') {
    loadingPreview = true;
  }

  const arrowIcon: JSX.Element = (
    <svg xmlns='http://www.w3.org/2000/svg' className='h-10 w-10 text-customblue-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 5l7 7m0 0l-7 7m7-7H3' />
    </svg>
  );

  const processingIcon: JSX.Element = (
    <svg xmlns='http://www.w3.org/2000/svg' className='h-full w-20 text-gray-600 animate-spin-reverse ' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
    </svg>
  );

  return (
    <div className={'flex flex-col' + ' ' + props.className}>
      <div className='flex-initial font-bold text-xl mb-5'>Your Image</div>
      <div className='flex-initial flex justify-between items-center'>
        <div className='flex-initial'>
          {/* <p className='mb-3'>Uploaded image</p> */}
          <div className='w-96'>
            <img src={props.imgSrc} alt='Uploaded' className='w-full h-full' />
          </div>
        </div>
        {/* <div className='flex-initial'>{arrowIcon}</div>
        <div className='flex-initial'>
          {!loadingPreview && <p className='mb-3'>Manipulated image</p>}
          <div className='w-96'>{loadingPreview ? processingIcon : <img src={props.imgSrcManipulated} alt='Manipulated' className='w-full h-full' />}</div>
        </div> */}
      </div>
    </div>
  );
}

export default Preview;
