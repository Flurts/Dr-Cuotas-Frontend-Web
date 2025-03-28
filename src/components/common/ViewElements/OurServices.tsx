import React from 'react';

import ServiceCard from '@/components/common/Cards/ServicesCard';

import TitleElements from './TitleElements';

function OurServices() {
  const services = [
    {
      imageSrc: '/images/elements/specialty.svg',
      link: '/services',
      title: 'Cirugía General',
      description:
        'Procedimientos quirúrgicos en órganos internos y tejidos blandos.',
    },
    {
      imageSrc: '/images/elements/specialty.svg',
      link: '/services',
      title: 'Plástica y Estética',
      description:
        'Intervenciones para mejorar la apariencia o corregir defectos físicos.',
    },
    {
      imageSrc: '/images/elements/specialty.svg',
      link: '/services',
      title: 'Ortopédica',
      description: 'Tratamiento de fracturas, lesiones óseas y articulares.',
    },
  ];

  return (
    <div className="w-full h-full hidden lg:flex flex-col justify-center items-centerlg:p-20">
      <TitleElements
        primaryText="Nuestra Categorias"
        secondaryText="nuestras especialidades"
        descriptionText="Descubre nuestras especialidades en cirugía estética."
      />

      <div className="w-full flex flex-row justify-center items-center gap-4">
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
  );
}

export default OurServices;
