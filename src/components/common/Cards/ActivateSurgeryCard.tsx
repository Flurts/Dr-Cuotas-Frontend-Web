import React from 'react';

export default function ActivateSurgeryCard() {
  return (
    <>
      <div className="flex bg-dr shadow-2xl w-[900px] tracking-tight leading-tight justify-center p-4 items-center  gap-10 rounded-xl">
        <div className="flex flex-col justify-center items-center ml-10 gap-2">
          <span className="text-drcuotasPrimary-text font-bold text-xl tracking-tight leading-tight uppercase">
            Rinoplastia
          </span>
          <div>
            {' '}
            <img
              src="https://i.pinimg.com/736x/6e/de/43/6ede43f1371b082fa061634b0d921b9b.jpg"
              alt="arrow-right"
              className="rounded-xl"
            />{' '}
          </div>
          <span className="text-nowrap text-drcuotasPrimary font-light">
            Brayan Suarez
          </span>
          <span>$2.000</span>
        </div>

        <div className="flex flex-col justify-center items-center gap-4">
          <div className="bg-violet-500 h-32 w-[650px] rounded-xl"></div>
          <div className="flex justify-center gap-10 text-drcuotasPrimary">
            <button className="  border border-violet-500 p-2 tracking-tight w-32 leading-tight rounded-xl hover:scale-105 hover:bg-drcuotasPrimary hover:text-white transition-all duration-300">
              Activar
            </button>
            <button className="  border border-violet-500 tracking-tight w-32 leading-tight rounded-xl hover:scale-105 hover:bg-red-500 hover:text-white transition-all duration-300">
              Rechazar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
