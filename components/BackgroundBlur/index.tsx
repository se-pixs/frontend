interface IProps {
  children: JSX.Element;
  className?: string;
}

export default function BackgroundBlur(props: IProps) {
  return (
    <div className={'fixed top-0 left-0 w-full h-full flex justify-center items-center' + ' ' + props.className}>
      <div className='fixed w-full h-full bg-gray-400 opacity-60'></div>
      <div className='absolute flex justify-center items-center '>{props.children}</div>
    </div>
  );
}
