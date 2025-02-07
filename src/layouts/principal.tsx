'use client';
import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getCurrentUser, isLoggedIn } from '@/store';

interface Props {
  children: JSX.Element;
  className?: string;
}

const PrincipalLayout = ({ children, className }: Props) => {
  const { t } = useTranslation('common');
  const isLogged = useSelector(isLoggedIn);
  const user = useSelector(getCurrentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const [sticky, setSticky] = useState(true);
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
        } flex w-screen lg:w-full  items-center justify-center gap-80 border-b-2 border-white  p-4 shadow-xl bg-white transition-transform duration-500  z-50 ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <>
          <div className="flex w-auto items-center justify-center">
            <Link
              href="/"
              className="font-extrabold transition-all duration-300 uppercase leading-tight tracking-wide text-xs w-40 "
            >
              <Image
                src="/images/logo/logo-1.svg"
                alt="Logo"
                width={150}
                height={150}
              />
            </Link>
          </div>
        </>
        <>
          <div className=" w-full hidden lg:flex justify-center items-center gap-2">
            {[
              'Inicio',
              'Tienda',
              'Sorteos',
              'Financiamiento',
              'Profesionales',
            ].map((item, index) => (
              <a
                key={index}
                href={`#${item}`}
                className="px-4 py-2 font-black opacity-30 transition-all duration-300 hover:scale-110 hover:text-SelectedTextColor hover:opacity-100 text-xs uppercase leading-tight tracking-wide"
              >
                {item}
              </a>
            ))}
          </div>
        </>
      </nav>

      <>
        <div className="w-full flex flex-row justify-center items-center p-4">
          <Link href="/" className="w-full flex justify-center items-center">
            {/* <Image src="/images/logo/logo-1.svg" alt="Logo" width={150} height={150} /> */}
          </Link>
        </div>
      </>
      <>
        <div className="flex flex-col items-center justify-center">
          <Box sx={{ mt: '0px', pb: '0px', minHeight: '80vh', width: '100%' }}>
            {children}
          </Box>
        </div>
      </>
    </div>
  );
};

export default PrincipalLayout;
