import React, { useEffect } from 'react';

import Cuotas from '@/components/common/cuotas';
import AdComponents from '@/components/common/ViewElements/AdComponents';
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
        className="w-full h-auto bg-drcuotasPrimary-bg bg-opacity-10 relative bg-cover bg-center "
        style={{ backgroundImage: "url('/images/fondo/DrCuotasFondo.svg')" }}
      >
        <div className="absolute inset-0 bg-drcuotasPrimary-bg bg-opacity-0"></div>
        <div className="relative">
          <OurSpecialties />
          <Cuotas />
          <KnowOurProfessionals />
          <div className="w-full h-full hidden lg:flex flex-col justify-center items-center bg-white p-20">
            <OurServices />
            <AdComponents />
          </div>
        </div>
      </div>

      {/* <OurAdjudicated /> */}
      {/* <OurProfessionals /> */}
      {/* <SubscribeComponent /> */}
    </>
  );
}
