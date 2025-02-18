// import { useTranslation } from 'next-i18next';
import React from 'react';

const noViewError = () => {
  // const { t } = useTranslation('constants');

  return (
    <>
      <div className="w-full h-80 p-20 flex flex-col justify-center items-center ">
        <div className="w-full h-full flex flex-col justify-center items-center  text-drcuotasPrimary-text">
          <h1 className="text-6xl font-bold uppercase leading-tight tracking-tight ">
            404
          </h1>
          <h1 className="text-lg lg:text-4xl font-bold uppercase leading-tight tracking-tight text-center w-full">
            ¡Oops! Página no encontrada
          </h1>
          <p className="text-xs lg:text-xl uppercase leading-tight tracking-tight text-center hidden lg:block">
            Parece que algo salió mal y no podemos encontrar la página que estás
            buscando.
          </p>
        </div>
      </div>
    </>
  );
};

export default noViewError;
