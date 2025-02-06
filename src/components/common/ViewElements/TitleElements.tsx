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
          <div className="w-full h-auto text-center ">
            <span className="text-xs sm:text-sm font-bold text-drcuotasPrimary uppercase leading-tight tracking-tight">
              {primaryText}
            </span>
          </div>
        </>
        <>
          <div className="w-full h-auto text-center ">
            <span className="text-lg sm:text-2xl lg:text-4xl font-extrabold uppercase leading-tight tracking-tight">
              {secondaryText}
            </span>
          </div>
        </>
        <>
          <div className="w-8/12 h-auto text-center flex justify-center">
            <span className="text-[10px] sm:text-sm  leading-tight tracking-wide text-[#737373] ">
              {descriptionText}
            </span>
          </div>
        </>
      </div>
    </>
  );
};

export default TitleElements;
