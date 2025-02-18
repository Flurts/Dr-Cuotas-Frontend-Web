import Image from 'next/image';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { RiMastercardFill, RiPaypalFill, RiVisaFill } from 'react-icons/ri';
import { SiBinance } from 'react-icons/si';

interface HomeSpecialtieCardProps {
  imageUrl: string;
  rating: number;
  title: string;
  description: string;
  price: number;
}

const SpecialtyCard: React.FC<HomeSpecialtieCardProps> = ({
  imageUrl,
  rating,
  title,
  description,
  price,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const newItem = { imageUrl, rating, title, description, price };
    localStorage.setItem('cart', JSON.stringify([...cart, newItem]));
  };

  return (
    <>
      <div
        className="flex flex-col w-60 lg:w-80 h-full rounded-xl shadow-lg bg-white hover:bg-drcuotasPrimary hover:bg-opacity-20 hover:shadow-2xl  hover:scale-105  hover:shadow-drcuotasPrimary transition-all duration-300 cursor-pointer"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <>
          <div className="flex justify-center items-center">
            <Image
              src={imageUrl ?? '/images/elements/specialty.svg'}
              alt=""
              className="w-full h-full object-cover border-white border-2"
              width={238}
              height={224}
            />
          </div>
        </>

        <>
          <div className="flex flex-col gap-4 items-center justify-center p-8 flex-grow">
            <div className="hidden flex-row w-[60px] items-center justify-center bg-[#26335D] gap-2 rounded-3xl p-1">
              <FaStar className="text-yellow-400 text-sm" />
              <span className="text-white text-xs">{rating ?? 0}</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 w-full">
              <span className="uppercase leading-tight tracking-tight font-black text-xl text-drcuotasPrimary-text truncate">
                {title}
              </span>
              <span className="text-drcuotasPrimary text-xs line-clamp-3 uppercase leading-tight tracking-tight">
                {description.length > 0
                  ? description
                  : 'Descripción no disponible'}
              </span>
            </div>
          </div>
        </>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0  backdrop-blur-sm bg-black bg-opacity-50 flex justify-center items-center z-50 p-20  "
        onClick={() => {
          setIsOpen(false);
        }}
        >
          <>
            <div className="rounded-lg  w-[80vw] h-full relative flex flex-col lg:flex-row lg:gap-4 ">
              <>
                <div className="w-full bg-white h-80 lg:h-full flex flex-row-reverse justify-between items-start rounded-t-xl lg:rounded-xl">
                  <>
                    <div className="w-full h-full flex flex-col gap-2 p-16 justify-center ">
                      <h2 className="text-4xl  text-drcuotasPrimary-text uppercase leading-tight tracking-tight  font-black">
                        {title}
                      </h2>
                      <span className="w-full text-xs uppercase leading-tight tracking-tight">
                        {description}
                      </span>

                      <div className="h-full w-full">
                        <Image
                          src={imageUrl ?? '/images/elements/specialty.svg'}
                          alt=""
                          className="w-full h-full object-cover rounded-xl "
                          width={120}
                          height={120}
                        />
                      </div>
                    </div>
                  </>
                </div>
              </>
              <>
                <div className="w-full lg:w-80 h-40 lg:h-full bg-white flex flex-row-reverse justify-between items-start p-4 rounded-b-xl lg:rounded-xl">
                  <button
                    className=" text-drcuotasPrimary hover:text-gray-900 hidden lg:block"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    ✖
                  </button>
                  <>
                    <div className="w-full h-full flex flex-col justify-center items-center">
                      <>
                        <div className="w-full h-full hidden lg:flex flex-col  items-center justify-center gap-4">
                          <div className="flex flex-col justify-center items-center">
                            <h1 className="uppercase leading-tight tracking-tight font-bold text-drcuotasPrimary-text text-xl">
                              Medios de Pago
                            </h1>
                            <span className="uppercase leading-tight tracking-tight font-bold text-drcuotasSecondary-text text-xs">
                              Paga a Cuotas
                            </span>
                          </div>
                          <span className="uppercase leading-tight tracking-tight font-bold text-green-500 text-4xl">
                            $ {price}
                          </span>
                        </div>
                      </>
                      <>
                        <div className="w-full hidden lg:flex flex-col  items-center">
                          <h1 className="uppercase leading-tight tracking-tight font-bold text-drcuotasPrimary-text text-xl">
                            Medios de Pago
                          </h1>
                          <span className="uppercase leading-tight tracking-tight font-bold text-drcuotasSecondary-text text-xs">
                            Tarjetas de crédito
                          </span>
                        </div>
                      </>
                      <>
                        <div className="w-full h-4 lg:h-40 hidden lg:flex flex-col  items-center p-2 lg:p-4">
                          <div className="w-full h-full flex flex-row justify-center gap-4">
                            <RiPaypalFill className="text-xl lg:text-2xl text-drcuotasPrimary" />
                            <SiBinance className="text-xl lg:text-2xl text-drcuotasPrimary" />
                            <RiVisaFill className="text-xl lg:text-2xl text-drcuotasPrimary" />
                            <RiMastercardFill className="text-xl lg:text-2xl text-drcuotasPrimary" />
                          </div>
                        </div>
                      </>

                      <div className="w-full justify-center items-center flex flex-col gap-2 ">
                        <span className="uppercase leading-tight tracking-tight font-bold text-green-500 text-4xl block lg:hidden ">
                          $ 2,000
                        </span>
                        <button className="w-full h-10 bg-green-500 text-white rounded-xl uppercase leading-tight tracking-tight font-bold text-xs lg:text-sm">
                          Comprar Ahora
                        </button>
                        <button
                          className="w-full h-10 border  border-drcuotasPrimary text-drcuotasPrimary-text rounded-xl uppercase leading-tight tracking-tight font-bold text-xs lg:text-sm"
                          onClick={handleAddToCart}
                        >
                          Agregar al Carrito
                        </button>
                      </div>
                    </div>
                  </>
                </div>
              </>
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default SpecialtyCard;
