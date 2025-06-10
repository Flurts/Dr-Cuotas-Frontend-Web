import React, { useEffect } from 'react';

import CarouselHome from '@/components/common/ViewElements/Corousel';
import KnowOurProfessionals from '@/components/common/ViewElements/KnowOurProfessionals';
import OurServices from '@/components/common/ViewElements/OurServices';
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
      <CarouselHome />
      {/* <OurSpecialties /> */}
      {/* <Cuotas /> */}
      <div className="w-full mt-10 lg:mt-0 flex flex-col-reverse lg:flex-col ">
        <KnowOurProfessionals />
        <OurServices />
      </div>
      {/* <AdsModal /> */}
    </>
  );
}
