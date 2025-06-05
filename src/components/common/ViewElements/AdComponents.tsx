/* eslint-disable @next/next/no-img-element */
import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Carousel, CarouselContent } from '@/components/ui/carousel';

const GET_ADS = gql`
  query GetAdsQuery {
    getAdsQuery {
      image
      link
      id
    }
  }
`;

const AdsCarousel: React.FC = () => {
  const { data, loading, error } = useQuery(GET_ADS, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading)
    return (
      <div className="w-full  flex flex-row justify-center items-center gap-20 opacity-10 mt-40">
        <Image
          src="/images/logo/logo-1.svg"
          alt="Service Banner"
          width={150}
          height={150}
          className="object-contain"
        />
        <Image
          src="/images/logo/logo-1.svg"
          alt="Service Banner"
          width={150}
          height={150}
          className="object-contain"
        />
        <Image
          src="/images/logo/logo-1.svg"
          alt="Service Banner"
          width={150}
          height={150}
          className="object-contain"
        />
      </div>
    );
  if (error)
    return (
      <div className="w-full  flex flex-row justify-center items-center gap-20 opacity-10 mt-40">
        <Image
          src="/images/logo/logo-1.svg"
          alt="Service Banner"
          width={150}
          height={150}
          className="object-contain"
        />
        <Image
          src="/images/logo/logo-1.svg"
          alt="Service Banner"
          width={150}
          height={150}
          className="object-contain"
        />
        <Image
          src="/images/logo/logo-1.svg"
          alt="Service Banner"
          width={150}
          height={150}
          className="object-contain"
        />
      </div>
    );

  return (
    <div className="w-full h-full hidden lg:flex flex-col justify-center items-center p-4 lg:p-6">
      <Carousel className="w-full max-w-screen-2xl overflow-x-auto snap-x scroll-smooth">
        <CarouselContent className="grid grid-flow-col auto-cols-[calc(100%/3)]">
          {data?.getAdsQuery && data.getAdsQuery.length > 0 ? (
            data.getAdsQuery.map(
              (ad: { id: string; image: string; link: string }) => (
                <div key={ad.id} className="w-full h-full ">
                  <Link href={ad.link}>
                    <div className=" h-full overflow-hidden  transition-transform duration-300 flex justify-center items-center ">
                      <img src={ad.image} alt="Anuncio" />
                    </div>
                  </Link>
                </div>
              ),
            )
          ) : (
            <div className="hidden items-center justify-center w-full h-40">
              <span className="">No hay anuncios disponibles</span>
            </div>
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default AdsCarousel;
