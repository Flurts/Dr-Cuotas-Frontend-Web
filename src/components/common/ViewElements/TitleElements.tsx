import Image from 'next/image';
import React from 'react';

interface TitleElementsProps {
  primaryText: string;
  secondaryText: string;
  descriptionText: string;
  showImage?: boolean; // Nueva prop opcional
  imageSrc?: string; // Opcional: permitir imagen personalizada
  imageWidth?: number; // Opcional: ancho personalizable
  imageHeight?: number; // Opcional: alto personalizable
}

const TitleElements: React.FC<TitleElementsProps> = ({
  primaryText,
  secondaryText,
  descriptionText,
  showImage = true, // Por defecto muestra la imagen
  imageSrc = '/images/banners/TitleBanner.svg', // Imagen por defecto
  imageWidth = 200,
  imageHeight = 200,
}) => {
  return (
    <div className="w-screen sm:w-full h-40 flex flex-col items-center justify-center">
      <span className="text-xs font-bold uppercase tracking-tight leading-tight">
        {primaryText}
      </span>

      <span className="text-lg sm:text-2xl text-drcuotasPrimary-text font-black uppercase leading-tight tracking-tight">
        {secondaryText}
      </span>

      {showImage && (
        <div className="flex justify-center">
          <Image
            src={imageSrc}
            alt="Service Banner"
            width={imageWidth}
            height={imageHeight}
            className="object-contain"
            priority={false}
          />
        </div>
      )}

      {descriptionText && (
        <span className="text-[10px] sm:text-sm tracking-tight leading-tight">
          {descriptionText}
        </span>
      )}
    </div>
  );
};

export default TitleElements;
