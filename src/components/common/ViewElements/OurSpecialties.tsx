'use client';
import 'react-loading-skeleton/dist/skeleton.css';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import SpecialtyCard from '@/components/common/Cards/SpecialtyCard';
import { Surgery, useGetAllSurgeriesWithValuesQuery } from '@/types';

import TitleElements from './TitleElements';

const OurSpecialties = () => {
  const { data, loading, error } = useGetAllSurgeriesWithValuesQuery({
    variables: { limit: 10, offset: 0 },
  });

  const [surgeriesList, setSurgeriesList] = useState<Surgery[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    if (data && !error) {
      setSurgeriesList(data.getAllSurgeriesWithValues as Surgery[]);
    } else if (error) {
      console.error('Error fetching surgeries:', error);
      setSurgeriesList([]);
    }
  }, [data, error]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [surgeriesList]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = 320; // Approximate width of one card
      const containerWidth = scrollRef.current.clientWidth;
      const scrollAmount = Math.floor(containerWidth / cardWidth) * cardWidth;

      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const renderSkeletons = () => (
    <div className="flex gap-8 p-16 lg:p-20">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="flex-shrink-0 w-80">
          <Skeleton height={400} className="rounded-xl" />
        </div>
      ))}
    </div>
  );

  return (
    <section className="w-full h-screen hidden lg:flex flex-col justify-center items-center">
      <TitleElements
        primaryText="¡Visita nuestra Tienda!"
        secondaryText="Cirugías disponibles"
        descriptionText=""
        showImage={true}
      />

      <div className="w-full hidden lg:flex justify-center items-center">
        {showLeftArrow && (
          <button
            aria-label="Scroll left"
            className="hidden lg:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full  z-10 hover:bg-gray-100 transition-colors"
            onClick={() => {
              scroll('left');
            }}
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
        )}

        {loading ? (
          renderSkeletons()
        ) : (
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scroll-smooth no-scrollbar "
          >
            {surgeriesList.length > 0 ? (
              surgeriesList.map((surgery) => (
                <div key={surgery.id} className="flex w-80">
                  <SpecialtyCard
                    title={surgery.name}
                    id={surgery.id}
                    price={surgery.amount}
                    category={surgery.category}
                    description={
                      surgery.description ?? 'Descripción no disponible'
                    }
                    rating={surgery.rating}
                    doctors={(surgery.doctors || []).map((d) => ({
                      id: d.doctor?.id || '',
                      provincia: d.doctor?.provincia || 'Sin provincia',
                      first_name: d.doctor?.user?.first_name || 'Sin nombre',
                      last_name: d.doctor?.user?.last_name || 'Sin apellido',
                    }))}
                    imageUrl={
                      surgery.file_banner?.file_link ??
                      '/images/elements/specialty.svg'
                    }
                  />
                </div>
              ))
            ) : (
              <div className="w-full text-center py-16">
                <p className="text-gray-500">
                  {error
                    ? 'Error al cargar las cirugías. Por favor intente más tarde.'
                    : 'No hay cirugías disponibles en este momento.'}
                </p>
              </div>
            )}
          </div>
        )}

        {showRightArrow && surgeriesList.length > 0 && (
          <button
            aria-label="Scroll right"
            className="hidden lg:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full  z-10 hover:bg-gray-100 transition-colors"
            onClick={() => {
              scroll('right');
            }}
          >
            <ChevronRight size={24} className="text-gray-700" />
          </button>
        )}
      </div>
    </section>
  );
};

export default OurSpecialties;
