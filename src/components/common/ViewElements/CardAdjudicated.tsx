import React from 'react';

function CardAdjudicated() {
  return (
    <>
      <button className="w-[320px] h-[199px] flex flex-col justify-center items-center bg-white shadow hover:shadow-md hover:shadow-drcuotasSecondaryPrimaryColor hover:z-50 hover:scale-105 transition-all duration-300  rounded-3xl gap-4">
        <h1 className="font-bold text-drcuotasSecondary-text text-[24px]">
          Próximo sorteo
        </h1>
        <p className="font-extrabold text-drcuotasSecondaryPrimaryColor text-[32px]">
          10/12/2024
        </p>
        <p className="text-drcuotasTertiary-text text-sm">
          ¡Adjudicado no paga más!
        </p>
      </button>
    </>
  );
}

export default CardAdjudicated;
