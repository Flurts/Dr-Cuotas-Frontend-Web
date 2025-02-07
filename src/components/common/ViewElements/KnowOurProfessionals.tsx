import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { PiArrowRight } from 'react-icons/pi';

function KnowOurProfessionals() {
  return (
    <>
      <div className="hidden lg:flex flex-col items-center justify-center w-full h-full  p-20">
        <div className="w-full max-w-screen-xl h-full  flex flex-col gap-4 lg:flex-row justify-center items-center">
          <>
            {/* Conoce a nuestros Profesionales */}
            <div className="w-full h-full flex flex-col justify-center lg:gap-4 ">
              <div className="bg-drcuotasPrimary w-40 h-4 hidden lg:block"></div>
              <h1 className="text-lg sm:text-2xl text-drcuotasPrimary lg:text-7xl font-black uppercase leading-tight tracking-tight text-center lg:text-start">
              Nuestros Profesionales
              </h1>
              <p className="text-xs  text-[#737373]  text-center lg:text-start tracking-tight leading-tightt hidden lg:block">
                Con los mejores expertos en estética de la ciudad, te ofrecemos
                tratamientos personalizados para realzar tu belleza. ¡Transforma
                tu look con los mejores en el área!{' '}
              </p>
           

              <Link
                href="/professionals"
                className="w-full lg:w-32 text-drcuotasPrimary text-center font-extrabold uppercase flex justify-center  items-center gap-2 lg:gap-4"
              >
                Ver mas
                
                <FiChevronRight />
              </Link>
            </div>
           
            {/* Imagen y Calendario */}
            <div className="w-full h-full flex justify-center items-center">
            <Link href="/professionals">
              <Image
                src="/images/ShowPro.svg"
                alt="Logo"
                width={500}
                height={500}
                />
            </Link>
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default KnowOurProfessionals;
