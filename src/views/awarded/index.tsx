import React from 'react';

import OurAdjudicated from '@/components/common/ViewElements/OurAdjudicated';

const ParentComponent = () => {
  return (
    <>
      <div className="w-full h-60 lg:h-screen flex justify-center items-center">
        <OurAdjudicated />
      </div>
    </>
  );
};

export default ParentComponent;
