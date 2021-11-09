import { Component } from 'react';
import SideBar from '../SideBar';
import Header from '../Header';
import Footer from '../Footer';

function Start() {
  return (
    <div className='bg-gray-200'>
      <Header />
      <div className=' bg-customwhite h-screen'>
        <p className='text-center text-xl'>Hello world</p>
      </div>
      <Footer />
    </div>
  );
}

export default Start;
