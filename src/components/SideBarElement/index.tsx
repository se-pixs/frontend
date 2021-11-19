interface IProps {
  name: string;
  isBig: boolean;
  active: boolean;
  icon: React.ReactNode;
}

function SideBarElement(props: IProps) {
  const activeClass: string = 'bg-customblue-300';

  return (
    <div className={'text-customwhite-500 h-14 w-full text-lg flex flex-initial items-center hover:bg-customblue-200' + (props.active ? ' ' + activeClass : '')}>
      <div className={'w-1 h-full' + (props.active ? ' bg-custompurple-500' : ' bg-transparent')} />
      <div className='flex-initial ml-4 text-customwhite-500'>{props.icon}</div>
      {props.isBig && <p className='flex-initial ml-4 mr-6'>{props.name}</p>}
    </div>
  );
}

export default SideBarElement;
