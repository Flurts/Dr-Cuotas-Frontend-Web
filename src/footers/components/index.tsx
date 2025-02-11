'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  FiCalendar,
  FiInstagram,
  FiLogOut,
  FiServer,
  FiSettings,
  FiShoppingCart,
  FiTwitter,
  FiUser,
} from 'react-icons/fi';

// @ts-expect-error
const FooterPrincipal = ({ toggleDarkMode, darkMode }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // Mostrar el footer si estamos al final de la página
      if (scrollPosition + windowHeight >= documentHeight - 1) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="w-full h-80 p-10 flex lg:hidden flex-col justify-end items-end opacity-80 gap-4 -z-20">
        {/* Options */}
        <div className="w-full flex-row items-center justify-center flex gap-4">
          <>
            <Link
              href="/account/settings"
              className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-2xl"
            >
              <FiSettings />
            </Link>
          </>
          <>
            <Link
              href="/store"
              className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-2xl"
            >
              <FiShoppingCart />
            </Link>
          </>
          <>
            <Link
              href="/faq"
              className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-2xl"
            >
              <FiCalendar />
            </Link>
          </>
          <>
            <Link
              href="/"
              className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-2xl"
            >
              <FiLogOut />
            </Link>
          </>
        </div>

        {/* By Miguel Angel Jaimes Parra */}
        <div className="w-full h-auto text-center flex flex-col justify-center">
          <p className="text-[10px] lg:text-xs tracking-tight leading-tight uppercase  text-[#737373] ">
            ¡Agenda hoy!
          </p>
          <p className="text-[10px] lg:text-xs tracking-tight leading-tight uppercase  text-[#737373] ">
            {' '}
            © 2025 Dr.Cuotas All rights reserved.{' '}
          </p>
        </div>

        {/* Social media */}
        <div className="w-full flex-row items-center justify-center flex gap-4 hidden">
          <>
            <Link
              href="https://www.instagram.com/dempserayo/C"
              className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-2xl "
            >
              <FiUser />
            </Link>
          </>
          <>
            <Link
              href="https://www.instagram.com/dempserayo/C"
              className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-2xl "
            >
              <FiTwitter />
            </Link>
          </>
          <>
            <Link
              href="https://www.instagram.com/dempserayo/C"
              className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-2xl "
            >
              <FiInstagram />
            </Link>
          </>
        </div>
      </div>

      <div
        className={`${
          visible ? 'translate-y-0' : 'translate-y-full'
        } fixed bottom-0 left-0 z-50 w-full  transition-transform duration-500 ease-in-out  hidden lg:block`}
      >
        <>
          <div className="w-full h-full flex flex-col-reverse lg:flex-row gap-4 lg:gap-0 p-6 opacity-80">
            {/* Options */}
            <div className="hidden w-full flex-row items-center justify-center lg:flex gap-4">
              <>
                <Link
                  href="/account/settings"
                  className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-2xl"
                >
                  <FiSettings />
                </Link>
              </>
              <>
                <Link
                  href="/login"
                  className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-2xl"
                >
                  <FiServer />
                </Link>
              </>
              <>
                <Link
                  href="/store"
                  className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-2xl"
                >
                  <FiShoppingCart />
                </Link>
              </>
              <>
                <Link
                  href="/faq"
                  className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-2xl"
                >
                  <FiCalendar />
                </Link>
              </>
              <>
                <Link
                  href="/"
                  className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-2xl"
                >
                  <FiLogOut />
                </Link>
              </>
            </div>

            {/* By Miguel Angel Jaimes Parra */}
            <div className="w-full h-auto text-center flex flex-col justify-center">
              <p className="text-sm tracking-tight leading-tight  text-[#737373] ">
                ¡Contactanos!
              </p>
              <p className="text-sm tracking-tight leading-tight   text-[#737373] ">
                {' '}
                © 2025 Dr.Cuotas All rights reserved.{' '}
              </p>
            </div>

            {/* Social media */}
            <div className="w-full flex-row items-center justify-center flex gap-4">
              <>
                <Link
                  href="https://www.instagram.com/dempserayo/C"
                  className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-2xl "
                >
                  <FiUser />
                </Link>
              </>
              <>
                <Link
                  href="https://www.instagram.com/dempserayo/C"
                  className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-2xl "
                >
                  <FiTwitter />
                </Link>
              </>
              <>
                <Link
                  href="https://www.instagram.com/dempserayo/C"
                  className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-2xl "
                >
                  <FiInstagram />
                </Link>
              </>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default FooterPrincipal;
