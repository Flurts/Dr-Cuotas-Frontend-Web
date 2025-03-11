import { LucideLaugh } from 'lucide-react';
import React from 'react';

import TitleElements from './ViewElements/TitleElements';

export default function Cuotas({ className }: { className?: string }) {
  return (
    <>
      <div className="hidden lg:flex flex-col items-center justify-center w-full h-full  p-20">
        <div className="w-full max-w-screen-xl h-full  flex flex-col gap-4 lg:flex-row justify-center items-center">
          <>
            {/* Conoce a nuestros Profesionales */}
            <div className="w-full h-full flex flex-col justify-center items-center lg:gap-4 ">
              <TitleElements
                primaryText="FINANCIA TU CIRUGÍA Y LLEVA EL CONTROL DE TUS PAGOS"
                secondaryText="TU CIRUGÍA, TU PLAN DE PAGO"
                descriptionText="Puedes pagar tu cirugía en cuotas accesibles y sin estrés."
              />

              <>
                <div className="w-full h-auto p-2  flex flex-row justify-center items-center ">
                  <>
                    <>
                      <div className="w-8 lg:w-10 h-8 lg:h-10 bg-drcuotasPrimary-bg  rounded-full flex justify-center items-center">
                        <LucideLaugh className="text-white w-6 lg:w-8 h-6 lg:h-8" />
                      </div>
                    </>
                    <div className="w-4 h-2 bg-drcuotasPrimary-bg"></div>

                    <>
                      <div className="w-8 lg:w-10 h-8 lg:h-10 bg-drcuotasPrimary-bg  rounded-full flex justify-center items-center">
                        <LucideLaugh className="text-white w-6 lg:w-8 h-6 lg:h-8" />
                      </div>
                    </>
                    <div className="w-4 h-2 bg-drcuotasPrimary-bg"></div>

                    <>
                      <div className="w-8 lg:w-10 h-8 lg:h-10 bg-drcuotasPrimary-bg  rounded-full flex justify-center items-center">
                        <LucideLaugh className="text-white w-6 lg:w-8 h-6 lg:h-8" />
                      </div>
                    </>
                    <div className="w-4 h-2 bg-drcuotasPrimary-bg"></div>

                    <>
                      <div className="w-8 lg:w-10 h-8 lg:h-10 bg-drcuotasPrimary-bg  rounded-full flex justify-center items-center">
                        <LucideLaugh className="text-white w-6 lg:w-8 h-6 lg:h-8" />
                      </div>
                    </>
                    <div className="w-4 h-2 bg-drcuotasPrimary-bg"></div>

                    <>
                      <div className="w-8 lg:w-10 h-8 lg:h-10 bg-drcuotasPrimary-bg  rounded-full flex justify-center items-center">
                        <LucideLaugh className="text-white w-6 lg:w-8 h-6 lg:h-8" />
                      </div>
                    </>
                    <div className="w-4 h-2 bg-drcuotasPrimary-bg"></div>

                    <>
                      <div className="w-8 lg:w-10 h-8 lg:h-10 bg-drcuotasPrimary-bg  rounded-full flex justify-center items-center">
                        <LucideLaugh className="text-white w-6 lg:w-8 h-6 lg:h-8" />
                      </div>
                    </>
                  </>
                </div>
              </>
            </div>
          </>
        </div>
      </div>
    </>
  );
}
