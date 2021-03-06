interface IProps {
  displayName: string;
  isBig: boolean;
  active: boolean;
  icon: string;
}

function SideBarElement(props: IProps) {
  const activeClass: string = 'bg-customblue-300';

  return (
    <div className={'text-customwhite-500 h-14 w-full text-lg flex flex-initial items-center hover:bg-customblue-200 cursor-pointer' + (props.active ? ' ' + activeClass : '')}>
      <div className={'w-1 h-full' + (props.active ? ' bg-custompurple-500' : ' bg-transparent')} />
      <img className='flex-initial ml-4 mr-4 text-customwhite-500 fill-current' src={props.icon} width='30' height='30' />
      {props.isBig && <p className='flex-initial ml-4 mr-6 whitespace-nowrap'>{props.displayName}</p>}
    </div>
  );
}

export default SideBarElement;
