import { LucideMessagesSquare, LucideZoomIn } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

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

  const [selectedCuotas, setSelectedCuotas] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');

  const cuotasOptions = [4, 8, 12, 16]; // Opciones de cuotas
  const planOptions = ['Miguel Angel', 'Brayan Suarosky', 'Johan Jimenez']; // Opciones de planes/nombres

  return (
    <>
      <div
        className="flex flex-col w-60 lg:w-80 h-full rounded-xl bg-white  cursor-pointer"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <>
          <div className="flex justify-center items-center">
            <Image
              src="/images/elements/girl_footer.svg"
              alt=""
              className="w-full h-full object-cover rounded-xl p-4"
              width={238}
              height={224}
            />
            {/* <Image
              src={imageUrl ?? '/images/elements/specialty.svg'}
              alt=""
              className="w-full h-full object-cover"
              width={238}
              height={224}
            /> */}
          </div>
        </>

        <>
          <div className="flex flex-col gap-4 items-center justify-center p-8 flex-grow">
            <div className="hidden flex-row w-[60px] items-center justify-center bg-[#26335D] gap-2 rounded-3xl p-1">
              <FaStar className="text-yellow-400 text-sm" />
              <span className="text-white text-xs">{rating ?? 0}</span>
            </div>
            <div className="flex flex-col justify-center items-center  w-full">
              <span className="uppercase leading-tight tracking-tight font-black text-xl text-drcuotasTertiary-text truncate">
                {title}
              </span>
              <span className="text-drcuotasTertiary-text text-xs line-clamp-3 uppercase leading-tight tracking-tight">
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
        <div className="fixed inset-0 w-full h-full backdrop-blur-md bg-drcuotasSecondary-bg bg-opacity-60 flex flex-row justify-center items-center z-50 gap-4 p-10">
          {/* Informacion de Cirugia  */}
          <>
            <div className="bg-white w-[80vw] lg:w-[30vw] h-full p-10 flex flex-col shadow-xl ">
              <h2 className="text-2xl uppercase font-black text-center leading-tight tracking-tight text-drcuotasPrimary-text w-full h-auto">
                {title}
              </h2>
              <div className="w-full h-full">
                <Image
                  src="/images/banners/banner_full_body.svg"
                  alt=""
                  className="w-full h-full object-cover border"
                  width={238}
                  height={224}
                />
              </div>
            </div>
          </>
          {/* Pagar  */}
          <>
            <div className="bg-white w-[80vw] lg:w-[40vw] h-full p-10 flex flex-col shadow-xl">
              <h2 className="text-2xl  uppercase font-black text-center leading-tight tracking-tight  text-drcuotasPrimary-text w-full h-auto">
                Paga a Cuotas Tu Sueño
              </h2>

              {/* Logos de Tarjetas */}
              <div className="flex justify-center gap-2 h-auto">
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
              <form className="w-full h-full flex flex-col justify-center gap-2">
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
                      className="w-full h-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition text-sm"
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
                    className="w-full h-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition text-sm"
                  />
                </div>

                {/* Expiración y CVV */}
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <label className="text-sm font-medium text-drcuotasTertiary-text text-center leading-tight tracking-tight  truncate">
                      Expiración
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full h-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition text-sm"
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
                      className="w-full h-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition text-sm"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  {/* Selección de plan o nombre */}
                  <div className="w-1/2 ">
                    <label className="text-sm font-medium text-drcuotasTertiary-text text-center leading-tight tracking-tight  truncate">
                      Seleccionar Doctor
                    </label>
                    <select
                      value={selectedPlan}
                      onChange={(e) => {
                        setSelectedPlan(e.target.value);
                      }}
                      className="w-full h-10 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition text-sm text-drcuotasTertiary-text"
                    >
                      <option value="">Elige una opción</option>
                      {planOptions.map((plan, index) => (
                        <option key={index} value={plan}>
                          {plan}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-1/2">
                    <label className="text-sm font-medium text-drcuotasTertiary-text text-center leading-tight tracking-tight  truncate">
                      Número de Cuotas
                    </label>
                    <select
                      value={selectedCuotas}
                      onChange={(e) => {
                        setSelectedCuotas(e.target.value);
                      }}
                      className="w-full h-10 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition text-sm text-drcuotasTertiary-text"
                    >
                      <option value="">Elige una opción</option>
                      {cuotasOptions.map((cuota) => (
                        <option key={cuota} value={cuota}>
                          {cuota} cuotas
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>

              <div className="w-full h-full flex flex-col justify-end items-center gap-2">
                
                <>
                  <div className="w-full h-auto flex justify-center items-center">
                    <span className="text-sm text-drcuotasTertiary-text text-center">
                      {selectedCuotas
                        ? `${selectedCuotas} cuotas de $${(price / Number(selectedCuotas)).toFixed(2)}`
                        : 'Seleccione cuotas'}
                      <br /> Para pagar el valor total de ${price}
                    </span>
                  </div>
                </>
                <>
                  <div className="w-full h-20 flex flex-col justify-center items-center gap-4">
                    <button
                      type="submit"
                      className="w-full h-16 uppercase bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition text-center leading-tight tracking-tight  truncate"
                    >
                      Pagar ahora
                    </button>
             
                  </div>
                </>
              </div>
            </div>
          </>
          <>
            <div className="w-auto h-full flex flex-col gap-2">
              <button
                className="  text-drcuotasPrimary hover:text-white bg-white hover:bg-red-500 font-black uppercase border-2 hover:border-red-500 border-drcuotasPrimary w-16 h-10 hidden lg:flex items-center justify-center rounded-xl transition-all duration-300 gap-2"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <span className="font-black uppercase leading-tight tracking-tight text-xs lg:text-base">
                  x
                </span>
              </button>
              <>
                <Link
                  href="/"
                  className="  text-drcuotasPrimary hover:text-white bg-white hover:bg-green-500 font-black uppercase border-2 hover:border-green-500 border-drcuotasPrimary w-16 h-10 hidden lg:flex items-center justify-center rounded-xl transition-all duration-300 gap-2"
                >
                  {/* <span className="uppercase leading-tight tracking-tight text-sm">
                                  Cuenta
                                </span> */}
                  {/* <FiUser className="text-2xl" /> */}
                  <LucideZoomIn  className="text-2xl" />
                </Link>
              </>
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default SpecialtyCard;
