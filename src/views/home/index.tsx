import React, { useEffect } from 'react';

import Cuotas from '@/components/common/cuotas';
import AdComponents from '@/components/common/ViewElements/AdComponents';
import CarouselHome from '@/components/common/ViewElements/Corousel';
import KnowOurProfessionals from '@/components/common/ViewElements/KnowOurProfessionals';
import OurServices from '@/components/common/ViewElements/OurServices';
import OurSpecialties from '@/components/common/ViewElements/OurSpecialties';
import { useGetUserDataLazyQuery } from '@/types';
import AdsModal from '@/components/common/ViewElements/AdComponents';

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
      <CarouselHome />
      <OurSpecialties />
      <Cuotas />
      <KnowOurProfessionals />
      <div className="w-full h-full hidden lg:flex flex-col justify-center items-center bg-white p-20">
        <OurServices />
      </div>
    </>
  );
}
