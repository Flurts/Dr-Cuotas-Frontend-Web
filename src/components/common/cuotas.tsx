import { LucideLaugh } from 'lucide-react';
import React from 'react';

import TitleElements from './ViewElements/TitleElements';

export default function Cuotas({ className }: { className?: string }) {
  return (
    <>
      <div className="w-full h-96 flex flex-col justify-center items-center ">
        <>
          <TitleElements
            primaryText="Cirugia a Cuotas"
            secondaryText="Financiamiento"
            descriptionText="Facilitamos el pago de tu cirugía con planes a tu medida."
          />
        </>
        <>
          <div className="w-full p-4 flex flex-row justify-center items-center ">
            <>
              <>
                <div className="w-8 lg:w-10 h-8 lg:h-10 bg-drcuotasTertiary-bg bg-opacity-20 rounded-full flex justify-center items-center">
                  <LucideLaugh className="text-drcuotasTertiary-text opacity-80 w-6 lg:w-8 h-6 lg:h-8" />
                </div>
              </>
              <div className="w-4 h-2 bg-drcuotasTertiary-bg bg-opacity-50"></div>
              <>
                <div className="w-8 lg:w-10 h-8 lg:h-10 bg-drcuotasTertiary-bg bg-opacity-20 rounded-full flex justify-center items-center">
                  <LucideLaugh className="text-drcuotasTertiary-text opacity-80 w-6 lg:w-8 h-6 lg:h-8" />
                </div>
              </>
              <div className="w-4 h-2 bg-drcuotasTertiary-bg bg-opacity-50"></div>
              <>
                <div className="w-8 lg:w-10 h-8 lg:h-10 bg-drcuotasTertiary-bg bg-opacity-20 rounded-full flex justify-center items-center">
                  <LucideLaugh className="text-drcuotasTertiary-text opacity-80 w-6 lg:w-8 h-6 lg:h-8" />
                </div>
              </>
              <div className="w-4 h-2 bg-drcuotasTertiary-bg bg-opacity-50"></div>
              <>
                <div className="w-8 lg:w-10 h-8 lg:h-10 bg-drcuotasTertiary-bg bg-opacity-20 rounded-full flex justify-center items-center">
                  <LucideLaugh className="text-drcuotasTertiary-text opacity-80 w-6 lg:w-8 h-6 lg:h-8" />
                </div>
              </>
              <div className="w-4 h-2 bg-drcuotasTertiary-bg bg-opacity-50"></div>
              <>
                <div className="w-8 lg:w-10 h-8 lg:h-10 bg-drcuotasTertiary-bg bg-opacity-20 rounded-full flex justify-center items-center">
                  <LucideLaugh className="text-drcuotasTertiary-text opacity-80 w-6 lg:w-8 h-6 lg:h-8" />
                </div>
              </>
            </>
          </div>
        </>
      </div>
    </>
  );
}
