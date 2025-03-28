import React from 'react';

import TitleElements from './ViewElements/TitleElements';
import Link from 'next/link';

export default function Cuotas({ className }: { className?: string }) {
  return (
    <>
      <div className="hidden lg:flex flex-col items-center justify-center w-full h-screen bg-white">
        <TitleElements
          primaryText="FINANCIA TU CIRUGÍA Y LLEVA EL CONTROL DE TUS PAGOS"
          secondaryText="TU PLAN DE Financiamiento"
          descriptionText=""
        />
        <div className="w-full h-auto flex flex-row justify-center items-center gap-4 p-4">
          <>
            <button className="w-auto h-auto min-w-[200px] min-h-[150px] lg:w-80 lg:h-96 flex flex-col  hover:z-50 hover:scale-105 transition-all duration-300 rounded-3xl gap-4 border border-drcuotasPrimary-bg">
              <Link
                href="/store"
                className="relative w-40 h-40 min-w-[200px] min-h-[150px] lg:w-full lg:h-full rounded-xl"
              >
      
              </Link>
            </button>
          </>
          <>
            <button className="w-auto h-auto min-w-[200px] min-h-[150px] lg:w-80 lg:h-96 flex flex-col  hover:z-50 hover:scale-105 transition-all duration-300 rounded-3xl gap-4 border border-drcuotasPrimary-bg">
              <Link
                href="/store"
                className="relative w-40 h-40 min-w-[200px] min-h-[150px] lg:w-full lg:h-full rounded-xl"
              >
      
              </Link>
            </button>
          </>
          <>
            <button className="w-auto h-auto min-w-[200px] min-h-[150px] lg:w-80 lg:h-96 flex flex-col  hover:z-50 hover:scale-105 transition-all duration-300 rounded-3xl gap-4 border border-drcuotasPrimary-bg">
              <Link
                href="/store"
                className="relative w-40 h-40 min-w-[200px] min-h-[150px] lg:w-full lg:h-full rounded-xl"
              >
      
              </Link>
            </button>
          </>
   
        </div>
      </div>
    </>
  );
}
