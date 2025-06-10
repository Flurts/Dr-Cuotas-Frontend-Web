import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const CarouselHome = () => {
  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage: 'url(/images/banners/BannerBody.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <>
        <div className="lg:max-w-screen-2xl h-full flex flex-col justify-center gap-4">
          {/* Título principal (fijo) */}
          <span className="text-lg sm:text-4xl lg:text-5xl xl:text-6xl font-black text-drcuotasSecondaryPrimaryColor-text  uppercase leading-tight tracking-tight text-center p-6 lg:p-0">
            Transforma tu belleza con los mejores expertos en cirugía estética
          </span>

          {/* Texto pequeño con animación de escritura */}
          <TypeAnimation
            sequence={[
              'Paga en cómodas cuotas con nuestros planes de financiamiento.',
              2000, // Espera 2s
              '', // Borra el texto
              500, // Espera 0.5s
            ]}
            wrapper="p"
            speed={50}
            repeat={Infinity}
            className="text-center tracking-tight leading-tight  hidden lg:block"
          />
        </div>
      </>
    </div>
  );
};

export default CarouselHome;
