import React from 'react';

import ServiceCard from '@/components/common/Cards/ServicesCard';

import TitleElements from './TitleElements';

function OurServices() {
  const services = [
    {
      imageSrc: '/images/surgerys/girl_face.svg',
      link: '/services',
      title: 'Rostro',
      description: '',
    },
    {
      imageSrc: '/images/surgerys/girl_sculpture.svg',
      link: '/services',
      title: 'Cuerpo',
      description: '',
    },
    {
      imageSrc: '/images/surgerys/girl_chest.svg',
      link: '/services',
      title: 'Mamarios',
      description: '',
    },
  ];

  return (
    <div className="w-full h-screen hidden lg:flex flex-col justify-center items-center px-4">
      <div className="w-full">
        <TitleElements
          primaryText="Nuestras mejores Categorias"
          secondaryText="nuestras especialidades"
          descriptionText=" "
        />

        <div className="w-full flex flex-row justify-center items-center gap-4 mt-6">
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
              <span className="text-drcuotasTertiary-text leading-tight tracking-tight">
                No hay especialidades disponibles
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OurServices;
