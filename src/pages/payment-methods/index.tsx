import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import TitleElements from '@/components/common/ViewElements/TitleElements';
import { Head } from '@/components/constants';
import getServerSideSharedProps from '@/lib/next';

export default function PaymentMethods() {
  const { t } = useTranslation('constants');
  const PaymentMethodsImg = [
    {
      img: 'https://i.pinimg.com/564x/61/66/b5/6166b5a451e7baf97e2b8bce2fef2fc4.jpg',
      type: 'debito',
    },
    {
      img: 'https://www.adeba.com.ar/wp-content/uploads/2018/01/logos-bancos-02-1.png',
      type: 'recuadadores',
    },
    {
      img: 'https://logosdownload.com/logo/bancor-logo-big.png',
      type: 'tarjetas',
    },
    {
      img: 'https://logos-world.net/wp-content/uploads/2021/02/BBVA-Logo.png',
      type: 'depositos',
    },
    {
      img: 'https://th.bing.com/th/id/OIP.Q7L_QwxLHMTu8PtAD23vEQAAAA?rs=1&pid=ImgDetMain',
      type: 'debito',
    },
    {
      img: 'https://th.bing.com/th/id/R.2375494c44ec6922db0d9840217bbdb2?rik=zbxbS2wA6lZIWg&pid=ImgRaw&r=0',
      type: 'debito',
    },
    {
      img: 'https://th.bing.com/th/id/OIP.-lQDWPdaOwjO8x7aDpNpPQHaFj?rs=1&pid=ImgDetMain',
      type: 'debito',
    },
    {
      img: 'https://www.adeba.com.ar/wp-content/uploads/2018/01/banco_entre_rios.png',
      type: 'recuadadores',
    },
    {
      img: 'https://www.adeba.com.ar/wp-content/uploads/2018/01/banco_de_la_pampa.png',
      type: 'recuadadores',
    },
    {
      img: 'https://www.logotypes101.com/logos/875/91EA1AA0C0B284680653B9457B048391/macro.png',
      type: 'recuadadores',
    },
    {
      img: 'https://www.adeba.com.ar/wp-content/uploads/2018/01/banco_hipotecario-1920x1120.png',
      type: 'depositos',
    },
    {
      img: 'https://bancospedia.com/wp-content/uploads/banco-patagonia-sa-300x200.jpg',
      type: 'depositos',
    },
    {
      img: 'https://th.bing.com/th/id/R.5b3a09e9b7bbc5d91a850c1978a2a3d4?rik=knoL9vJdY1uX9A&pid=ImgRaw&r=0&sres=1&sresct=1',
      type: 'depositos',
    },
    {
      img: 'https://th.bing.com/th/id/R.51878735c8ac2a6e2fbb964bc8adfc92?rik=Fpb9juHxFgK08Q&riu=http%3a%2f%2fcentrosantafe.com.mx%2fimgcontenidos%2ftiendas%2flogos%2f376.png&ehk=YN5VhSU2PSyHzKYR1iUsxhS0v%2bSnUR1alP%2b9pVAvqT8%3d&risl=&pid=ImgRaw&r=0',
      type: 'tarjetas',
    },
    {
      img: 'https://th.bing.com/th/id/OIP.5buDABCJ3KBq90Me472m-gAAAA?rs=1&pid=ImgDetMain',
      type: 'tarjetas',
    },
    {
      img: 'https://th.bing.com/th/id/OIP.ru_H1xmdlnN6EuMcCQVfBwHaEU?rs=1&pid=ImgDetMain',
      type: 'tarjetas',
    },
    {
      img: 'https://th.bing.com/th/id/OIP.ru_H1xmdlnN6EuMcCQVfBwHaEU?rs=1&pid=ImgDetMain',
      type: 'tarjetas',
    },
    {
      img: 'https://th.bing.com/th/id/OIP.7xkIJrC_1pV1BOa2tOQlZAHaFj?rs=1&pid=ImgDetMain',
      type: 'tarjetas',
    },
    {
      img: 'https://th.bing.com/th/id/R.4cee61d60b53173f4f1e735c4661e7b3?rik=wUNPJ6eJqIAn9w&riu=http%3a%2f%2fwww.brandemia.org%2fsites%2fdefault%2ffiles%2fportada_banco_ciudad.jpg&ehk=l8QxO4zvCbmW1otJlxNdx8EUamaQzj6oGrRJTF4Q4CE%3d&risl=&pid=ImgRaw&r=0',
      type: 'tarjetas',
    },
  ];

  const maxButtonsPerRow = 6;
  const [filterType, setFilterType] = useState<string | null>(null);

  const createButtonRows = () => {
    const buttonRows = [];
    const filteredImages = filterType
      ? PaymentMethodsImg.filter((img) => img.type === filterType)
      : PaymentMethodsImg;

    for (let i = 0; i < filteredImages.length; i += maxButtonsPerRow) {
      buttonRows.push(filteredImages.slice(i, i + maxButtonsPerRow));
    }
    return buttonRows;
  };

  const handleFilterClick = (type: string) => {
    setFilterType((prevType) => (prevType === type ? null : type));
  };

  return (
    <>
      <Head title="Metodos de Pago" />
      <div className="w-full h-[40vh] flex items-center justify-center">
        <TitleElements
          primaryText="Metodos de Pago"
          secondaryText="Metodos de Pago"
          descriptionText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </div>

      <div className="flex flex-col mt-4 lg:mt-8  mb-2 lg:mb-10 lg:flex-row justify-center items-center p-4 lg:p-0 w-screen  lg:w-full gap-[8px] lg:gap-4 h-full">
        <button
          className={`w-full lg:w-56 h-12 lg:h-10 border text-[11px] xl:text-xs text-[#6636E2] border-[#6636E2] hover:scale-105 transition-all duration-300 ${
            filterType === 'debito'
              ? 'bg-[#6636E2] text-white'
              : 'hover:bg-[#6636E2] hover:text-white'
          } hover:shadow-2xl hover:shadow-[#B398F5] hover:scale-10`}
          onClick={() => {
            handleFilterClick('debito');
          }}
        >
          {t('automaticBank')}
        </button>

        <button
          className={`w-full lg:w-56 h-12 lg:h-10 border text-[11px] xl:text-xs text-[#6636E2] border-[#6636E2] hover:scale-105 transition-all duration-300 ${
            filterType === 'recuadadores'
              ? 'bg-[#6636E2] text-white'
              : 'hover:bg-[#6636E2] hover:text-white'
          } hover:shadow-2xl hover:shadow-[#B398F5] hover:scale-105`}
          onClick={() => {
            handleFilterClick('recuadadores');
          }}
        >
          {t('collectionAgenciesBank')}
        </button>

        <button
          className={`w-full lg:w-56 h-12 lg:h-10 border text-[11px] xl:text-xs text-[#6636E2] border-[#6636E2] hover:scale-105 transition-all duration-300 ${
            filterType === 'tarjetas'
              ? 'bg-[#6636E2] text-white'
              : 'hover:bg-[#6636E2] hover:text-white'
          } hover:shadow-2xl hover:shadow-[#B398F5] hover:scale-105`}
          onClick={() => {
            handleFilterClick('tarjetas');
          }}
        >
          {t('creditCardsBank')}
        </button>

        <button
          className={`w-full lg:w-56 h-12 lg:h-10 border text-[11px] xl:text-xs text-[#6636E2] border-[#6636E2] hover:scale-105 transition-all duration-300 ${
            filterType === 'depositos'
              ? 'bg-[#6636E2] text-white'
              : 'hover:bg-[#6636E2] hover:text-white'
          } hover:shadow-2xl hover:shadow-[#B398F5] hover:scale-105`}
          onClick={() => {
            handleFilterClick('depositos');
          }}
        >
          {t('depositsBank')}
        </button>
      </div>

      <div className="w-full">
        {createButtonRows().map((row, index) => (
          <div
            key={index}
            className="flex flex-wrap xl:flex-row justify-center items-center m-2 gap-2 "
          >
            {row.map((method, idx) => (
              <button
                key={idx}
                className="w-24 h-24 xl:w-36 xl:h-36 border-2  hover:shadow-2xl hover:shadow-[#B398F5] hover:scale-105 transition-all duration-300"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={method.img}
                  alt={`Payment Method ${index * maxButtonsPerRow + idx + 1}`}
                />
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await getServerSideSharedProps(ctx)),
    },
  };
};
