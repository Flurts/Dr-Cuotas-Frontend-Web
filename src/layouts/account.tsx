'use client';
import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { AiOutlineContacts, AiOutlineFileSearch } from 'react-icons/ai';
import { FiMenu, FiUser } from 'react-icons/fi';
import { IoClose, IoCloseCircleSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrentUser, getJwt, isLoggedIn, updateUser } from '@/store';
import { useCreateNewDoctorMutation, useGetUserDataLazyQuery } from '@/types';

import RegisterModal from './components/SignUp';

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
  const { t } = useTranslation('common');
  const isLogged = useSelector(isLoggedIn);
  const user = useSelector(getCurrentUser);
  const jwt = useSelector(getJwt);
  const [toggleModal, setToggleModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [CreateNewDoctor] = useCreateNewDoctorMutation();
  const router = useRouter();
  const [getUserData] = useGetUserDataLazyQuery();
  const dispatch = useDispatch();

  const [sticky] = useState(true);
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

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const result = await getUserData();
        if (result.data) {
          dispatch(
            updateUser({
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'user' does not exist on type '{}'.
              user: result.data.getUserData.user,
            }),
          );
        }
      }
    };

    void fetchData();
  }, [router.pathname]);

  const modalHandler = () => {
    setToggleModal(!toggleModal);
  };

  useEffect(() => {
    if (!isLogged) {
      void router.push('/');
    }
  }, [isLogged, router]);

  const handleDoctor = async () => {
    try {
      await CreateNewDoctor({
        context: {
          headers: {
            Authorization: jwt,
          },
        },
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const menuOptions = [
    { label: t('mySurgery'), href: '#surgeries', icon: AiOutlineFileSearch },
    {
      label: t('adjudicadosOfTheMonth'),
      href: '/awarded',
      icon: AiOutlineFileSearch,
    },
    { label: t('home'), href: '/', icon: AiOutlineContacts },
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`${className}`}>
      <nav
        className={`${
          sticky ? 'sticky top-0' : 'relative'
        } flex w-full  items-center justify-center  border-white p-4 bg-white transition-transform duration-500 z-50 ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <>
          <div className="flex w-full items-end justify-start xl:px-20">
            <Link
              href="/"
              className="font-extrabold transition-all duration-300 uppercase leading-tight tracking-wide text-xs w-auto "
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
                className="uppercase leading-tight tracking-wide font-black text-sm text-[#737373] hover:text-drcuotasPrimary"
              >
                Inicio
              </Link>
              <Link
                href="/store"
                className="uppercase leading-tight tracking-wide font-black text-sm text-[#737373] hover:text-drcuotasPrimary"
              >
                Tienda
              </Link>
              <Link
                href="/professionals"
                className="uppercase leading-tight tracking-wide font-black text-sm text-[#737373] hover:text-drcuotasPrimary"
              >
                Doctores
              </Link>
              <Link
                href="/faq"
                className="uppercase leading-tight tracking-wide font-black text-sm text-[#737373] hover:text-drcuotasPrimary"
              >
                Soporte
              </Link>
              <Link
                href="/faq"
                className="uppercase leading-tight tracking-wide font-black text-sm text-[#737373] hover:text-drcuotasPrimary"
              >
                FAQ
              </Link>
            </ul>
          </div>
        </>
        <>
          <div className="flex w-20 lg:w-full items-center justify-center gap-2">
            <>
              <Link
                className="text-[#737373] hover:text-drcuotasPrimary font-black uppercase leading-tight tracking-tight w-40 h-10 border-2 hover:border-drcuotasPrimary border-[#737373]  hidden lg:flex flex-row justify-center items-center  group rounded-xl hover:scale-100 transition-all duration-300 gap-2 "
                href='/'
              >
                <span className="text-sm">Salir</span>
                <FiUser className="text-2xl " />
              </Link>
            </>

            <>
              <button
                className="text-drcuotasPrimary-text lg:text-white font-semibold w-20 h-10 lg:border-2 border-[#737373] lg:bg-[#737373] back lg:hover:bg-drcuotasPrimary hover:border-drcuotasPrimary flex lg:hidden flex-row justify-center items-center  group rounded-xl hover:scale-100 transition-all duration-300 gap-2 "
                onClick={handleMenuToggle}
              >
                <FiMenu className="text-2xl lg:text-base" />
              </button>
            </>
          </div>
        </>
      </nav>

      <div className="hidden  flex-row items-center justify-end w-full mx-4">
        {user.doctor?.id && (
          <Link
            className="bg-[#6636E2]  hover:shadow-2xl hover:shadow-[#B398F5]  hover:scale-105 transition-all duration-300 h-10 w-28 xl:w-32 flex justify-center items-center rounded-full"
            href={`/account/doctor/${user.doctor.id}`}
          >
            <span className="text-white text-xl md:text-lg m-2 font-normal md:font-semibold cursor-pointer">
              {t('Doctor')}
            </span>
          </Link>
        )}
        {isLogged && !user.doctor?.id && (
          <button
            onClick={handleDoctor}
            className="text-[#6636E2] text-xl md:text-lg m-2 font-normal md:font-semibold cursor-pointer"
          >
            Create new {t('Doctor')}
          </button>
        )}
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md h-screen z-50 flex justify-center items-center"
          onClick={handleMenuToggle}
        >
          <div className="fixed inset-y-0 right-0 w-60 h-screen animate-fade-left bg-white z-50 overflow-y-auto">
            <div className="flex justify-end px-4  border-b">
              <button className="text-gray-600" onClick={handleMenuToggle}>
                <IoClose className="h-12 w-12 p-2 font-extrabold text-[#6636E2]" />
              </button>
            </div>
            {isLogged && user && (
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
                <div className="w-full text-center">
                  <p className="text-[#6636E2] text-sm font-bold">
                    {user.first_name}
                  </p>
                  <p className="text-[#6636E2] text-sm font-semibold">
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            <div className="px-4 py-6">
              <ul className="space-y-2">
                {menuOptions.map((option, index) => (
                  <li key={index} onClick={handleMenuToggle}>
                    {option.href ? (
                      <Link
                        href={option.href}
                        className="text-[#6636E2] w-screen  text-lg flex items-center font-bold cursor-pointer gap-3"
                        onClick={handleMenuToggle}
                      >
                        {React.createElement(option.icon as React.ElementType, {
                          className: 'text-[#6636E2]',
                        })}
                        {option.label}
                      </Link>
                    ) : (
                      <span className="text-[#6636E2] text-lg flex items-center font-bold cursor-pointer gap-3">
                        {React.createElement(option.icon as React.ElementType, {
                          className: 'text-[#6636E2]',
                        })}
                        {option.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* MODAL */}
      {toggleModal && (
        <div className="fixed inset-0   bg-black h-screen bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 xl:w-[460px] w-[350px] relative">
            <IoCloseCircleSharp
              className="text-2xl text-gray-500 absolute top-4 right-4 cursor-pointer"
              onClick={modalHandler}
            />
            <div className="z-50">
              <RegisterModal modalHandler={modalHandler} />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center justify-center">
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
}

export default AccountLayout;
