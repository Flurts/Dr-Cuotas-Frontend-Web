import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import SpecialtyCard from '@/components/common/Cards/SpecialtyCard';
import TitleElements from '@/components/common/ViewElements/TitleElements';
import { Surgery, useGetAllSurgeriesWithValuesQuery } from '@/types';

export default function StoreView() {
  const { data, error } = useGetAllSurgeriesWithValuesQuery({
    variables: { limit: 20, offset: 0 },
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
    <div className="w-full min-h-screen flex flex-col items-center p-10 ">
      <TitleElements
        primaryText="Nuestros Servicios"
        secondaryText="Cirugías Disponibles"
        descriptionText="Realza tu belleza con nuestras cirugías estéticas. ¡Agenda hoy!"
      />
      {surgeriesList.length > 0 ? (
        <div
          className={`w-full flex flex-wrap gap-6 ${
            surgeriesList.length < 4 ? 'justify-center' : 'justify-start'
          }`}
        >
          {surgeriesList.map((surgery) => (
            <div key={surgery.id} className="flex justify-center">
              <SpecialtyCard
                title={surgery.name}
                description={surgery.description ?? 'Descripción no disponible'}
                rating={surgery.rating}
                imageUrl={
                  surgery.file_banner?.file_link ??
                  '/images/elements/specialty.svg'
                }
              />
            </div>
          ))}
        </div>
      ) : (
        <span className="text-[#737373] text-center text-lg">
          No hay cirugías disponibles.
        </span>
      )}
      <div className="w-full h-80 flex flex-row justify-center items-center gap-2 p-20">
        <Link href="/" className="w-full h-40 relative ">
          <Image
            src="/images/publicidad/Publicidad.jpg" // Cambia por la ruta correcta
            
            alt="Anuncio"
           fill
            className="object-cover"
          />
        </Link>

        <Link href="/" className="w-full h-40 relative ">
          <Image
            src="/images/publicidad/RedBull.jpg"
            alt="Anuncio"
            fill
            className="object-cover"
          />
        </Link>

        <Link href="/" className="w-full h-40 relative ">
          <Image
            src="/images/publicidad/Ropa.jpg"
            alt="Anuncio"
            fill
            className="object-cover"
          />
        </Link>
      </div>
    </div>
  );
}
