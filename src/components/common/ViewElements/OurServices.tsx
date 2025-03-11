import React from 'react';

import ServiceCard from '@/components/common/Cards/ServicesCard';
import { Carousel, CarouselContent } from '@/components/ui/carousel';

import TitleElements from './TitleElements';

function OurServices() {
  const services = [
    {
      imageSrc: '/images/elements/specialty.svg',
      link: '/services',
      title: 'Cirugía General',
      description: 'Procedimientos quirúrgicos en órganos internos y tejidos blandos.',
    },
    {
      imageSrc: '/images/elements/specialty.svg',
      link: '/services',
      title: 'Plástica y Estética',
      description: 'Intervenciones para mejorar la apariencia o corregir defectos físicos.',
    },
    {
      imageSrc: '/images/elements/specialty.svg',
      link: '/services',
      title: 'Ortopédica',
      description: 'Tratamiento de fracturas, lesiones óseas y articulares.',
    },
  ];
  

  return (
    <div className="w-full h-full flex flex-col justify-center items-center  lg:p-20">
        <TitleElements
          primaryText="Nuestra Categorias"
          secondaryText="nuestras especialidades"
          descriptionText="Descubre nuestras especialidades en cirugía estética."
        />

      <Carousel className="w-full h-60 lg:h-auto max-w-screen-2xl flex items-center justify-center ">
        <CarouselContent className="w-96 sm:w-full h-full flex gap-4 lg:gap-6 p-20 ">
          {services.length > 0 ? (
            services.map((service, index) => (
              <ServiceCard
                key={index}
                imageSrc={service.imageSrc}
                link={service.link}
                title={service.title}
                description={service.description}
              />
            ))
          ) : (
            <div className="flex flex-row items-center justify-center w-full h-full">
              <span className="text-[#737373] tracking-tight">
                No hay especialidades disponibles
              </span>
            </div>
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default OurServices;
