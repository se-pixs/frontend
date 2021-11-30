interface IProps {
  children: JSX.Element;
}

export default function BackgroundBlur(props: IProps) {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
      <div className='fixed w-full h-full bg-gray-400 opacity-60'></div>
      <div className='absolute flex justify-center items-center bg-white p-5 rounded-lg'>{props.children}</div>
    </div>
  );
}
