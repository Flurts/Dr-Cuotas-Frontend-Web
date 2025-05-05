'use client';
import React, { useEffect, useState } from 'react';

import DoctorInfoCard from '@/components/common/Cards/DoctorInfoCard';
import { GetDoctorsByNameQuery, useGetDoctorsByNameLazyQuery } from '@/types';

const OurProfessionals = () => {
  const [getDoctorsByName, { data, error, loading }] =
    useGetDoctorsByNameLazyQuery();

  // 🔧 Tipado correcto del estado
  type DoctorType = GetDoctorsByNameQuery['getDoctorsByName'][number];
  const [doctorsList, setDoctorsList] = useState<DoctorType[]>([]);

  useEffect(() => {
    const fetchInitialDoctors = async () => {
      try {
        await getDoctorsByName({
          variables: { offset: 0, limit: 20, name: '' },
        });
      } catch (e) {
        console.error(e);
        setDoctorsList([]);
      }
    };

    void fetchInitialDoctors();
  }, [getDoctorsByName]);

  useEffect(() => {
    if (data) {
      setDoctorsList(data.getDoctorsByName || []);
    } else if (error) {
      console.error(error);
      setDoctorsList([]);
    }
  }, [data, error]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span>Cargando profesionales...</span>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col items-center gap-10 p-20">
      {doctorsList.length > 0 ? (
        <div className="w-full flex flex-wrap gap-6 justify-center">
          {doctorsList.map((doctor) => (
            <div
              key={
                doctor.id ??
                `${doctor.user?.first_name}-${doctor.user?.last_name}`
              }
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-12px)] flex justify-center"
            >
              <DoctorInfoCard doctor={doctor} />
            </div>
          ))}
        </div>
      ) : (
        <span className="text-[10px] sm:text-sm leading-tight tracking-wide text-[#737373]">
          No hay profesionales disponibles
        </span>
      )}
    </div>
  );
};

export default OurProfessionals;
