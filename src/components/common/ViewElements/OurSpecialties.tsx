'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import SpecialtyCard from '@/components/common/Cards/SpecialtyCard';
import { Button } from '@/components/ui/button';
import { Surgery, useGetAllSurgeriesWithValuesQuery } from '@/types';

import TitleElements from './TitleElements';

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
    <div className="w-full h-screen">
      <div className="flex flex-col items-center justify-center w-full h-full gap-2 py-16">
        <TitleElements
          primaryText="Especialidades"
          secondaryText="Cirugías Disponibles"
          descriptionText="Entérate de todas aquellas especialidades y cirugías que puedes encontrar en nuestra tienda"
        />

        <div className="flex flex-row gap-6 items-center justify-center w-full mt-12">
          {surgeriesList.length ? (
            surgeriesList.map((surgery) => (
              <SpecialtyCard
                key={surgery.id}
                title={surgery.name}
                description={surgery.description ?? 'Descripción no disponible'}
                rating={surgery.rating}
                imageUrl={
                  surgery.file_banner?.file_link ??
                  '/images/elements/specialty.svg'
                }
              />
            ))
          ) : (
            <div className="flex flex-row items-center justify-center w-full h-full gap-2">
              <span className="text-drcuotasSecondary-text">
                No hay especialidades disponibles
              </span>
            </div>
          )}
        </div>

        <Link href="/store">
          <Button
            variant="outline"
            className="rounded-full border-drcuotasPrimary-bg text-drcuotasPrimary-text mt-10 hover:text-white hover:bg-drcuotasPrimary-bg"
          >
            Ver más
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OurSpecialties;
