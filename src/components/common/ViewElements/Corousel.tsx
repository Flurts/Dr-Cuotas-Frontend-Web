import React from 'react';

const CarouselHome = () => {
  const mediaItems = [
    { type: 'image', src: '/images/banners/banner_zaira_complete.svg' },
    { type: 'image', src: '/images/banners/banner_mama_complete.svg' },
    {
      type: 'iframe',
      src: 'https://www.youtube.com/embed/_a4rKbF1bxo',
    },
    { type: 'image', src: '/images/banners/banner_mama_complete.svg' },
    {
      type: 'iframe',
      src: 'https://www.youtube.com/embed/C778Ob9jg9M',
    },
  ];

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-[#E5F9F7] bg-opacity-40 shadow-md"
      style={{
        backgroundImage: 'url(/images/banners/BannerBody.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="  lg:max-w-screen-2xl h-full flex flex-col justify-center gap-0">
        <h1 className="text-xl sm:text-4xl  lg:text-5xl  xl:text-6xl  font-extrabold text-drcuotasPrimary leading-tight uppercase tracking-tight text-center">
          Transforma tu belleza con los mejores expertos en cirugía estética
        </h1>
        <p className="text-xs sm:text-2xl text-[#737373] text-center tracking-tight hidden lg:block">
          Resultados excepcionales, cuidados personalizados.
        </p>
      </div>

      {/* <Carousel>
        <CarouselContent className="w-screen h-full flex justify-center items-center">
          {mediaItems.map((item, index) => (
            <CarouselItem
              key={index}
              className="w-full h-full flex justify-center items-center"
            >
              <div className="w-full h-full flex justify-center items-center">
                {item.type === 'image' ? (
                  <div className="relative w-full h-[90vh]">
                    <Image
                      src={item.src}
                      alt={`Slide ${index + 1}`}
                      layout="fill"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full">
                    {item.type === 'iframe' ? (
                      <iframe
                        title="Video Dr.Cuotas"
                        src={item.src}
                        loading="lazy"
                        className="w-full h-[90vh]"
                      />
                    ) : null}
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-20 top-1/2 transform -translate-y-1/2 z-10" />
        <CarouselNext className="absolute -right-20 top-1/2 transform -translate-y-1/2 z-10" />
      </Carousel> */}
    </div>
  );
};

export default CarouselHome;
