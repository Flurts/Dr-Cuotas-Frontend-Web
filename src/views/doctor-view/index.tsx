import {
  Link,
  LucideCalendar,
  LucideDownload,
  LucideGlobe,
  LucideInstagram,
  LucideMap,
  LucideMapPinned,
  LucideMessagesSquare,
  LucidePartyPopper,
  LucideShieldCheck,
  LucideStar,
  LucideTwitter,
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

  // Estado para los "Me gusta"
  const [likes, setLikes] = useState(doctor?.likes || 0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
  };


  return (
    <>
      <div className="w-full h-full overflow-hidden">
        {/* Banner con degradado gris */}
        <div className="h-72  bg-gradient-to-b from-white to-drcuotasPrimary-bg" />

        {/* Contenedor Principal */}
        <div className="px-6 pb-6 flex flex-col  justify-center gap-4">
          {/* Profile header */}
          <>
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
                <h1 className="text-2xl lg:text-4xl font-black uppercase leading-tight tracking-tight text-drcuotasPrimary-text sm:text-white lg:-mt-4  flex flex-row gap-2 items-center justify-center sm:justify-start">  
                {doctorName} <LucideShieldCheck className='w-4 lg:w-6 h-4 lg:h-6'/>
                </h1>
                <p className="text-base uppercase font-bold leading-tight tracking-tight text-drcuotasPrimary-text">
                  {/* {specialty} */}
                  Doctor Registrado
                </p>
              </div>

              {/* Botones */}
              <div className="flex gap-2">
              <button
                  className="w-40 h-14 flex flex-row justify-center items-center gap-2 bg-white border border-drcuotasPrimary-bg text-drcuotasPrimary-text rounded-xl"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/example.pdf'; // Ruta del PDF en la carpeta public
                    link.download = 'Curriculum.pdf'; // Nombre con el que se descargará
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                <LucideDownload className="text-2xl" />
                Perfil
              </button>

                <button
                  onClick={handleLike}
                  className={`w-40 h-14 flex flex-row justify-center items-center gap-2 rounded-xl border border-white ${
                    liked ? 'bg-drcuotasPrimary-bg text-white' : 'bg-drcuotasSecondary-bg text-white'
                  }`}
                >
                  <LucideStar className="text-2xl" />
                  {liked ? 'Me gusta' : 'Me gusta'}
                </button>
              </div>
            </div>
          </>
          <>
            <div className="w-full h-full flex flex-col lg:flex-row justify-center  gap-2 p-4">
              {/* Información extra (Opcional) */}
              <>
                <div className="w-full h-full flex flex-col justify-start gap-4 ">
                  {/* Sección de sobre mi */}
                  <>
                    <div className="w-full h-80 border rounded-xl p-10 border-drcuotasPrimary-bg text-center md:text-left hidden sm:flex flex-col justify-between items-start">
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
                <div className="w-full lg:w-[40vw] h-full flex flex-col justify-start gap-2">
                  {/* Sección de conexiones */}
                  <>
                    <div className="w-full border rounded-xl p-10 border-drcuotasPrimary-bg text-center md:text-left">
                      <p className="text-base font-bold text-drcuotasPrimary-text uppercase leading-tight tracking-tight mb-2">
                        Conexiones
                      </p>
                      <p className="text-sm text-drcuotasTertiary-text leading-tight tracking-tight mb-2 flex flex-row items-center justify-center sm:justify-start  gap-2">
                        <LucidePartyPopper className='w-4 h-4' /> 245 Cirugias Creadas
                      </p>
                      <p className="text-sm text-drcuotasTertiary-text leading-tight tracking-tight flex flex-row  items-center justify-center sm:justify-start gap-2"><LucideStar className='w-4 h-4' /> {likes} Me gusta</p>

                    </div>
                  </>

                  {/* Actividad reciente */}
                  <>
                    <div className="w-full border rounded-xl p-10 border-drcuotasPrimary-bg">
                      <p className="text-base font-bold text-drcuotasPrimary-text uppercase leading-tight tracking-tight mb-2 flex justify-center sm:justify-start">
                        Redes Sociales
                      </p>
                       {/* Redes sociales */}
                      <div className="w-full h-full flex justify-center sm:justify-start items-center gap-4 text-drcuotasPrimary-text">
                        {doctor.user.social_media.length ? (
                          doctor.user.social_media.slice(0, 3).map((social) => {
                            const Icon = socialMediaIcons[social.type as SocialMedia];
                            return (
                              <a
                                href={social.link}
                                target="_blank"
                                key={social.type}
                                className="h-full"
                              >
                                <Icon className="h-full" size={30} />
                              </a>
                            );
                          })
                        ) : (
                          <span className="w-full h-auto flex font-bold text-drcuotasTertiary-text gap-2 justify-center sm:justify-start">
                            <LucideGlobe className="w-4 h-4" />
                            <LucideGlobe className="w-4 h-4" />
                            <LucideGlobe className="w-4 h-4" />
                          </span>
                        )}
                      </div>        
                    </div>
                  </>
                </div>
              </>
            </div>
          </>
        </div>
      </div>
      <div className='w-full mb-40'>
        <OurServices />
      </div>
    </>
  );
};
