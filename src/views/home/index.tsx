import React, { useEffect } from 'react';

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
      <div className="w-full h-auto lg:bg-[#E5F9F7] lg:bg-opacity-50 border-t border-b border-white">
        <OurSpecialties />
        <KnowOurProfessionals />
      </div>
      <OurServices />
      {/* <OurAdjudicated /> */}
      {/* <OurProfessionals /> */}
      {/* <SubscribeComponent /> */}
    </>
  );
}
