'use client';
import React, { useEffect, useState } from 'react';

import DoctorInfoCard from '@/components/common/Cards/DoctorInfoCard';
import { useGetDoctorsByNameLazyQuery } from '@/types';

import TitleElements from './TitleElements';

interface DoctorList {
  id: string;
  profession: string;
  user: {
    first_name: string;
    last_name: string;
    profile_picture: string;
    social_media: Array<{
      link: string;
      status: string;
      type: string;
    }>;
  };
}

const OurProfessionals = () => {
  const [getDoctorsByName, { data, error }] = useGetDoctorsByNameLazyQuery();
  const [doctorsList, setDoctorsList] = useState<DoctorList[] | null>([]);

  useEffect(() => {
    const fetchInitialDoctors = async () => {
      try {
        await getDoctorsByName({
          variables: { offset: 0, limit: 6, name: '' },
        });
      } catch (e) {
        console.error(e);
        setDoctorsList(null);
      }
    };

    void fetchInitialDoctors();
  }, [getDoctorsByName]);

  useEffect(() => {
    if (data) {
      setDoctorsList(data.getDoctorsByName as DoctorList[]);
    } else if (error) {
      console.error(error);
      setDoctorsList(null);
    }
  }, [data, error]);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-60 lg:h-screen gap-10 ">
        <TitleElements
          primaryText="Profesionales"
          secondaryText="Nuestros Profesionales"
          descriptionText="Conoce a los profesionales de la salud que te ayudarán a mejorar tu calidad de vida."
        />

        <div className="flex flex-row gap-8 items-center justify-center w-full">
          {doctorsList?.length ? (
            doctorsList?.map((doctor) => (
              <DoctorInfoCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <>
              <span className="text-lg font-bold text-drcuotasSecondary-text">
                No hay profesionales disponibles
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OurProfessionals;
