/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { Box, Modal, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FiMenu, FiShoppingCart, FiUser } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { RxExit } from 'react-icons/rx';
import { useSelector } from 'react-redux';

import { isLoggedIn } from '@/store';

interface Props {
  children: JSX.Element;
  className?: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const PrincipalLayout = ({ children, className }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const isLogged = useSelector(isLoggedIn);

  const [sticky, setSticky] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRole(localStorage.getItem('role'));
    }
  }, []);

  const getAccountUrl = () => {
    if (role === 'Admin') return '/admin';
    if (role === 'User') return '/account';
    return '/account'; // Default
  };

  const handleCartClose = () => {
    setCartOpen(false);
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

  useEffect(() => {
    setHasToken(!!localStorage.getItem('accessToken'));
    // Now you can safely log it
  }, []);

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
    <div className={`${className}`}>
      <nav
        className={`${
          sticky ? 'sticky top-0' : 'relative'
        } z-50 flex w-full h-24  justify-center lg:justify-end items-center  bg-white shadow-md shadow-white  transition-transform duration-500  ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        {/* Imagen */}
        <>
          <div className="flex w-full items-end justify-center">
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
        {/* Paginado  */}
        <>
          <div className="hidden lg:flex w-full items-center justify-center">
            <ul className="flex flex-row justify-center items-center w-auto h-auto gap-4">
              <Link
                href="/"
                className=" leading-tight tracking-tight font-bold text-xs  hover:text-drcuotasPrimary transition-all durations-500"
              >
                Inicio
              </Link>
              <Link
                href="/store"
                className=" leading-tight tracking-tight font-bold text-xs  hover:text-drcuotasPrimary transition-all durations-500"
              >
                Tienda
              </Link>
              <Link
                href="/financing"
                className=" leading-tight tracking-tight font-bold text-xs  hover:text-drcuotasPrimary transition-all durations-500"
              >
                Financiación
              </Link>
              <Link
                href="/professionals"
                className=" leading-tight tracking-tight font-bold text-xs  hover:text-drcuotasPrimary transition-all durations-500"
              >
                Doctores
              </Link>
              <Link
                href="/faq"
                className=" leading-tight tracking-tight font-bold text-xs  hover:text-drcuotasPrimary transition-all durations-500"
              >
                Preguntas
              </Link>
              <Link
                href="/contact"
                className=" leading-tight tracking-tight font-bold text-xs  hover:text-drcuotasPrimary transition-all durations-500"
              >
                Contacto
              </Link>
            </ul>
          </div>
        </>
        <>
          <div className="flex w-20 lg:w-full items-center justify-center gap-4">
            {!isLogged && !hasToken ? (
              <>
                <Link
                  href="/login"
                  className="text-xl hover:text-drcuotasPrimary transition-all durations-500 hidden lg:flex"
                >
                  <FiUser />
                </Link>
                <Link
                  href="/store"
                  className="text-xl hover:text-drcuotasPrimary transition-all durations-500 hidden lg:flex"
                >
                  <FiShoppingCart />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={getAccountUrl()}
                  className="text-xl hover:text-drcuotasPrimary transition-all durations-500 hidden lg:flex"
                >
                  <FiUser />
                </Link>
                <button
                  onClick={HandleLogOut}
                  className="text-xl hover:text-drcuotasPrimary transition-all durations-500 hidden lg:flex"
                >
                  <RxExit  />
                </button>
                <Link
                  href="/store"
                  className="text-xl hover:text-drcuotasPrimary transition-all durations-500 hidden lg:flex"
                >
                  <FiShoppingCart />
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
        className={`fixed top-0 right-0 h-full w-52 lg:w-64 bg-white  border  transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 z-50`}
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
      <Modal open={cartOpen} onClose={handleCartClose}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-96">
          <Typography
            variant="h6"
            className="h-40 text-center flex items-center justify-center"
          >
            <span className="uppercase leading-tight tracking-tight font-black text-drcuotasPrimary-text text-2xl">
              Carrito de Compras
            </span>
          </Typography>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 mb-4 border-b pb-2"
              >
                <span>{item.name}</span>
                <div>
                  <Typography variant="body1">{item.name}</Typography>
                  <Typography variant="body2" className="text-gray-600">
                    ${item.price}
                  </Typography>
                </div>
              </div>
            ))
          ) : (
            <Typography variant="body1" className="text-center">
              <span className="leading-tight tracking-tight text-drcuotasSecondary-text">
                No hay productos en el carrito.
              </span>
            </Typography>
          )}
          <button
            onClick={handleCartClose}
            className="mt-4 w-full bg-drcuotasPrimary text-white p-2 rounded-md"
          >
            Cerrar
          </button>
        </Box>
      </Modal>
      <Box>{children}</Box>
    </div>
  );
};

export default PrincipalLayout;
