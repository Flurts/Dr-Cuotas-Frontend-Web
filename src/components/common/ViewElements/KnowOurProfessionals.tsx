import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { PiArrowRight } from 'react-icons/pi';

function KnowOurProfessionals() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full p-20 bg-[#E5F9F7] bg-opacity-40">
        <div className="w-full max-w-screen-xl h-full  flex flex-col sm:flex-row justify-center items-center gap-20">
          <>
            {/* Conoce a nuestros Profesionales */}
            <div className="w-full h-full flex flex-col justify-center gap-4 ">
              <div className="bg-drcuotasPrimary w-24 h-2 "></div>
              <h1 className="text-lg sm:text-5xl lg:text-6xl font-extrabold text-drcuotasSecondary-text leading-tight uppercase tracking-tight text-center lg:text-start">
                Nuestro Equipo
              </h1>
              <p className="text-xs  text-[#737373]  text-center lg:text-start hidden sm:block tracking-tight">
              Con los mejores expertos en estética de la ciudad, te ofrecemos tratamientos personalizados para realzar tu belleza. ¡Transforma tu look con los mejores en el área!{' '}
              </p>
              <p className="text-xs  text-[#737373]  text-center lg:text-start block sm:hidden tracking-tight">
                Expertos en Estética.
              </p>

              <Link
                href="/professionals"
                className="w-full lg:w-32 text-drcuotasPrimary text-center font-extrabold uppercase flex justify-center  items-center lg:gap-8 "
              >
                Ver mas
                <PiArrowRight className="hidden lg:block" />
              </Link>
              <div className="w-full h-full lg:hidden flex justify-center items-center">
                <Image
                  src="/images/ShowPro.svg"
                  alt="Logo"
                  width={500}
                  height={500}
                />
              </div>
            </div>

            {/* Imagen y Calendario */}
            <div className="w-full h-full hidden lg:flex justify-center items-center">
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
    </>
  );
}

export default KnowOurProfessionals;
