import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    const cart = JSON.parse(localStorage.getItem('cart') ?? '[]');
    const newItem = { imageUrl, rating, title, description, price };
    localStorage.setItem('cart', JSON.stringify([...cart, newItem]));
  };

  return (
    <>
      <div
        className="flex flex-col w-60 lg:w-80 h-full rounded-xl shadow-lg bg-white  cursor-pointer"
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
        <div className="fixed inset-0 w-full h-full backdrop-blur-sm bg-drcuotasSecondary-bg bg-opacity-60 flex  justify-center items-center z-50">
          <>
            <Tabs
              defaultValue="account"
              className="w-full h-full flex flex-col justify-center items-center p-20"
            >
              <div className="w-full flex flex-row justify-center items-center gap-4">
                <div>
                  <TabsList className="grid w-96 grid-cols-2">
                    <TabsTrigger value="account">
                      <span className="text-drcuotasTertiary-text font-black uppercase leading-tight tracking-tight text-xs lg:text-sm">
                        Comprar
                      </span>
                    </TabsTrigger>
                    <TabsTrigger value="password">
                      <span className="text-drcuotasTertiary-text font-black uppercase leading-tight tracking-tight text-xs lg:text-sm">
                        Financiacion
                      </span>
                    </TabsTrigger>
                  </TabsList>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <span className="text-white font-black uppercase leading-tight tracking-tight text-xs lg:text-base">
                    x
                  </span>
                </button>
              </div>
              <>
                <TabsContent value="account" className="h-full">
                  <Card className="bg-white w-[80vw] lg:w-[40vw]  h-[35vw] p-10 flex flex-col gap-4 shadow-xl shadow-drcuotasPrimary-bg">
                    <h2 className="text-2xl  uppercase font-black text-center leading-tight tracking-tight  text-drcuotasTertiary-text w-full h-80">
                      Completa tu Pago
                    </h2>

                    {/* Logos de Tarjetas */}
                    <div className="flex justify-center gap-2 ">
                      <Image
                        src="/images/visa-3-svgrepo-com.svg"
                        alt="Visa"
                        width={40}
                        height={20}
                      />
                      <Image
                        src="/images/mastercard-svgrepo-com.svg"
                        alt="MasterCard"
                        width={40}
                        height={20}
                      />
                      <Image
                        src="/images/amex-svgrepo-com.svg"
                        alt="Amex"
                        width={40}
                        height={20}
                      />
                    </div>

                    {/* Formulario de Pago */}
                    <form className="w-full h-full flex flex-col gap-2 lg:gap-4">
                      {/* Número de Tarjeta */}
                      <div>
                        <label className="text-sm font-medium text-drcuotasTertiary-text text-center leading-tight tracking-tight  truncate">
                          Número de Tarjeta
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="**** **** **** ****"
                            maxLength={19}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                          />
                        </div>
                      </div>

                      {/* Nombre del Titular */}
                      <div>
                        <label className="text-sm font-medium text-drcuotasTertiary-text text-center leading-tight tracking-tight  truncate">
                          Nombre del Titular
                        </label>
                        <input
                          type="text"
                          placeholder="Ejemplo: Juan Pérez"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                        />
                      </div>

                      {/* Expiración y CVV */}
                      <div className="flex gap-4">
                        <div className="w-1/2">
                          <label className="text-sm font-medium text-drcuotasTertiary-text text-center leading-tight tracking-tight  truncate">
                            Expiración
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="text-sm font-medium text-drcuotasTertiary-text text-center leading-tight tracking-tight  truncate">
                            CVV
                          </label>
                          <input
                            type="password"
                            placeholder="***"
                            maxLength={3}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                          />
                        </div>
                      </div>

                      {/* Botón de Pago */}
                      <button
                        type="submit"
                        className="w-full h-16 uppercase bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition text-center leading-tight tracking-tight  truncate"
                      >
                        Pagar $2.000
                      </button>
                      <div className="w-full flex flex-row justify-center items-center gap-2 lg:gap-4">
                        <Link
                          href="/"
                          className="text-center text-sm text-blacktext-center leading-tight tracking-tight text-drcuotasPrimary-text underline"
                        >
                          Terminos y Condiciones
                        </Link>
                        <Link
                          href="/faq"
                          className="text-center text-sm text-blacktext-center leading-tight tracking-tight text-drcuotasPrimary-text underline"
                        >
                          Preguntas Frecuentes
                        </Link>
                      </div>
                    </form>
                  </Card>
                </TabsContent>
              </>
              <>
                <TabsContent value="password" className="h-full">
                  <Card className="bg-white w-[80vw] lg:w-[40vw] h-[35vw] p-10 shadow-xl shadow-drcuotasPrimary-bg">
                    <>
                      <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
                        <>
                          <div className="w-full h-full  flex flex-col gap-8">
                            <>
                              <div className="w-full h-auto flex flex-col justify-center items-center ">
                                <span className="w-auto h-auto  flex justify-center items-center uppercase font-black text-xl lg:text-2xl text-center leading-tight tracking-tight  text-drcuotasTertiary-text truncate">
                                  Plan de Financiacion
                                </span>
                                <span className="w-auto h-auto  hidden lg:flex justify-center items-center text-xs lg:text-sm leading-tight tracking-tight  text-drcuotasTertiary-text truncate">
                                  Puedes cubrir el costo de la Cirugia pagando a
                                  Cuotas.
                                </span>
                                <span className="w-auto h-auto  flex lg:hidden justify-center items-center text-xs lg:text-sm leading-tight tracking-tight  text-drcuotasTertiary-text truncate">
                                  Divide en Cuotas el Valor total de la Cirugia.
                                </span>
                              </div>
                            </>
                            <>
                              <div className="w-full h-auto  flex flex-row justify-center items-center ">
                                <div className="w-4 h-4 bg-drcuotasTertiary-bg bg-opacity-30 rounded-full"></div>
                                <div className="w-4 h-2 bg-drcuotasTertiary-bg bg-opacity-30 "></div>
                                <div className="w-4 h-4 bg-drcuotasTertiary-bg bg-opacity-30 rounded-full "></div>
                                <div className="w-4 h-2 bg-drcuotasTertiary-bg bg-opacity-30 "></div>
                                <div className="w-4 h-4 bg-drcuotasTertiary-bg bg-opacity-30 rounded-full "></div>
                                <div className="w-4 h-2 bg-drcuotasTertiary-bg bg-opacity-30 "></div>
                                <div className="w-4 h-4 bg-drcuotasTertiary-bg bg-opacity-30 rounded-full "></div>
                                <div className="w-4 h-2 bg-drcuotasTertiary-bg bg-opacity-30 "></div>
                                <div className="w-4 h-4 bg-drcuotasTertiary-bg bg-opacity-30 rounded-full "></div>
                                <div className="w-4 h-2 bg-drcuotasTertiary-bg bg-opacity-30 "></div>
                                <div className="w-4 h-4 bg-drcuotasTertiary-bg bg-opacity-30 rounded-full "></div>
                                <div className="w-4 h-2 bg-drcuotasTertiary-bg bg-opacity-30 "></div>
                                <div className="w-4 h-4 bg-drcuotasTertiary-bg bg-opacity-30 rounded-full "></div>
                                <div className="w-4 h-2 bg-drcuotasTertiary-bg bg-opacity-30 "></div>
                                <div className="w-4 h-4 bg-drcuotasTertiary-bg bg-opacity-30 rounded-full "></div>
                              </div>
                            </>
                          </div>
                        </>
                      </div>
                    </>
                  </Card>
                </TabsContent>
              </>
            </Tabs>
          </>
        </div>
      )}
    </>
  );
};

export default SpecialtyCard;
