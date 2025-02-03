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
    <div className="flex flex-col items-center justify-center gap-4">
      <span className="font-semibold text-drcuotasPrimary">{primaryText}</span>
      <span className="font-semibold text-4xl text-drcuotasSecondary-text">
        {secondaryText}
      </span>
      <p className="w-8/12 text-center text-drcuotasTertiary-text text-sm">
        {descriptionText}
      </p>
    </div>
  );
};

export default TitleElements;
