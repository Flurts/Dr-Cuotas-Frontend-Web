'use client';
import { Box } from '@mui/material';
import { LucideMessagesSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiLogIn, FiMenu, FiUser } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
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

function AccountLayout({ children, className }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLogged = useSelector(isLoggedIn);
  const user = useSelector(getCurrentUser);
  const [sticky, setSticky] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

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
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [lastScrollY, scrollTimeout]);

  return (
    <div className={`${className}`}>
      <nav
        className={`${
          sticky ? 'sticky top-0' : 'relative'
        } z-50 flex w-full h-24  justify-center lg:justify-end items-center p-2  bg-white  backdrop-blur-3xl shadow-2xl shadow-white   transition-transform duration-500  ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <>
          <div className="flex w-full items-end justify-start xl:px-20">
            <Link
              href="/"
              className="font-extrabold uppercase leading-tight tracking-wide text-xs w-auto"
            >
              <Image
                src="/images/logo/logo-1.svg"
                alt="Logo"
                width={110}
                height={110}
                className="w-40 h-full"
              />
            </Link>
          </div>
        </>
        <>
          <div className="hidden lg:flex w-full items-center justify-center gap-80">
            <ul className="flex flex-row justify-center items-center w-auto h-auto gap-4">
              <Link
                href="/"
                className="uppercase leading-tight tracking-tight font-black text-sm text-[#737373] hover:text-drcuotasPrimary"
              >
                Inicio
              </Link>
              <Link
                href="/store"
                className="uppercase leading-tight tracking-tight font-black text-sm text-[#737373] hover:text-drcuotasPrimary"
              >
                Tienda
              </Link>
              <Link
                href="/financing"
                className="uppercase leading-tight tracking-tight font-black text-sm text-[#737373] hover:text-drcuotasPrimary"
              >
                Cuotas
              </Link>
              <Link
                href="/professionals"
                className="uppercase leading-tight tracking-tight font-black text-sm text-[#737373] hover:text-drcuotasPrimary"
              >
                Doctores
              </Link>
              <Link
                href="/faq"
                className="uppercase leading-tight tracking-tight font-black text-sm text-[#737373] hover:text-drcuotasPrimary"
              >
                Soporte
              </Link>
            </ul>
          </div>
        </>
        <>
          <div className="flex w-20 lg:w-full items-center justify-center gap-2">
            {!isLogged ? (
              <>
                <Link
                  href="/login"
                  className="text-[#737373] hover:text-white hover:bg-drcuotasPrimary-bg hover:border-drcuotasPrimary-bg font-black uppercase border-2 border-[#737373] w-40 h-10 hidden lg:flex items-center justify-center rounded-xl transition-all duration-300 gap-2"
                >
                  <span className="text-sm">Login</span>
                  <FiLogIn className="uppercase leading-tight tracking-tight font-black text-xl" />
                </Link>
                <Link
                  href="/login"
                  className="bg-[#737373] hover:bg-white text-white hover:text-drcuotasPrimary font-black uppercase border-2 border-[#737373] hover:border-drcuotasPrimary w-40 h-10 hidden lg:flex items-center justify-center rounded-xl transition-all duration-300 gap-2"
                >
                  <span className="text-sm">Register</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/account"
                  className="bg-drcuotasPrimary hover:bg-white text-white hover:text-drcuotasPrimary font-black uppercase border-2 border-drcuotasPrimary w-20 h-10 hidden lg:flex items-center justify-center rounded-xl transition-all duration-300 gap-2"
                >
                  {/* <span className="uppercase leading-tight tracking-tight text-sm">
                    Cuenta
                  </span> */}
                  <FiUser className="text-2xl" />
                </Link>
                <Link
                  href="/"
                  className="  text-drcuotasPrimary hover:text-white hover:bg-green-500 font-black uppercase border-2 border-drcuotasPrimary hover:border-green-500 w-20 h-10 hidden lg:flex items-center justify-center rounded-xl transition-all duration-300 gap-2"
                >
                  {/* <span className="uppercase leading-tight tracking-tight text-sm">
                    Cuenta
                  </span> */}
                  {/* <FiUser className="text-2xl" /> */}
                  <LucideMessagesSquare className="text-2xl" />
                </Link>
              </>
            )}

            <button
              className="text-drcuotasPrimary lg:hidden flex items-center justify-center rounded-xl w-10 h-10"
              onClick={handleMenuToggle}
            >
              <FiMenu className="text-2xl" />
            </button>
          </div>
        </>
      </nav>
      {isMenuOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 z-50"
          onClick={handleMenuToggle}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 h-full w-52 bg-white  border  transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 z-50`}
      >
        <button
          className="absolute top-4 right-4 text-gray-600"
          onClick={handleMenuToggle}
        >
          <IoClose className="text-2xl" />
        </button>
        <ul className="p-6 space-y-4">
          {!isLogged ? (
            <li>
              <Link
                href="/login"
                className="text-drcuotasPrimary font-bold uppercase leading-tight tracking-tight"
              >
                Iniciar Sesión
              </Link>
            </li>
          ) : (
            <li>
              <Link
                href="/account"
                className="text-drcuotasPrimary font-bold uppercase leading-tight tracking-tight"
              >
                Cuenta
              </Link>
            </li>
          )}

          <li>
            <Link
              href="/"
              className="text-drcuotasPrimary font-bold uppercase leading-tight tracking-tight"
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              href="/store"
              className="text-drcuotasPrimary font-bold uppercase leading-tight tracking-tight"
            >
              Tienda
            </Link>
          </li>
          <li>
            <Link
              href="/professionals"
              className="text-drcuotasPrimary font-bold uppercase leading-tight tracking-tight"
            >
              Doctores
            </Link>
          </li>
          <li>
            <Link
              href="/faq"
              className="text-drcuotasPrimary font-bold uppercase leading-tight tracking-tight"
            >
              Soporte
            </Link>
          </li>
        </ul>
      </div>
      <Box>{children}</Box>
    </div>
  );
}

export default AccountLayout;
