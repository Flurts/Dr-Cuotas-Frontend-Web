import Image from 'next/image';
import React from 'react';

interface TitleElementsProps {
  primaryText: string;
  secondaryText: string;
  descriptionText: string;
}

const TitleElements: React.FC<TitleElementsProps> = ({
  primaryText,
  secondaryText,
  descriptionText,
}) => {
  return (
    <>
      <div className="w-screen sm:w-full h-40 flex flex-col items-center justify-center">
        <>
          <span className="text-xs font-bold  uppercase tracking-tight leading-tight">
            {primaryText}
          </span>
        </>
        <>
          <span className="text-lg sm:text-2xl  text-drcuotasPrimary-text font-black uppercase leading-tight tracking-tight">
            {secondaryText}
          </span>
        </>

        <div className="flex justify-center">
          <Image
            src="/images/banners/TitleBanner.svg"
            alt="Service Banner"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
        <>
          <span className="text-[10px] sm:text-sm  tracking-tight leading-tight ">
            {descriptionText}
          </span>
        </>
      </div>
    </>
  );
};

export default TitleElements;
