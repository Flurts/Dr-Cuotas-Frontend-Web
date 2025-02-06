'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  BiLogoFacebook,
  BiLogoInstagramAlt,
  BiLogoTiktok,
  BiMap,
  BiMapAlt,
  BiMoney,
} from 'react-icons/bi';

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
      <div className="w-full h-full flex lg:hidden flex-col-reverse lg:flex-row gap-4 lg:gap-0 p-4 opacity-80 bg-[#E5F9F7] bg-opacity-40 ">
        {/* Options */}
        <div className="hidden w-full flex-row items-center justify-center lg:flex gap-4">
          <>
            <Link
              href="/faq"
              className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-2xl "
            >
              <BiMapAlt />
            </Link>
          </>
          <>
            <Link
              href="/faq"
              className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-xl "
            >
              <BiMap />
            </Link>
          </>
          <>
            <Link
              href="/faq"
              className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-2xl "
            >
              <BiMoney />
            </Link>
          </>
        </div>

        {/* By Miguel Angel Jaimes Parra */}
        <div className="w-full h-auto text-center flex flex-col justify-center">
          <p className="text-xs  tracking-tight leading-tight text-[#737373] ">
            Frontend Dempserayo
          </p>
          <p className="text-xs tracking-tight leading-tight  text-[#737373] ">
            {' '}
            © 2025 Dr Cuotas All rights reserved.{' '}
          </p>
        </div>

        {/* Social media */}
        <div className="w-full flex-row items-center justify-center flex gap-4">
          <>
            <Link
              href="https://www.instagram.com/dempserayo/C"
              className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-2xl "
            >
              <BiLogoInstagramAlt />
            </Link>
          </>
          <>
            <Link
              href="https://www.instagram.com/dempserayo/C"
              className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-xl "
            >
              <BiLogoTiktok />
            </Link>
          </>
          <>
            <Link
              href="https://www.instagram.com/dempserayo/C"
              className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-2xl "
            >
              <BiLogoFacebook />
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
          <div className="w-full h-full flex flex-col-reverse lg:flex-row gap-4 lg:gap-0 p-4 opacity-80">
            {/* Options */}
            <div className="hidden w-full flex-row items-center justify-center lg:flex gap-4">
              <>
                <Link
                  href="/faq"
                  className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-2xl "
                >
                  <BiMapAlt />
                </Link>
              </>
              <>
                <Link
                  href="/faq"
                  className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-xl "
                >
                  <BiMap />
                </Link>
              </>
              <>
                <Link
                  href="/faq"
                  className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-2xl "
                >
                  <BiMoney />
                </Link>
              </>
            </div>

            {/* By Miguel Angel Jaimes Parra */}
            <div className="w-full h-auto text-center flex flex-col justify-center">
              <p className="text-xs tracking-tight leading-tight  text-[#737373] ">
                Frontend Dempserayo
              </p>
              <p className="text-xs tracking-tight leading-tight text-[#737373] ">
                {' '}
                © 2025 Dempserayo - Dr Cuotas All rights reserved.{' '}
              </p>
            </div>

            {/* Social media */}
            <div className="w-full flex-row items-center justify-center flex gap-4">
              <>
                <Link
                  href="https://www.instagram.com/dempserayo/C"
                  className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-2xl "
                >
                  <BiLogoInstagramAlt />
                </Link>
              </>
              <>
                <Link
                  href="https://www.instagram.com/dempserayo/C"
                  className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-xl "
                >
                  <BiLogoTiktok />
                </Link>
              </>
              <>
                <Link
                  href="https://www.instagram.com/dempserayo/C"
                  className="w-auto h-auto flex items-center justify-center  text-[#737373] leading-tight tracking-wide  text-2xl "
                >
                  <BiLogoFacebook />
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
