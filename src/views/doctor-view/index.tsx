import {
  LucideCalendar,
  LucideDownload,
  LucideMap,
  LucideMapPinned,
  LucideMessagesSquare,
  LucideShieldCheck,
} from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import AdComponents from '@/components/common/ViewElements/AdComponents';
import OurServices from '@/components/common/ViewElements/OurServices';

export const DoctorView = ({ doctor }) => {
  const { t } = useTranslation('common');

  if (!doctor) return null; // Evitar errores si no hay datos del doctor

  const defaultImage = '/images/elements/doctor.svg';
  const [profilePicture, setProfilePicture] = useState(
    doctor?.user?.profile_picture && doctor.user.profile_picture !== ''
      ? doctor.user.profile_picture
      : defaultImage,
  );

  const doctorName = doctor?.user?.first_name + ' ' + doctor?.user?.last_name || 'Desconocido';
  const specialty = doctor?.specialty || 'Especialidad no especificada';

  return (
    <>
      <div className="w-full h-screen overflow-hidden">
        {/* Banner con degradado gris */}
        <div className="h-72  bg-gradient-to-b from-white to-drcuotasPrimary-bg" />

        {/* Contenedor Principal */}

        <div className="px-6 pb-6 flex flex-col  justify-center gap-4">
          {/* Profile header */}
          <div className="flex flex-col md:flex-row gap-4 -mt-16 items-center">
            {/* Imagen del Doctor */}
            <div className="h-32 w-32 border-4 border-white bg-gray-200 rounded-full overflow-hidden shadow-md">
              <Image
                src={profilePicture}
                alt={`Foto de ${doctorName}`}
                width={128}
                height={128}
                className="object-cover w-full h-full"
                onError={() => {
                  setProfilePicture(defaultImage);
                }} // Maneja error de imagen
              />
            </div>

            {/* Información del Doctor */}
            <div className="w-full flex-1 text-center md:text-left">
              <h1 className="text-4xl font-black uppercase leading-tight tracking-tight text-white -mt-4 flex flex-row gap-2 items-center">  
              {doctorName} <LucideShieldCheck className='w-6 h-6'/>
              </h1>
              <p className="text-base uppercase font-bold leading-tight tracking-tight text-drcuotasPrimary-text">
                {/* {specialty} */}
                Doctor Registrado
              </p>
            </div>

            {/* Botones */}
            <div className="flex gap-2">
              <button className="w-40 h-14 flex flex-row justify-center items-center gap-2 bg-white border border-drcuotasPrimary-bg text-drcuotasPrimary-text rounded-xl">
                <LucideDownload className="text-2xl" />
                Perfil
              </button>
              <button className="w-40 h-14 flex flex-row justify-center items-center gap-2 bg-drcuotasPrimary-bg border border-white text-white rounded-xl">
                <LucideMessagesSquare className="text-2xl" />
                Mensaje
              </button>
            </div>
          </div>

          <>
            <div className="w-full h-80 flex flex-row justify-center items-center gap-4 p-4">
              {/* Información extra (Opcional) */}
              <>
                <div className="w-full h-full flex flex-col justify-start gap-4 ">
                  {/* Sección de sobre mi */}
                  <>
                    <div className="w-full h-80 border rounded-xl p-10 border-drcuotasPrimary-bg text-center md:text-left flex flex-col justify-between items-start">
                      <>
                        <div>
                          <p className="text-base font-bold text-drcuotasPrimary-text uppercase leading-tight tracking-tight">
                            Sobre mi
                          </p>
                          {/* etiquetas de tipos de cirugias  */}
                          <>
                            <span className="text-sm leading-tight tracking-tight text-drcuotasTertiary-text">
                              {' '}
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit. Ea architecto autem ut
                              reiciendis aliquam rem? Accusamus voluptates
                              similique nostrum nam sunt pariatur corrupti? Enim
                              vitae debitis itaque alias dicta obcaecati?
                            </span>
                          </>
                        </div>
                      </>
                      <>
                        <div>
                          <div className='w-full flex flex-row items-center gap-8 p-4'>
                            <>
                              <button className="w-auto h-auto flex flex-row justify-center items-center gap-2">
                                <LucideMap className="w-4 h-4 text-drcuotasTertiary-text" />
                                <span className="text-sm leading-tight tracking-tight text-drcuotasTertiary-text">
                                  Argentina
                                </span>
                              </button>
                            </>
                            <>
                              <button className="w-auto h-auto flex flex-row justify-center items-center gap-2">
                                <LucideMapPinned className="w-4 h-4 text-drcuotasTertiary-text" />
                                <span className="text-sm leading-tight tracking-tight text-drcuotasTertiary-text">
                                  Corrientes - Goya
                                </span>
                              </button>
                            </>
                            <>
                              <button className="w-auto h-auto flex flex-row justify-center items-center gap-2">
                                <LucideCalendar  className="w-4 h-4 text-drcuotasTertiary-text" />
                                <span className="text-sm leading-tight tracking-tight text-drcuotasTertiary-text">
                                Se unió en Marzo 2022
                                </span>
                              </button>
                            </>
              
                          </div>

                          {/* etiquetas de tipos de cirugias  */}
                          <>
                            <div className="w-full h-8 flex flex-row  items-center gap-2">
                              <>
                                <button className="w-40 h-8 bg-drcuotasPrimary-bg border border-white text-white rounded-xl text-sm">
                                  Cirugía General
                                </button>
                              </>
                              <>
                                <button className="w-40 h-8 bg-drcuotasPrimary-bg border border-white text-white rounded-xl text-sm">
                                  Plastica / Estetica
                                </button>
                              </>
                              <>
                                <button className="w-40 h-8 bg-drcuotasPrimary-bg border border-white text-white rounded-xl text-sm">
                                  Ortopedica
                                </button>
                              </>
                            </div>
                          </>
                        </div>
                      </>
                    </div>
                  </>
                </div>
              </>

              {/* Información extra (Opcional) */}
              <>
                <div className="w-[40vw] h-full flex flex-col justify-start gap-4 ">
                  {/* Sección de conexiones */}
                  <>
                    <div className="w-full border rounded-xl p-10 border-drcuotasPrimary-bg text-center md:text-left">
                      <p className="text-base font-bold text-drcuotasPrimary-text uppercase leading-tight tracking-tight">
                        Conexiones
                      </p>
                      <p className="text-sm text-drcuotasTertiary-text leading-tight tracking-tight">
                        245 Cirugias Creadas • 182 Completadas
                      </p>
                    </div>
                  </>

                  {/* Actividad reciente */}
                  <>
                    <div className="w-full border rounded-xl p-10 border-drcuotasPrimary-bg">
                      <p className="text-base font-bold text-drcuotasPrimary-text uppercase leading-tight tracking-tight">
                        Actividad reciente
                      </p>
                      <ul className="text-sm leading-tight tracking-tight text-drcuotasTertiary-text">
                        <li>🔹 Publicó un nuevo proyecto - 2 semanas atrás</li>
                        <li>
                          🔹 Principios de diseño inclusivo - 2 días atrás
                        </li>
                      </ul>
                    </div>
                  </>
                </div>
              </>
            </div>
          </>
        </div>
      </div>

      <OurServices />
    </>
  );
};
