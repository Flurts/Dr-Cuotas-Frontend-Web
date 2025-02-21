'use client';
import { Box, Modal, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiLogIn, FiMenu, FiShoppingCart, FiUser } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { useSelector } from 'react-redux';

import { getCurrentUser, isLoggedIn } from '@/store';

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
  const isLogged = useSelector(isLoggedIn);
  const user = useSelector(getCurrentUser);
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

  const handleCartOpen = () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    setCartOpen(true);
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

  return (
    <div className={`${className}`}>
      <nav
        className={`${
          sticky ? 'sticky top-0' : 'relative'
        } z-50 flex w-full h-24  justify-center lg:justify-end items-center p-2  bg-white backdrop-blur-3xl transition-transform duration-500  ${
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
                  className="text-[#737373] hover:text-drcuotasPrimary font-black uppercase border-2 border-[#737373] w-40 h-10 hidden lg:flex items-center justify-center rounded-xl transition-all duration-300 gap-2"
                >
                  <span className="text-sm">Login</span>
                  <FiLogIn className="uppercase leading-tight tracking-tight font-black text-xl" />
                </Link>
                <Link
                  href="/login"
                  className="bg-[#737373] hover:bg-white text-white hover:text-drcuotasPrimary font-black uppercase border-2 border-[#737373] hover:border-drcuotasPrimary w-20 h-10 hidden lg:flex items-center justify-center rounded-xl transition-all duration-300 gap-2"
                >
                  <FiShoppingCart className="text-2xl" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/account"
                  className="bg-drcuotasPrimary hover:bg-white text-white hover:text-drcuotasPrimary font-black uppercase border-2 border-drcuotasPrimary w-40 h-10 hidden lg:flex items-center justify-center rounded-xl transition-all duration-300 gap-2"
                >
                  <span className="uppercase leading-tight tracking-tight text-sm">
                    Cuenta
                  </span>
                  <FiUser className="text-2xl" />
                </Link>
                <button
                  onClick={handleCartOpen}
                  className="bg-drcuotasPrimary hover:bg-white text-white hover:text-drcuotasPrimary font-black uppercase border-2 border-drcuotasPrimary w-20 h-10 hidden lg:flex items-center justify-center rounded-xl transition-all duration-300 gap-2"
                >
                  <FiShoppingCart className="text-2xl" />
                </button>
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
                <span>{item.title}</span>
                <div>
                  <Typography variant="body1">{item.name}</Typography>
                  <Typography variant="body2" className="text-gray-600">
                    ${item.price}
                  </Typography>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="ml-auto text-red-500"
                >
                  <IoClose size={20} />
                </button>
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
