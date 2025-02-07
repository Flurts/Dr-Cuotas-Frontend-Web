'use client';
import React, { useEffect, useState } from 'react';

import SpecialtyCard from '@/components/common/Cards/SpecialtyCard';
import { Surgery, useGetAllSurgeriesWithValuesQuery } from '@/types';

import TitleElements from './TitleElements';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const OurSpecialties = () => {
  const { data, error } = useGetAllSurgeriesWithValuesQuery({
    variables: {
      limit: 3,
      offset: 0,
    },
  });

  const [surgeriesList, setSurgeriesList] = useState<Surgery[]>([]);

  useEffect(() => {
    if (data && !error) {
      setSurgeriesList(data.getAllSurgeriesWithValues as Surgery[]);
    } else if (error) {
      console.error(error);
      setSurgeriesList([]);
    }
  }, [data, error]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center lg:p-20">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <TitleElements
          primaryText="Nuestros Servicios"
          secondaryText="Cirugías Disponibles"
          descriptionText="Realza tu belleza con nuestras cirugías estéticas. ¡Agenda hoy!"
        />
      </div>

    <Carousel className="w-[30vw] h-full flex justify-center items-center">
      <CarouselContent className="w-full h-full  lg:gap-6  border-4">
        {surgeriesList.length > 0 ? (
          surgeriesList.map((surgery) => (
            <CarouselItem key={surgery.id} className="w-96 sm:w-full hidden">
              <SpecialtyCard
                title={surgery.name}
                description={surgery.description ?? 'Descripción no disponible'}
                rating={surgery.rating}
                imageUrl={
                  surgery.file_banner?.file_link ?? '/images/elements/specialty.svg'
                }
              />
            </CarouselItem>
          ))
        ) : (
          <div className="flex flex-row items-center justify-center w-full h-full">
            <span className="text-[#737373] leading-tight tracking-tight w-full text-center ">No hay especialidades disponibles</span>
          </div>
        )}
      </CarouselContent>
    </Carousel>
  </div>

  );
};

export default OurSpecialties;
