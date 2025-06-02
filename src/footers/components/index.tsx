/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';
import { LucideLinkedin, LucideShieldQuestion } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Añadido useRouter
import React from 'react';
import {
  FiHome,
  FiInstagram,
  FiMapPin,
  FiMessageSquare,
  FiRefreshCw,
  FiShoppingCart,
  FiTwitter,
  FiUser,
} from 'react-icons/fi';

// @ts-expect-error
const FooterPrincipal = ({ toggleDarkMode, darkMode }) => {
  const router = useRouter(); // Inicializa el router

  const HandleLogOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    localStorage.removeItem('nextauth.message');
    console.log('LogOut');
    // Redirigir a la página principal y luego recargar
    void router.push('/').then(() => {
      window.location.reload();
    });
  };

  return (
    <>
      <>
        <div className="w-full h-auto p-10  flex lg:hidden flex-col justify-end items-end -z-20">
          {/* Options */}
          <div className="w-full flex-row items-center justify-center flex gap-4">
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
                <LucideShieldQuestion />
              </Link>
            </>
          </div>

          {/* By Miguel Angel Jaimes Parra */}
          <div className="w-full h-auto text-center flex flex-col justify-center">
            <p className="text-xs lg:text-xs tracking-tight leading-tight uppercase  text-[#737373]">
              ¡Agenda hoy!
            </p>
            <p className="text-xs lg:text-xs tracking-tight leading-tight uppercase  text-[#737373]">
              © 2025 Dr.Cuotas All rights reserved.
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
      </>
      <>
        <div className="w-full h-60 hidden lg:flex flex-row justify-center items-center">
          {/* Options */}
          <div className="w-full flex flex-row justify-end items-center gap-4">
            <>
              <Link
                href="/"
                className="w-auto h-auto flex items-center justify-center   leading-tight tracking-tight  text-xl "
              >
                <FiHome />
              </Link>
            </>
            <>
              <Link
                href="/store"
                className="w-auto h-auto flex items-center justify-center   leading-tight tracking-tight text-xl"
              >
                <FiShoppingCart />
              </Link>
            </>
            <>
              <Link
                href="/faq"
                className="w-auto h-auto flex items-center justify-center   leading-tight tracking-tight text-xl"
              >
                <FiMessageSquare />
              </Link>
            </>
            <>
              <button
                onClick={HandleLogOut}
                className="w-auto h-auto flex items-center justify-center  leading-tight ttracking-tight  text-xl"
              >
                <FiRefreshCw />
              </button>
            </>
          </div>

          {/* By Miguel Angel Jaimes Parra */}
          <div className="w-full h-20  text-center flex flex-col justify-center">
            <p className="text-xs tracking-tight leading-tight">
              ¡Contactanos!
            </p>
            <p className="text-xs tracking-tight  leading-tight">
              {' '}
              © 2025 Dr.Cuotas All rights reserved.{' '}
            </p>
          </div>

          {/* Social media */}
          <div className="w-full flex flex-row justify-start items-center gap-4">
            <>
              <Link
                href="/"
                className="w-auto h-auto flex items-center justify-center leading-tight tracking-tight text-xl "
              >
                <FiMapPin />
              </Link>
            </>
            <>
              <Link
                href="https://www.instagram.com/drcuotas/"
                className="w-auto h-auto flex items-center justify-center  leading-tight tracking-tight  text-xl "
              >
                <FiInstagram />
              </Link>
            </>
            <>
              <Link
                href="https://www.linkedin.com/in/andres-argiel-estetica/"
                className="w-auto h-auto flex items-center justify-center  leading-tight tracking-tight   text-xl "
              >
                <LucideLinkedin />
              </Link>
            </>
          </div>
        </div>
      </>
    </>
  );
};

export default FooterPrincipal;
