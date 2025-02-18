import Link from 'next/link';
import React from 'react';
import { PiArrowRight } from 'react-icons/pi';

import CardAdjudicated from './CardAdjudicated';

function OurAdjudicated() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full p-20">
        <div className="w-full max-w-screen-xl h-full  flex flex-col xl:flex-row justify-center items-center sm:gap-20">
          <>
            {/* Conoce a nuestros Profesionales */}
            <div className="w-full h-full flex flex-col justify-center gap-4 ">
              <div className="bg-drcuotasPrimary w-24 h-2"></div>
              <h1 className="text-base sm:text-5xl lg:text-6xl font-extrabold text-drcuotasSecondary-text  text-center lg:text-start uppercase tracking-tight">
                PARTICIPA EN NUESTRO SORTEO
              </h1>
              <p className="text-xs  text-[#737373]  text-center lg:text-start hidden lg:block tracking-tight">
                Conoce nuestro sorteo exclusivo al realizar la compra de uno o
                mas productos en nuestra Tienda. ¡Tu compra te da la oportunidad
                de Ganar! ¡Adjudicado no paga más!
              </p>
              <p className="text-[10px]  text-[#737373]  text-center lg:text-start block lg:hidden tracking-tight">
                Adjudicado no paga más!
              </p>
              <Link
                href="/awarded"
                className="w-full lg:w-32 text-drcuotasPrimary text-center font-extrabold uppercase flex justify-center  items-center lg:gap-8 "
              >
                Ver mas
                <PiArrowRight className="hidden lg:block" />
              </Link>
            </div>

            {/* Imagen y Calendario */}
            <div className="w-full h-full hidden lg:flex justify-center items-center">
              <CardAdjudicated />
            </div>
          </>
        </div>
      </div>

      {/* <div className="flex flex-col items-center justify-center w-full h-full gap-0 sm:gap-4 p-20 ">
        <div>
          <TitleElements
            primaryText="Adjudicados"
            secondaryText="Proximo Sorteo"
            descriptionText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-4 lg:gap-8">
          <CardAdjudicated />
          <CardAdjudicated />
        </div>
      </div> */}
    </>
  );
}

export default OurAdjudicated;
