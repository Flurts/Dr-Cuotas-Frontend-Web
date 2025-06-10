/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React, { useState } from 'react';

export default function ContactView() {
  const [formData, setFormData] = useState({
    cirugia: '',
    nombreApellido: '',
    dni: '',
    telefonoCelular: '',
    provincia: '',
    localidad: '',
    email: '',
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full h-screen flex items-center justify-center p-10">
      <>
        <div className="bg-white border  p-8 w-full max-w-2xl flex flex-col gap-2">
          <div className="w-full h-40 flex justify-center items-center">
            <Image
              src="/images/banners/TitleBanner.svg"
              width={200}
              height={200}
              className="object-contain"
              alt="Tu belleza sin limites"
            />
          </div>

          {/* Primera fila: Cirugía y Nombre */}
          <div>
            <input
              type="text"
              name="nombreApellido"
              value={formData.nombreApellido}
              onChange={handleInputChange}
              placeholder="Nombre y Apellido*"
              className="w-full px-3 py-2.5 border text-xs focus:outline-none focus:ring-1 focus:ring-drcuotasSecondaryPrimaryColor-text focus:border-drcuotasSecondaryPrimaryColor-text"
              required
            />
          </div>

          {/* Segunda fila: DNI y Teléfono */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="dni"
                value={formData.dni}
                onChange={handleInputChange}
                placeholder="DNI*"
                className="w-full px-3 py-2.5 border text-xs focus:outline-none focus:ring-1 focus:ring-drcuotasSecondaryPrimaryColor-text focus:border-drcuotasSecondaryPrimaryColor-text"
                required
              />
            </div>

            <div>
              <input
                type="tel"
                name="telefonoCelular"
                value={formData.telefonoCelular}
                onChange={handleInputChange}
                placeholder="Teléfono / Celular*"
                className="w-full px-3 py-2.5 border text-xs focus:outline-none focus:ring-1 focus:ring-drcuotasSecondaryPrimaryColor-text focus:border-drcuotasSecondaryPrimaryColor-text"
                required
              />
            </div>
          </div>

          {/* Cuarta fila: Email (ancho completo) */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email*"
              className="w-full px-3 py-2.5 border text-xs focus:outline-none focus:ring-1 focus:ring-drcuotasSecondaryPrimaryColor-text focus:border-drcuotasSecondaryPrimaryColor-text"
              required
            />
          </div>

          {/* Botón Enviar */}
          <button className="w-full bg-drcuotasSecondaryPrimaryColor-text text-white font-medium py-3 px-6  transition duration-200 ease-in-out">
            Enviar
          </button>
        </div>
      </>
    </div>
  );
}
