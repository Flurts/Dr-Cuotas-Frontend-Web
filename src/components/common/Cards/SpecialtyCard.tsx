import Image from 'next/image';
import React from 'react';
import { FaStar } from 'react-icons/fa';

import { Button } from '@/components/ui/button';

interface HomeSpecialtieCardProps {
  imageUrl: string;
  rating: number;
  title: string;
  description: string;
}

const SpecialtyCard: React.FC<HomeSpecialtieCardProps> = ({
  imageUrl,
  rating,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col w-[238px] h-[418px] rounded-xl shadow-lg bg-white">
      <Image
        src={imageUrl ?? '/images/elements/specialty.svg'}
        alt="specialty"
        className="rounded-xl w-[238px] h-[224px] object-cover"
        width={238}
        height={224}
      />
      <div className="py-5 px-6 flex flex-col gap-3 items-start flex-grow">
        <div className="flex flex-row w-[60px] items-center justify-center bg-[#26335D] gap-2 rounded-3xl p-1">
          <FaStar className="text-yellow-400 text-sm" />
          <span className="text-white text-xs">{rating ?? 0}</span>
        </div>
        <div className="flex flex-col justify-center gap-3 w-full">
          <span className="text-sm font-bold text-drcuotasSecondary-text truncate">
            {title}
          </span>
          <span className="text-drcuotasTertiary-text text-xs line-clamp-3">
            {description.length > 0 ? description : 'Descripción no disponible'}
          </span>
        </div>
        <Button
          variant="outline"
          className="flex flex-row rounded-full text-xs w-[100px] border-[#8576FF] text-[#8576FF] hover:text-[#8576FF] mt-auto"
        >
          Ver más
        </Button>
      </div>
    </div>
  );
};

export default SpecialtyCard;
