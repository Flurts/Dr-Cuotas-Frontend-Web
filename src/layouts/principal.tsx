/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { Box, Modal, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  FiHeart,
  FiMail,
  FiMenu,
  FiMessageSquare,
  FiShoppingCart,
  FiUser,
  FiUsers,
} from 'react-icons/fi';
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
        } z-50 flex w-full h-24  justify-center sm:justify-end items-center  bg-white shadow-md  transition-transform duration-500  ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        {/* Imagen */}
        <>
          <div className="flex w-full lg:items-center lg:justify-center p-4 lg:p-0">
            <Link href="/">
              <Image
                src="/images/logo/logo-1.svg"
                alt="Logo"
                width={100}
                height={100}
                className="w-24 lg:w-40 h-full"
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
                Cirujías
              </Link>
              <Link
                href="/financing"
                className=" leading-tight tracking-tight font-bold text-xs  hover:text-drcuotasPrimary transition-all durations-500"
              >
                Trasformación
              </Link>
              <Link
                href="/professionals"
                className=" leading-tight tracking-tight font-bold text-xs  hover:text-drcuotasPrimary transition-all durations-500"
              >
                Cirujanos
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
                  <RxExit />
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
              className="text-drcuotasSecondaryPrimaryColor-text lg:hidden flex items-center justify-center"
              onClick={handleMenuToggle}
            >
              <FiMenu />
            </button>
          </div>
        </>
      </nav>
      {isMenuOpen && (
        <div
          className="fixed inset-0 backdrop-blur-xl bg-drcuotasSecondaryPrimaryColor bg-opacity-20 z-50"
          onClick={handleMenuToggle}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white  shadow-2xl shadow-white  transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 z-50`}
      >
        <button
          className="absolute top-4 right-4 text-gray-600"
          onClick={handleMenuToggle}
        >
          <IoClose className="text-2xl" />
        </button>
        <ul className="p-4 flex flex-col gap-4">
          {!isLogged ? (
            <li>
              <Link
                href="/login"
                className="hover:text-drcuotasPrimary transition-all durations-500 flex flex-row gap-2 items-center leading-tight tracking-tight"
              >
                <FiUser />
                <p>Ingresar</p>
              </Link>
            </li>
          ) : (
            <div className="w-full flex flex-col gap-4">
              <li>
                <Link
                  href={getAccountUrl()}
                  className="hover:text-drcuotasPrimary transition-all durations-500 flex flex-row gap-2 items-center leading-tight tracking-tight"
                >
                  <FiUser />
                  <p>Perfil</p>
                </Link>
              </li>
              <button
                onClick={HandleLogOut}
                className="hover:text-drcuotasPrimary transition-all durations-500 flex flex-row gap-2 items-center leading-tight tracking-tight"
              >
                <RxExit />
                <p>Salir</p>
              </button>
            </div>
          )}
          <li>
            <Link
              href="/store"
              className="hover:text-drcuotasPrimary transition-all durations-500 flex flex-row gap-2 items-center leading-tight tracking-tight"
            >
              <FiShoppingCart />
              <p>Cirujías</p>
            </Link>
          </li>
          <li>
            <Link
              href="/financing"
              className="hover:text-drcuotasPrimary transition-all durations-500 flex flex-row gap-2 items-center leading-tight tracking-tight"
            >
              <FiHeart />
              <p>Trasformación</p>
            </Link>
          </li>
          <li>
            <Link
              href="/professionals"
              className="hover:text-drcuotasPrimary transition-all durations-500 flex flex-row gap-2 items-center leading-tight tracking-tight"
            >
              <FiUsers />
              <p>Cirujanos</p>
            </Link>
          </li>
          <li>
            <Link
              href="/faq"
              className="hover:text-drcuotasPrimary transition-all durations-500 flex flex-row gap-2 items-center leading-tight tracking-tight"
            >
              <FiMessageSquare />
              <p>Preguntas</p>
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:text-drcuotasPrimary transition-all durations-500 flex flex-row gap-2 items-center leading-tight tracking-tight"
            >
              <FiMail />
              <p>Contacto</p>
            </Link>
          </li>
        </ul>
      </div>
      <Modal open={cartOpen} onClose={handleCartClose}>
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg w-96">
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
