import SideBar from '../SideBar';
import Header from '../Header';
import Footer from '../Footer';

interface actionObject {
  name: string;
  icon: React.ReactNode;
  active: boolean;
}

function Start() {
  const actionsList: actionObject[] = getActionList();

  return (
    <div className='bg-gray-200 flex'>
      <div className='flex-initial'>
        <SideBar actionsList={actionsList} />
      </div>
      <div className='flex-grow'>
        <Header />
        <div className=' bg-customwhite h-screen'>
          <p className='text-center text-xl'>Hello world</p>
        </div>
        <Footer />
      </div>
    </div>
  );
}

function getActionList(): actionObject[] {
  const defaultActive: boolean = false;

  const defaultIcon: React.ReactNode = (
    <svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='crop-alt' className='w-8 h-8' role='img' xmlns='http://www.w3.org/2000/svg' fill='currentColor' stroke='none' viewBox='0 0 512 512'>
      <path d='M488 352h-40V96c0-17.67-14.33-32-32-32H192v96h160v328c0 13.25 10.75 24 24 24h48c13.25 0 24-10.75 24-24v-40h40c13.25 0 24-10.75 24-24v-48c0-13.26-10.75-24-24-24zM160 24c0-13.26-10.75-24-24-24H88C74.75 0 64 10.74 64 24v40H24C10.75 64 0 74.74 0 88v48c0 13.25 10.75 24 24 24h40v256c0 17.67 14.33 32 32 32h224v-96H160V24z'></path>
    </svg>
  );
  return [
    {
      name: 'Convert2LowPoly',
      active: defaultActive,
      icon: defaultIcon,
    },
    {
      name: 'InstaSplit',
      active: defaultActive,
      icon: defaultIcon,
    },
    {
      name: 'Crop',
      active: defaultActive,
      icon: defaultIcon,
    },
  ];
}
export default Start;
