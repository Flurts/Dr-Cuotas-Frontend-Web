// ServiceCard.jsx
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ServiceCardProps {
  imageSrc: string;
  link: string;
  title: string;
  description: string;
  priority?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  imageSrc,
  link,
  title,
  description,
  priority = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="w-28 h-80 sm:w-[400px] sm:h-[500px] relative overflow-hidden  border-2 border-white hover:shadow-lg hover:shadow-drcuotasPrimary-bg transition-shadow duration-300">
      <Link href={link} className="block w-full h-full relative">
        {/* Placeholder mientras carga */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-200 to-blue-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-500 text-sm">Cargando...</div>
          </div>
        )}

        {/* Imagen de error */}
        {imageError && (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <div className="text-gray-500 text-sm text-center">
              <div>⚠️</div>
              <div>Error al cargar imagen</div>
            </div>
          </div>
        )}

        {/* Imagen principal */}
        <Image
          src={imageSrc}
          alt={`Imagen de servicios ${title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          className={`z-0 object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          priority={priority}
          quality={85}
          onLoad={() => {
            setImageLoaded(true);
          }}
          onError={() => {
            setImageError(true);
          }}
        />

        {/* Overlay oscuro */}
        <div className="absolute inset-0 z-10 bg-drcuotasPrimary-bg bg-opacity-50"></div>

        {/* Contenido sobre la imagen */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-end lg:justify-center text-center px-4">
          <h2 className="text-white text-xs sm:text-xl font-bold uppercase tracking-wide">
            {title}
          </h2>
        </div>
      </Link>
    </div>
  );
};

export default ServiceCard;
