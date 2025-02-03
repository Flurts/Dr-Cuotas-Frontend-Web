import React from 'react';

import TitleElements from '@/components/common/ViewElements/TitleElements';

export default function FinancingView() {
  return (
    <div className="w-full h-screen">
      <div className="w-full h-[40vh] flex justify-center items-center ">
        <TitleElements
          primaryText="Financiamiento"
          secondaryText="Financiamiento"
          descriptionText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </div>
    </div>
  );
}
