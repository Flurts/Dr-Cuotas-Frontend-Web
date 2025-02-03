import React, { useEffect } from 'react';

import CarouselHome from '@/components/common/ViewElements/Corousel';
import KnowOurProfessionals from '@/components/common/ViewElements/KnowOurProfessionals';
import OurAdjudicated from '@/components/common/ViewElements/OurAdjudicated';
import OurProfessionals from '@/components/common/ViewElements/OurProfessionals';
import OurServices from '@/components/common/ViewElements/OurServices';
import OurSpecialties from '@/components/common/ViewElements/OurSpecialties';
import SubscribeComponent from '@/components/common/ViewElements/Subscribe';
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
      <OurServices />
      <OurSpecialties />

      <KnowOurProfessionals />
      <OurAdjudicated />
      <OurProfessionals />

      <SubscribeComponent />
    </>
  );
}
