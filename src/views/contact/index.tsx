/* eslint-disable @next/next/no-img-element */
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50  to-pink-50 flex items-center justify-center ">
      <div className="bg-white  shadow-2xl p-8 w-full max-w-lg">
        {/* Título cursivo */}
        <img
          src="/images/banners/TitleBanner.svg"
          alt="Título de contacto"
          className="w-full mb-8"
        />

        <div className="space-y-4">
          {/* Primera fila: Cirugía y Nombre */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-600 mb-2 block">
                Selecciona la cirugía:
              </span>
              <select
                name="cirugia"
                value={formData.cirugia}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-drcuotasSecondaryPrimaryColor-text focus:border-drcuotasSecondaryPrimaryColor-text text-gray-700 text-sm"
                required
              >
                <option value="rinoplastia">Rinoplastia</option>
                <option value="liposuccion">Liposucción</option>
                <option value="aumento-senos">Aumento de senos</option>
                <option value="abdominoplastia">Abdominoplastia</option>
                <option value="lifting-facial">Lifting facial</option>
                <option value="otra">Otra</option>
              </select>
            </div>

            <div>
              <span className="text-sm text-gray-600 mb-2 block">
                nombre y apellido:
              </span>
              <input
                type="text"
                name="nombreApellido"
                value={formData.nombreApellido}
                onChange={handleInputChange}
                placeholder="Nombre y Apellido*"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-drcuotasSecondaryPrimaryColor-text focus:border-drcuotasSecondaryPrimaryColor-text text-sm"
                required
              />
            </div>
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
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-drcuotasSecondaryPrimaryColor-text focus:border-drcuotasSecondaryPrimaryColor-text text-sm"
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
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-drcuotasSecondaryPrimaryColor-text focus:border-drcuotasSecondaryPrimaryColor-text text-sm"
                required
              />
            </div>
          </div>
          <span className="text-sm text-gray-600 mb-2 block">
            provincia y localidad
          </span>
          {/* Tercera fila: Provincia y Localidad */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <select
                name="provincia"
                value={formData.provincia}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-drcuotasSecondaryPrimaryColor-text focus:border-drcuotasSecondaryPrimaryColor-text text-gray-700 text-sm"
                required
              >
                <option value="">Provincia</option>
                <option value="buenos-aires">Buenos Aires</option>
                <option value="cordoba">Córdoba</option>
                <option value="santa-fe">Santa Fe</option>
                <option value="mendoza">Mendoza</option>
                <option value="tucuman">Tucumán</option>
                <option value="entre-rios">Entre Ríos</option>
                <option value="salta">Salta</option>
                <option value="chaco">Chaco</option>
                <option value="corrientes">Corrientes</option>
                <option value="misiones">Misiones</option>
                <option value="santiago-del-estero">Santiago del Estero</option>
                <option value="san-juan">San Juan</option>
                <option value="jujuy">Jujuy</option>
                <option value="rio-negro">Río Negro</option>
                <option value="formosa">Formosa</option>
                <option value="neuquen">Neuquén</option>
                <option value="chubut">Chubut</option>
                <option value="san-luis">San Luis</option>
                <option value="catamarca">Catamarca</option>
                <option value="la-rioja">La Rioja</option>
                <option value="la-pampa">La Pampa</option>
                <option value="santa-cruz">Santa Cruz</option>
                <option value="tierra-del-fuego">Tierra del Fuego</option>
              </select>
            </div>

            <div>
              <select
                name="localidad"
                value={formData.localidad}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-drcuotasSecondaryPrimaryColor-text focus:border-drcuotasSecondaryPrimaryColor-text text-gray-700 text-sm"
                required
              >
                <option value="">Localidad</option>
                <option value="caba">Ciudad Autónoma de Buenos Aires</option>
                <option value="la-plata">La Plata</option>
                <option value="mar-del-plata">Mar del Plata</option>
                <option value="rosario">Rosario</option>
                <option value="cordoba-capital">Córdoba Capital</option>
                <option value="mendoza-capital">Mendoza Capital</option>
                <option value="san-miguel-tucuman">
                  San Miguel de Tucumán
                </option>
                <option value="salta-capital">Salta Capital</option>
                <option value="otra">Otra</option>
              </select>
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
              className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-drcuotasSecondaryPrimaryColor-text focus:border-drcuotasSecondaryPrimaryColor-text text-sm"
              required
            />
          </div>

          {/* Botón Enviar */}
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-md transition duration-200 ease-in-out">
            Enviar
          </button>
        </div>

        {/* Logo Dr. Cuotas */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center space-x-2">
            <img
              src="/images/logo/logo-1.svg"
              alt="Logo Dr. Cuotas"
              className="h-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
