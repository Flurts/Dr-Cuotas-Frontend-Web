import React, { useEffect } from 'react';

import Anuncios from '@/components/common/Anuncios/anuncios';
import Cuotas from '@/components/common/cuotas';
import CarouselHome from '@/components/common/ViewElements/Corousel';
import KnowOurProfessionals from '@/components/common/ViewElements/KnowOurProfessionals';
import OurServices from '@/components/common/ViewElements/OurServices';
import OurSpecialties from '@/components/common/ViewElements/OurSpecialties';
import { useGetUserDataLazyQuery } from '@/types';

export default function HomeView() {
  const [getUserData] = useGetUserDataLazyQuery();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchData = async () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          await getUserData();
          // if (data) {
          //   console.log(data);
          // }
        }
      };

      void fetchData();
    }
  }, []);

  return (
    <>
      <>
        <CarouselHome />
      </>
      <div
        className="w-full h-auto bg-[#E5F9F7]  relative bg-cover bg-center "
        style={{ backgroundImage: "url('/images/fondo/DrCuotasFondo.svg')" }}
      >
        <div className="absolute inset-0 bg-[#E5F9F7] bg-opacity-0"></div>
        <div className="relative">
          <Cuotas />
          <OurSpecialties />
          <KnowOurProfessionals />
          <div className="w-full h-full flex justify-center items-center bg-white">
            <OurServices />
          </div>
          <div className="w-full h-full flex justify-center items-center ">
            {/* Marcas asociadas */}
            <Anuncios />
          </div>
        </div>
      </div>

      {/* <OurAdjudicated /> */}
      {/* <OurProfessionals /> */}
      {/* <SubscribeComponent /> */}
    </>
  );
}
