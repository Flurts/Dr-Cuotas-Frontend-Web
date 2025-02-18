import React from 'react';

function CardAdjudicated() {
  return (
    <>
      <button className="w-40 lg:w-[200%] h-52 lg:h-60 p-4 flex flex-col justify-center items-center bg-white shadow-lg hover:shadow-md hover:shadow-drcuotasSecondaryPrimaryColor hover:z-50 hover:scale-105 transition-all duration-300 rounded-3xl gap-2">
        {/* <h1 className="text-drcuotasTertiary-text text-xs lg:text-xl">
          Próximo sorteo
        </h1> */}
        <p className="font-extrabold text-drcuotasSecondaryPrimaryColor text-xl lg:text-4xl">
          10/12/2024
        </p>
        <p className="text-drcuotasTertiary-text text-[10px] lg:text-xs">
          ¡Adjudicado no paga más!
        </p>
      </button>
    </>
  );
}

export default CardAdjudicated;
