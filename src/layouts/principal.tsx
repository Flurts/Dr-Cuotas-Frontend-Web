'use client';
import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Import useRouter
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import {
  AiOutlineFileAdd,
  AiOutlineFileDone,
  AiOutlineFileSearch,
  AiOutlineFileText,
} from 'react-icons/ai';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { PiArrowRight } from 'react-icons/pi';
import { TiThMenu } from 'react-icons/ti';
import { useSelector } from 'react-redux';

import { getCurrentUser, isLoggedIn } from '@/store';

interface Props {
  children: JSX.Element;
  className?: string;
}

const MemoizedChildren = React.memo(function MemoizedChildren({
  children,
}: Props) {
  return (
    <Box sx={{ pb: '0px' }} position="relative">
      {children}
    </Box>
  );
});

const MainContent = ({ children }: Props) => {
  return (
    <Box
      sx={{
        mt: '0px',
        pb: '0px',
        minHeight: '80vh',
        width: '100%',
      }}
    >
      <MemoizedChildren>{children}</MemoizedChildren>
    </Box>
  );
};

const navItems = [
  { text: 'Inicio', href: '/' },
  { text: 'Cirugía', href: '/store' },
  { text: 'Adjudicado', href: '/awarded' },
  { text: 'Profesionales', href: '/professionals' },
  { text: 'Financiación', href: '/financing' },
  { text: 'Preguntas Frecuentes', href: '/faq' },
];

function PrincipalLayout({ children, className }: Props) {
  const { t } = useTranslation('common');
  const isLogged = useSelector(isLoggedIn);
  const user = useSelector(getCurrentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const registerHandler = () => {
    void router.push('/login?view=register');
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tabs = [
    { text: 'Home', href: '/' },
    { text: 'About', href: '/faq' },
    { text: 'Contact Us', href: '/professionals' },
  ];

  const menuOptions = [
    {
      label: 'Iniciar Sesión',
      href: '/login',
      icon: FaSignInAlt,
      showIfNotLogged: true,
    },
    {
      label: 'Registrarse',
      href: '#',
      icon: FaUserPlus,
      onClick: registerHandler,
      showIfNotLogged: true,
    },
    { label: 'Home', href: '/', icon: AiOutlineFileText },
    { label: 'About', href: '/faq', icon: AiOutlineFileText },
    {
      label: 'Contact',
      href: '/professionals',
      icon: AiOutlineFileAdd,
    },
    { label: 'Cirugías', href: '/store', icon: AiOutlineFileSearch },
    { label: 'Adjudicados', href: '/awarded', icon: AiOutlineFileDone },
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (href: string) => router.pathname === href;

  return (
    <div className={`${className}`}>
      <div>
        <div className="w-full flex flex-row justify-center items-center p-4">
          <Link href="/" className="w-full flex justify-center items-center">
            <Image
              src="/images/logo/logo-1.svg"
              alt="Logo"
              width={150}
              height={150}
            />
          </Link>

          <div className="w-full flex justify-end items-center lg:hidden text-xl text-[#6636E2] text-center">
            <button onClick={handleMenuToggle}>
              <TiThMenu />
            </button>
          </div>

          <div className="w-full hidden lg:flex flex-row items-center justify-center">
            <ul className="xl:w-full   flex flex-row justify-center items-center gap-4 text-xs 2xl:text-[14px] font-bold">
              {navItems.map((item, index) => (
                <Link href={item.href} key={index}>
                  <p
                    className={`w-full truncate  ${
                      isActive(item.href)
                        ? 'text-[#737373] border-b-2 border-[#6636E2]'
                        : 'text-[#737373]'
                    }`}
                  >
                    {item.text}
                  </p>
                </Link>
              ))}
            </ul>
          </div>

          <div className="w-full flex flex-row items-center justify-center">
            {!isLogged ? (
              <>
                <Link
                  className="text-[#6636E2] font-semibold w-52 h-12  flex flex-row justify-center items-center  group rounded-full hover:scale-100 transition-all duration-300"
                  href="/login"
                >
                  <span> {t('login')}</span>
                </Link>

                <div
                  className="bg-[#6636E2] gap-2 hover:bg-white hover:border hover:text-[#6636E2] hover:border-[#6636E2] text-white text-[14px] font-bold hover:shadow-[#B398F5] hover:shadow-2xl w-52 h-12  flex flex-row justify-center items-center group rounded-[10px] hover:scale-100 transition-all duration-300"
                  onClick={registerHandler}
                >
                  <span> {t('register')}</span>
                  <PiArrowRight />
                </div>
              </>
            ) : (
              <Link
                className="bg-[#6636E2]  hover:bg-white hover:border hover:text-[#6636E2] hover:border-[#6636E2] text-white text-[14px] font-semibold hover:shadow-[#B398F5] hover:shadow-2xl w-52 h-12  flex flex-row justify-center items-center gap-2 group rounded-full hover:scale-105 transition-all duration-300"
                href="/account"
              >
                <span>{t('MyAccount')}</span>
                <PiArrowRight />
              </Link>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <>
            <div
              className="h-screen w-screen  flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm  z-50"
              onClick={handleMenuToggle}
            >
              <div className="fixed inset-y-0 right-0 w-60 h-screen animate-fade-left bg-white z-50 overflow-y-auto animation-fade-in-030">
                <div className="flex justify-end border-b p-2 ">
                  <button onClick={handleMenuToggle}>
                    <IoClose className="h-6 w-6 text-[#6636E2]" />
                  </button>
                </div>
                {!isLogged && user && (
                  <div className="px-4 py-6  flex items-center justify-center flex-col">
                    <div className="rounded-full overflow-hidden border-4 border-[#6636E2] w-20 h-20 flex-shrink-0">
                      <Image
                        src={user.profile_picture ?? '/images/logo/logo-1.svg'}
                        alt="Perfil"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-full text-center bg-red-500 text-[#6636E2] text-sm font-bold">
                      <p>{user.first_name}</p>
                      <p>{user.email}</p>
                    </div>
                  </div>
                )}

                <div className="px-4 py-6">
                  <ul className="space-y-2">
                    {menuOptions.map((option, index) => (
                      <>
                        <li key={index} onClick={handleMenuToggle}>
                          {option.onClick ? (
                            <button
                              className="text-[#6636E2]  w-screen text-lg flex items-center font-bold cursor-pointer gap-3 bg-green-500 "
                              onClick={option.onClick}
                            >
                              {React.createElement(option.icon, {})}
                              {option.label}
                            </button>
                          ) : (
                            <Link
                              href={option.href}
                              className="text-[#6636E2] w-screen  text-lg flex items-center font-bold cursor-pointer gap-3 bg-red-"
                              onClick={handleMenuToggle}
                            >
                              {React.createElement(option.icon, {})}
                              {option.label}
                            </Link>
                          )}
                        </li>
                      </>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex flex-col items-center justify-center">
          <MainContent>{children}</MainContent>
        </div>
      </div>
    </div>
  );
}

export default PrincipalLayout;
