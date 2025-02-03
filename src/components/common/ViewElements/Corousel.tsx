import Image from 'next/image';
import React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

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
    <div className="w-full h-screen flex justify-center items-center ">
      <Carousel className="w-auto  ">
        <CarouselContent className="w-[180vh] h-full flex justify-center items-center">
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
      </Carousel>
    </div>
  );
};

export default CarouselHome;
