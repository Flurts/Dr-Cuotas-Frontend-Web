import React from 'react';

import CardAdjudicated from './CardAdjudicated';
import TitleElements from './TitleElements';

function OurAdjudicated() {
  return (
    <>
      <div className="w-full h-screen">
        <div className="w-full h-[80vh]  flex flex-col justify-center items-center gap-10">
          <TitleElements
            primaryText="Adjudicado"
            secondaryText="Adjudicado"
            descriptionText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
          <div className="w-full flex flex-row justify-center items-center gap-20">
            <CardAdjudicated />
            <CardAdjudicated />
          </div>
        </div>
      </div>
    </>
  );
}

export default OurAdjudicated;
