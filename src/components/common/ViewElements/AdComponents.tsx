import { gql, useQuery } from '@apollo/client';
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
    return <p className="text-center text-gray-500">Cargando anuncios...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 hidden">Error al cargar anuncios.</p>
    );

  return (
    <div className="w-full h-full hidden lg:flex flex-col justify-center items-center p-4 lg:p-6">
      <Carousel className="w-full max-w-screen-2xl overflow-x-auto snap-x scroll-smooth">
        <CarouselContent className="grid grid-flow-col auto-cols-[calc(100%/3)]">
          {data?.getAdsQuery && data.getAdsQuery.length > 0 ? (
            data.getAdsQuery.map(
              (ad: { id: string; image: string; link: string }) => (
                <div
                  key={ad.id}
                  className="snap-center w-full min-w-[calc(100%/3)] h-full "
                >
                  <Link href={ad.link}>
                    <div className="relative h-full overflow-hidden  transition-transform duration-300 p-20 flex justify-center items-center">
                      <img
                        src={ad.image}
                        alt="Anuncio"
                      />
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
