/* eslint-disable @next/next/no-img-element */
import { gql, useQuery } from '@apollo/client';
import { X } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const GET_ADS = gql`
  query GetAdsQuery {
    getAdsQuery {
      image
      link
      id
    }
  }
`;

interface Ad {
  id: string;
  image: string;
  link: string;
}

const AdsModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [lastShownTime, setLastShownTime] = useState(0);

  const { data, loading, error } = useQuery(GET_ADS, {
    fetchPolicy: 'cache-and-network',
  });

  const ads: Ad[] = data?.getAdsQuery || [];

  useEffect(() => {
    if (ads.length === 0) return;

    const checkAndShowModal = () => {
      const now = Date.now();
      const thirtyMinutes = 30 * 60 * 1000; // 30 minutos en milisegundos

      if (now - lastShownTime >= thirtyMinutes) {
        setIsModalOpen(true);
        setLastShownTime(now);

        // Rotar al siguiente anuncio
        setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
      }
    };

    // Mostrar el primer anuncio después de 30 segundos (para testing)
    // Cambiar a 30 * 60 * 1000 para 30 minutos en producción
    const initialTimeout = setTimeout(() => {
      if (lastShownTime === 0) {
        setIsModalOpen(true);
        setLastShownTime(Date.now());
      }
    }, 3000); // 30 segundos para testing

    // Configurar intervalo para verificar cada minuto
    const interval = setInterval(checkAndShowModal, 60000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [ads.length, lastShownTime]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (loading ?? error ?? ads.length === 0) {
    return null;
  }

  const currentAd = ads[currentAdIndex];

  return (
    <>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-xl"
          onClick={handleBackdropClick}
        >
          <div className="relative max-w-4xl max-h-[90vh] mx-4 bg-white  shadow-2xl overflow-hidden">
            {/* Botón de cerrar */}
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 z-10 bg-black bg-opacity-50 text-white  p-4  transition-all duration-200 "
              aria-label="Cerrar anuncio"
            >
              <X size={24} />
            </button>

            {/* Contenido del anuncio */}
            <div className="relative">
              {currentAd.link ? (
                <Link
                  href={currentAd.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="cursor-pointer group">
                    <img
                      src={currentAd.image}
                      alt="Anuncio"
                      className="w-full h-auto max-h-[80vh] object-contain transition-transform duration-300 "
                    />
                  </div>
                </Link>
              ) : (
                <img
                  src={currentAd.image}
                  alt="Anuncio"
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              )}
            </div>

            {/* Indicador de anuncios (si hay más de uno) */}
            {ads.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {ads.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentAdIndex
                        ? 'bg-white'
                        : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AdsModal;
