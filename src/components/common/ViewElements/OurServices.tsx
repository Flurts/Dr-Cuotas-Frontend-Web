// OurServices.jsx
import React from 'react';

import ServiceCard from '@/components/common/Cards/ServicesCard';

import TitleElements from './TitleElements';

function OurServices() {
  const services = [
    {
      imageSrc: '/images/rostro.jpg',
      link: '/store?category=FacialSurgeries',
      title: 'Rostro',
      description: '',
    },
    {
      imageSrc: '/images/mamarios.jpg',
      link: '/store?category=BreastSurgeries',
      title: 'Mamarios',
      description: '',
    },
    {
      imageSrc: '/images/cuerpo.jpg',
      link: '/store?category=BodySurgeries',
      title: 'Cuerpo',
      description: '',
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center sm:p-10">
      <div className="w-full ">
        <TitleElements
          primaryText="¡Visita Nuestra tienda!"
          secondaryText="nuestras especialidades"
          descriptionText=""
          showImage={true}
        />

        <div className="w-full flex flex-row justify-center items-center p-4">
          {services.length > 0 ? (
            services.map((service, index) => (
              <ServiceCard
                key={service.title} // Mejor usar title que index
                imageSrc={service.imageSrc}
                link={service.link}
                title={service.title}
                description={service.description}
                priority={index < 2} // Prioridad para las primeras 2 imágenes
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
