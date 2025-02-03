import Link from 'next/link';
// import { useTranslation } from 'next-i18next';
import React from 'react';

const PasswordView = () => {
  // const { t } = useTranslation('common');

  return (
    <>
      <div className="flex flex-col xl:h-96 h-[25rem] mb-40 pt-20 w-full justify-start xl:justify-center items-center ">
        <div className=" bg-white xl:w-[26rem] flex flex-col gap-3">
          <div className="w-screen md:w-full flex flex-col justify-center items-center gap-2">
            <div className="w-96 h-full flex flex-col items-center justify-center gap-2">
              <h1 className="text-[#6636E2] text-3xl md:text-4xl text-center font-bold">
                Recuperar contraseña
              </h1>
              <p className="text-[#6636E2] text-base">
                Ingresá tu dirección de correo electrónico
              </p>

              <div className="w-full h-40 flex justify-center items-center">
                <input
                  type="text"
                  placeholder="Email or Phone"
                  className="border-[#6636E2] text-[#6636E2] border rounded-xl p-2 w-80 md:w-full"
                />
              </div>

              <p className="text-[#6636E2] text-base w-full text-center">
                te enviaremos un enlace a la dirección de correo indicada para
                recuperar tu contraseña
              </p>

              <Link
                href="/forgotYourPassword\OTP"
                className="bg-[#6636E2] text-white text-center p-1 w-80 md:w-full rounded-full justify-center items-center hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-[#B398F5]  hover:bg-white hover:border hover:text-[#6636E2] hover:border-[#6636E2]"
              >
                Continuar
              </Link>
              <Link
                href="/login"
                className="bg-[#6636E2] text-white text-center p-1 w-full rounded-full justify-center items-center hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-[#B398F5]  hover:bg-white hover:border hover:text-[#6636E2] hover:border-[#6636E2]"
              >
                Volver
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordView;
