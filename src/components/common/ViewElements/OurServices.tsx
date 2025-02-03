import React from 'react';

import ServiceCard from '@/components/common/Cards/ServicesCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

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
    <>
      <div className="w-full h-full bg-[#E5F9F7] flex flex-col justify-center items-center gap-4">
        <p className="text-drcuotasPrimary-text font-bold">Nuestro servicio</p>
        <h1 className="text-6xl text-drcuotasSecondary-text font-bold">
          Especialidades
        </h1>
        <div className="w-[40vh] h-20 border-b-4 border-drcuotasPrimary-bg"></div>

        <Carousel className="w-full max-w-screen-2xl p-10 px-40">
          <CarouselContent className="-ml-0">
            {services.length > 0 ? (
              services.map((service, index) => (
                <CarouselItem
                  key={index}
                  className="overflow-visible md:basis-1/2 xl:basis-1/3 2xl:basis-1/4 pl-0"
                >
                  <ServiceCard
                    imageSrc={service.imageSrc}
                    link={service.link}
                    title={service.title}
                    description={service.description}
                  />
                </CarouselItem>
              ))
            ) : (
              <div className="flex flex-row items-center justify-center w-full h-full gap-2">
                <span className="text-drcuotasSecondary-text">
                  No hay especialidades disponibles
                </span>
              </div>
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}

export default OurServices;
