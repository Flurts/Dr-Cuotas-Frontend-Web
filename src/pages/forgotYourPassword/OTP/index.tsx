import Link from 'next/link';
import React from 'react';

import { Head } from '@/components/constants';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

const otpView = () => {
  return (
    <>
      <Head title="New Password" />
      <div className="w-screen md:w-full h-screen flex flex-col justify-center items-center gap-4 ">
        <div className="w-96 h-96  flex flex-col ">
          <div className="w-full h-full flex flex-col items-center gap-4 ">
            <h1 className="text-4xl font-bold text-[#6636E2] ">Verificación</h1>
            <p className="text-xs text-center text-[#6636E2]">
              Hemos enviado OTP a su correo
            </p>
            <p className="text-xs text-center text-[#6636E2]">
              Por favor, introduzca el código de 4 dígitos que reciba.
            </p>
            <InputOTP maxLength={6}>
              <InputOTPGroup className="gap-2 text-[#6636E2]">
                <InputOTPSlot className="border border-[#6636E2]" index={0} />
                <InputOTPSlot className="border border-[#6636E2]" index={1} />
                <InputOTPSlot className="border border-[#6636E2]" index={2} />
                <InputOTPSlot className="border border-[#6636E2]" index={3} />
              </InputOTPGroup>
            </InputOTP>

            <div className="w-full h-full flex flex-col gap-2">
              <p className="text-xs text-center text-[#6636E2]">
                ¿No ha recibido el código?
              </p>
              <p className="text-xs text-center text-[#6636E2]">
                Reenviar código en 00:30
              </p>
              <Link
                href=""
                className="text-[#6636E2] text-center p-1 w-full rounded justify-center items-center"
              >
                Reenviar código
              </Link>
            </div>

            <Link
              href="/forgotYourPassword\newPassword"
              className="bg-[#6636E2] text-white text-center p-1 w-full rounded-full justify-center items-center hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-[#B398F5]  hover:bg-white hover:border hover:text-[#6636E2] hover:border-[#6636E2]"
            >
              Enviar
            </Link>

            <Link
              href="/forgotYourPassword"
              className="bg-[#6636E2] text-white text-center p-1 w-full rounded-full justify-center items-center hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-[#B398F5]  hover:bg-white hover:border hover:text-[#6636E2] hover:border-[#6636E2]"
            >
              Volver
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default otpView;
