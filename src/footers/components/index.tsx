/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';
import { LucideLinkedin } from 'lucide-react';
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
          <p className="text-xs tracking-tight leading-tight">¡Contactanos!</p>
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
  );
};

export default FooterPrincipal;
