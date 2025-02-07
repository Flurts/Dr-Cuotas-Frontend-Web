'use client';
import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiLogIn, FiMenu, FiShoppingCart, FiUser, FiZoomIn } from 'react-icons/fi';
import { PiArrowRight } from 'react-icons/pi';
import { IoClose } from 'react-icons/io5';

interface Props {
  children: JSX.Element;
  className?: string;
}

const PrincipalLayout = ({ children, className }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [sticky] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (scrollTimeout) clearTimeout(scrollTimeout);
      setHidden(true);
      const timeout = setTimeout(() => {
        setHidden(false);
      }, 300);
      setScrollTimeout(timeout);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [lastScrollY, scrollTimeout]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`${className}`}>
      <nav
        className={`${
          sticky ? 'sticky top-0' : 'relative'
        } flex w-full  items-center justify-center   border-white  p-4  bg-white transition-transform duration-500 z-50 ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <>
          <div className="flex w-full items-end justify-start lg:px-20">
            <Link
              href="/"
              className="font-extrabold transition-all duration-300 uppercase leading-tight tracking-wide text-xs w-auto "
            >
              <Image
                src="/images/logo/logo-1.svg"
                alt="Logo"
                width={110}
                height={110}
              />
            </Link>
          </div>
        </>
        <>
          <div className="hidden lg:flex w-full items-center justify-center gap-80">
            <ul className='flex flex-row justify-center items-center w-auto h-auto gap-4'>
              <a href='/' className='uppercase leading-tight tracking-tight font-black text-sm text-[#737373] hover:text-drcuotasPrimary'>Inicio</a>
              <a href='/store' className='uppercase leading-tight tracking-tight font-black text-sm text-[#737373] hover:text-drcuotasPrimary'>Tienda</a>
              <a href='/professionals' className='uppercase leading-tight tracking-tight font-black text-sm text-[#737373] hover:text-drcuotasPrimary'>Doctores</a>
              <a href='/faq' className='uppercase leading-tight tracking-tight font-black text-sm text-[#737373] hover:text-drcuotasPrimary'>Soporte</a>
              <a href='/faq' className='uppercase leading-tight tracking-tight font-black text-sm text-[#737373] hover:text-drcuotasPrimary'>FAQ</a>
            </ul>
          </div>
        </>
        <>
          <div className="flex w-20 lg:w-full items-center justify-center gap-2">
                <>
                  <Link
                    className="text-[#737373] hover:text-drcuotasPrimary font-black uppercase leading-tight tracking-tight w-40 h-10 border-2 hover:border-drcuotasPrimary border-[#737373]  hidden lg:flex flex-row justify-center items-center  group rounded-xl hover:scale-100 transition-all duration-300 gap-2 "
                    href="/login"
                  >
                    <span className='text-sm'>Login</span>
                    <FiLogIn className='font-black text-xl'/>
                  </Link>
                </>
                <>
                <Link href='/account'
                     className="text-drcuotasPrimary-text lg:text-white font-semibold w-20 h-10 lg:border-2 border-[#737373] lg:bg-[#737373] back lg:hover:bg-drcuotasPrimary hover:border-drcuotasPrimary hidden lg:flex  flex-row justify-center items-center  group rounded-xl hover:scale-100 transition-all duration-300 gap-2 "
                  >
                    <FiUser className='text-2xl ' />
                    {/* <FiMenu className='text-2xl lg:text-base'/> */}
                  </Link>
                </>
                <>
                  <button
                    className="text-drcuotasPrimary-text lg:text-white font-semibold w-20 h-10 lg:border-2 border-[#737373] lg:bg-[#737373] back lg:hover:bg-drcuotasPrimary hover:border-drcuotasPrimary flex lg:hidden flex-row justify-center items-center  group rounded-xl hover:scale-100 transition-all duration-300 gap-2 "
                    onClick={handleMenuToggle}
                  >
                    <FiMenu className='text-2xl lg:text-base'/>
                  </button>
                </>
          </div>
        </>
      </nav>

      {/* Sidebar */}
       {/* Background Overlay */}
       {isMenuOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-40 z-50" onClick={handleMenuToggle}></div>
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 z-50`}>        
        <button className="absolute top-4 right-4 text-gray-600" onClick={handleMenuToggle}>
          <IoClose className="text-2xl" />
        </button>
        <div className="flex flex-col items-start mt-12 p-6 space-y-4">
          <a href='/login' className='uppercase font-black text-lg text-[#737373] hover:text-drcuotasPrimary'>Login</a>
          <a href='/store' className='uppercase font-black text-lg text-[#737373] hover:text-drcuotasPrimary'>Tienda</a>
          <a href='/professionals' className='uppercase font-black text-lg text-[#737373] hover:text-drcuotasPrimary'>Doctores</a>
          <a href='/faq' className='uppercase font-black text-lg text-[#737373] hover:text-drcuotasPrimary'>Soporte</a>
          <a href='/faq' className='uppercase font-black text-lg text-[#737373] hover:text-drcuotasPrimary'>FAQ</a>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <Box sx={{ mt: '0px', pb: '0px', minHeight: '80vh', width: '100%' }}>
          {children}
        </Box>
      </div>
    </div>
  );
};

export default PrincipalLayout;
