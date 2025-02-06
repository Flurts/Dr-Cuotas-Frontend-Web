import React from 'react';

import ServiceCard from '@/components/common/Cards/ServicesCard';
import { Carousel, CarouselContent } from '@/components/ui/carousel';

import TitleElements from './TitleElements';

function OurServices() {
  const services = [
    {
      imageSrc: '/images/elements/specialty.svg',
      link: '/services',
      title: 'Lorem ipsum',
      description: 'Lorem ipsum dolor sit amet.',
    },
    {
      imageSrc: '/images/elements/specialty.svg',
      link: '/services',
      title: 'Lorem ipsum',
      description: 'Lorem ipsum dolor sit amet.',
    },
    {
      imageSrc: '/images/elements/specialty.svg',
      link: '/services',
      title: 'Lorem ipsum',
      description: 'Lorem ipsum dolor sit amet.',
    },
  ];

  return (
    <div className="w-full h-full bg-[#E5F9F7] bg-opacity-40 hidden lg:flex flex-col justify-center items-center p-20">
      <div>
        <TitleElements
          primaryText="Nuestra Categorias"
          secondaryText="Especialidades"
          descriptionText="Descubre nuestras especialidades en cirugía estética, diseñadas para realzar tu belleza con los mejores profesionales a tu servicio"
        />
      </div>

      <Carousel className="w-full h-80 max-w-screen-2xl flex justify-center items-center">
        <CarouselContent className="w-auto h-full flex justify-center items-center gap-8 p-20">
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
