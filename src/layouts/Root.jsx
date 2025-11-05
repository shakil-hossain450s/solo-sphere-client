import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Root = () => {
  return (
    <div className='flex flex-col min-h-screen max-w-[1440px] mx-auto'>
      {/* navbar */}
      <header className='bg-base-100 shadow-sm'>
        <Navbar></Navbar>
      </header>
      {/* outlet */}
      <main className='flex-1'>
        <Outlet></Outlet>
      </main>
      {/* footer */}
      <Footer></Footer>
    </div>
  );
};

export default Root;