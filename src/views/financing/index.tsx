import React from 'react';

import TitleElements from '@/components/common/ViewElements/TitleElements';

export default function FinancingView() {
  return (
    <div className="w-full h-60 lg:h-screen flex justify-center ">
      {/* <TitleElements
        primaryText="Financiamiento"
        secondaryText="Financiamiento"
        descriptionText="Puedes pagar tu cirugía en cuotas accesibles y sin estrés."
      /> */}

      <div className='w-full h-full bg-red-500 flex flex-row justify-center items-center gap-4'>
          <>
            <div className='w-96 h-[30vw] bg-white rounded-xl flex flex-col justify-center items-center'>
              <h1 className='text-drcuotasTertiary-text  uppercase leading-tight tracking-tight'>Plan Basico</h1>
            </div>
          </>
      </div>
    </div>
  );
}
