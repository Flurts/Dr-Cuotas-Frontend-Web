'use client';
import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { AiOutlineContacts, AiOutlineFileSearch } from 'react-icons/ai';
import { IoClose, IoCloseCircleSharp } from 'react-icons/io5';
import { TiThMenu } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';

import SocialMedia from '@/components/common/socialMedia';
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
      <div>
        {/* flex justify-center items-center w-full border-b-2 py-4 px-4 */}
        <div className="flex justify-center items-center w-full border-b-2 p-4">
          <div className="flex flex-row justify-between w-full max-w-screen-2xl ">
            <Link
              href="/"
              className="w-[570px]  flex items-center justify-center mb-2 -mt-2 lg:-mt-1 "
            >
              <Image
                src="/images/logo/logo-1.svg"
                alt="Logo"
                width={200}
                height={200}
                className="w-60 flex justify-center items-center"
              />
            </Link>

            <div className="flex justify-end  items-center w-screen  lg:hidden ">
              <button onClick={handleMenuToggle}>
                <TiThMenu className="text-2xl text-[#6636E2] text-center mx-2" />
              </button>
            </div>

            <div className="hidden lg:flex flex-row items-center justify-end w-full mx-4">
              {menuOptions.map((tab, index) => (
                <Link key={index} href={tab.href}>
                  <span className="text-[#6636E2] text-xl md:text-lg m-2 font-normal md:font-semibold cursor-pointer">
                    {t(tab.label)}
                  </span>
                  {index < menuOptions.length - 1 && (
                    <span className="text-[#6636E2] text-xl">|</span>
                  )}
                </Link>
              ))}
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

              <SocialMedia className="lg:mx-8" />
            </div>
          </div>
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
                          {React.createElement(
                            option.icon as React.ElementType,
                            { className: 'text-[#6636E2]' },
                          )}
                          {option.label}
                        </Link>
                      ) : (
                        <span className="text-[#6636E2] text-lg flex items-center font-bold cursor-pointer gap-3">
                          {React.createElement(
                            option.icon as React.ElementType,
                            { className: 'text-[#6636E2]' },
                          )}
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
      </div>
      <div className="flex flex-col items-center justify-center">
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
}

export default AccountLayout;
