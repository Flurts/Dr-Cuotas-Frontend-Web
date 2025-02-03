import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { PiArrowRight } from 'react-icons/pi';

function KnowOurProfessionals() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-2 py-16">
      <div className="w-full max-w-screen-xl  flex flex-row justify-center items-center p-10">
        <>
          {/* Conoce a nuestros Profesionales */}
          <div className="w-full h-full flex flex-col justify-center gap-2 p-4 ">
            <div className="bg-[#8576FF] w-24 h-2"></div>
            <h1 className="text-[40px] font-bold text-[#252B42]">
              Conoce a nuestros profesionales
            </h1>
            <p className="text-sm text-[#737373]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Link
              href="/professionals"
              className="w-full text-[#8576FF] text-start font-bold flex  items-center gap-2"
            >
              Ver mas
              <PiArrowRight />
            </Link>
          </div>

          {/* Imagen y Calendario */}
          <div className="w-full h-full flex justify-center items-center">
            <Image
              src="/images/ShowPro.svg"
              alt="Logo"
              width={500}
              height={500}
            />
          </div>
        </>
      </div>
    </div>
  );
}

export default KnowOurProfessionals;
