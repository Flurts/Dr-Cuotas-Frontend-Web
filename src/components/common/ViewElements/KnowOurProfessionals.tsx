import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import TitleElements from './TitleElements';

function KnowOurProfessionals() {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full  lg:h-screen ">
        <div className="w-full max-w-screen-xl h-full  flex  gap-4 flex-row justify-center items-center p-10">
          <>
            <div className="flex flex-col lg:hidden">
              <TitleElements
                primaryText="Conoce a nuestro equipo"
                secondaryText="Nuestros Profesionales"
                descriptionText=""
                showImage={true}
              />

              <Link
                href="/professionals"
                className="w-full  text-drcuotasPrimary text-center font-black uppercase underline text-xs flex flex-col-reverse justify-center items-center gap-4 "
              >
                <Image
                  src="/images/ShowPro.svg"
                  alt="Logo"
                  width={250}
                  height={250}
                />
              </Link>
            </div>

            {/* Conoce a nuestros Profesionales */}
            <div className="w-full h-full hidden lg:flex flex-col justify-center lg:gap-4 ">
              <div className="bg-drcuotasSecondaryPrimaryColor-text w-40 h-4 hidden lg:block"></div>
              <h1 className="text-lg sm:text-2xl text-drcuotasSecondaryPrimaryColor-text  lg:text-7xl font-black uppercase leading-tight tracking-tight text-center lg:text-start">
                Nuestros Profesionales
              </h1>

              <Link
                href="/professionals"
                className="w-full lg:w-32 text-drcuotasSecondaryPrimaryColor-text text-center font-extrabold uppercase flex justify-center  items-center gap-2 lg:gap-4"
              >
                Ver mas
                <FiChevronRight />
              </Link>
            </div>

            {/* Imagen y Calendario */}
            <div className="w-full h-full hidden lg:flex justify-center items-center">
              <Link href="/professionals">
                <Image
                  src="/images/nuestros profesionales.jpg"
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
