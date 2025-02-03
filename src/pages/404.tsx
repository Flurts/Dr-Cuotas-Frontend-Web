// import { useTranslation } from 'next-i18next';
import React from 'react';

const noViewError = () => {
  // const { t } = useTranslation('constants');

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center  bg-black bg-opacity-5">
        <div className="w-full flex flex-col justify-center items-center text-center  h-auto gap-4 animate-pulse text-[#6636E2]">
          <h1 className="text-8xl font-bold ">404</h1>
          <h1 className="text-lg lg:text-4xl font-bold ">
            ¡Oops! Página no encontrada
          </h1>
          <p className="text-xs lg:text-2xl ">
            Parece que algo salió mal y no podemos encontrar la página que estás
            buscando.
          </p>
        </div>
      </div>
    </>
  );
};

export default noViewError;
