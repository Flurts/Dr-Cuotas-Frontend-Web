'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

import SpecialtyCard from '@/components/common/Cards/SpecialtyCard';
import { Surgery, useGetAllSurgeriesWithValuesQuery } from '@/types';

import TitleElements from './TitleElements';

const OurSpecialties = () => {
  const { data, error } = useGetAllSurgeriesWithValuesQuery({
    variables: { limit: 10, offset: 0 },
  });

  const [surgeriesList, setSurgeriesList] = useState<Surgery[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data && !error) {
      setSurgeriesList(data.getAllSurgeriesWithValues as Surgery[]);
    } else if (error) {
      console.error(error);
      setSurgeriesList([]);
    }
  }, [data, error]);

  console.log('surgery', data);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320 * 4; // Tamaño de un item * cantidad visible
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center lg:p-20">
      <div className="hidden lg:block">
        <TitleElements
          primaryText="Puedes pagar en Pequeñas Cuotas"
          secondaryText="Cirugias disponibles"
          descriptionText="Consigue tu cirugia con nuestros planes de Financiamiento."
        />
      </div>

      <div className="relative w-full  flex justify-center items-center">
        <button
          className="hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          onClick={() => {
            scroll('left');
          }}
        >
          <ChevronLeft size={24} />
        </button>

        <div
          ref={scrollRef}
          className="flex lg:gap-8 overflow-x-auto scroll-smooth no-scrollbar  p-16 lg:p-20 justify-center items-center "
          style={{ scrollBehavior: 'smooth' }}
        >
          {surgeriesList.length > 0 ? (
            surgeriesList.map((surgery) => (
              <div key={surgery.id} className="w-[300px] flex-shrink-0">
                <SpecialtyCard
                  title={surgery.name}
                  id={surgery.id}
                  price={surgery.amount}
                  description={
                    surgery.description ?? 'Descripción no disponible'
                  }
                  rating={surgery.rating}
                  doctors={(surgery.doctors ?? []).map((d) => ({
                    id: d.doctor?.id ?? '',
                    provincia: d.doctor?.provincia ?? 'Sin provincia',
                    first_name: d.doctor?.user?.first_name ?? 'Sin nombre',
                    last_name: d.doctor?.user?.last_name ?? 'Sin apellido',
                  }))}
                  imageUrl={
                    surgery.file_banner?.file_link ??
                    '/images/elements/specialty.svg'
                  }
                />
              </div>
            ))
          ) : (
            <span className="text-[#737373] text-center w-full text-xs">
              No hay Cirugias
            </span>
          )}
        </div>

        <button
          className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
          onClick={() => {
            scroll('right');
          }}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default OurSpecialties;
