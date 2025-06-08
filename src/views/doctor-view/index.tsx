/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  LucideDownload,
  LucideFacebook,
  LucideGlobe,
  LucideInstagram,
  LucideLinkedin,
  LucideMap,
  LucideMapPinned,
  LucidePartyPopper,
  LucideShieldCheck,
  LucideStar,
  LucideTwitter,
} from 'lucide-react';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

import EvidenceCard from '@/components/common/ViewElements/cardEvidence';
import OurServices from '@/components/common/ViewElements/OurServices';
import useDoctorDetails, { rateDoctor } from '@/graphql/operations/getDoctor';
import { Doctor } from '@/types';

// Definiciones de tipos
type SocialMedia =
  | 'facebook'
  | 'twitter'
  | 'instagram'
  | 'linkedin'
  | 'website';

interface SocialMediaLink {
  type: SocialMedia;
  link: string;
}

interface User {
  first_name: string;
  last_name: string;
  profile_picture?: string;
  social_media: SocialMediaLink[];
  ratings?: Array<{ rating: number }>;
}

interface DoctorViewProps {
  doctor: Doctor;
}

// Objeto para mapear tipos de redes sociales a sus iconos correspondientes
const socialMediaIcons: Record<SocialMedia, React.ComponentType<any>> = {
  facebook: LucideFacebook,
  twitter: LucideTwitter,
  instagram: LucideInstagram,
  linkedin: LucideLinkedin,
  website: LucideGlobe,
};

export const DoctorView: React.FC<DoctorViewProps> = ({ doctor }) => {
  const { t } = useTranslation('common');

  if (!doctor) return null;

  const defaultImage = '/images/elements/doctor.svg';
  const [profilePicture, setProfilePicture] = useState<string>(
    doctor?.user?.profile_picture && doctor.user.profile_picture !== ''
      ? doctor.user.profile_picture
      : defaultImage,
  );

  const doctorName = doctor?.user
    ? `${doctor.user.first_name} ${doctor.user.last_name}`
    : 'Desconocido';
  const specialty = doctor?.profession ?? 'Especialidad no especificada';

  // Estado para los "Me gusta"
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [showFloatingHeart, setShowFloatingHeart] = useState<boolean>(false);
  const [tempLikeCount, setTempLikeCount] = useState<number>(0);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  const { doctorData, error, doctorId } = useDoctorDetails();
  console.log('Doctor Data:', doctorData);
  console.log('Error:', error);

  // Actualizar el contador temporal cuando cambien los datos del doctor
  useEffect(() => {
    const realLikes = doctorData?.ratingsCount ?? 0;
    setTempLikeCount(realLikes);
  }, [doctorData?.ratingsCount]);

  const handleLike = async () => {
    if (doctorId && !liked) {
      // Iniciar animación
      setIsAnimating(true);
      setShowFloatingHeart(true);

      // Marcar como liked y sumar 1 temporalmente
      setLiked(true);
      setTempLikeCount((prev) => prev + 1);

      try {
        await rateDoctor(doctorId);
      } catch (error) {
        // Si falla, revertir los cambios
        setLiked(false);
        setTempLikeCount((prev) => prev - 1);
      }

      // Detener animaciones después de un tiempo
      setTimeout(() => {
        setIsAnimating(false);
      }, 600);

      setTimeout(() => {
        setShowFloatingHeart(false);
      }, 1000);
    }
  };

  const ratingValue = doctorData?.doctor?.user?.ratings?.[0]?.rating ?? 0;

  // Función para obtener el icono seguro para redes sociales
  const getSafeIcon = (type: SocialMedia): React.ComponentType<any> => {
    return socialMediaIcons[type] || LucideGlobe;
  };

  return (
    <>
      <style jsx>{`
        @keyframes heartBeat {
          0% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.2);
          }
          50% {
            transform: scale(1.1);
          }
          75% {
            transform: scale(1.25);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes heartFloat {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0.8);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-20px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateY(-40px) scale(1);
          }
        }

        @keyframes buttonPulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }

        .heart-beat {
          animation: heartBeat 0.6s ease-in-out;
        }

        .heart-float {
          animation: heartFloat 1s ease-out forwards;
        }

        .button-pulse {
          animation: buttonPulse 0.6s ease-out;
        }

        .floating-heart {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 10;
          color: #ef4444;
        }

        .toast {
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          padding: 12px 24px;
          border-radius: 10px;
          box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
          z-index: 1000;
          font-weight: 600;
          transform: translateX(100%);
          transition: all 0.3s ease-in-out;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .toast.show {
          transform: translateX(0);
        }

        .toast::before {
          content: '⚠️';
          margin-right: 8px;
          font-size: 16px;
        }

        @keyframes toastSlide {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .toast-enter {
          animation: toastSlide 0.3s ease-out;
        }
      `}</style>

      <div className="w-full h-full overflow-hidden">
        {/* Banner con degradado gris */}
        <div className="h-72 bg-gradient-to-b from-white to-drcuotasPrimary-bg" />

        {/* Contenedor Principal */}
        <div className="px-6 pb-6 flex flex-col justify-center gap-4">
          {/* Profile header */}
          <>
            <div className="flex flex-col md:flex-row gap-4 -mt-16 items-center">
              {/* Imagen del Doctor */}
              <div className="h-32 w-32 border-4 border-white bg-gray-200 rounded-full overflow-hidden shadow-md">
                <img
                  src={profilePicture}
                  alt={`Foto de ${doctorName}`}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                  onError={() => {
                    setProfilePicture(defaultImage);
                  }}
                />
              </div>

              {/* Información del Doctor */}
              <div className="w-full flex-1 text-center md:text-left">
                <h1 className="text-2xl lg:text-4xl font-black uppercase leading-tight tracking-tight text-drcuotasPrimary-text sm:text-white lg:-mt-4 flex flex-row gap-2 items-center justify-center sm:justify-start">
                  {doctorName}{' '}
                  <LucideShieldCheck className="w-4 lg:w-6 h-4 lg:h-6" />
                </h1>
                <p className="text-base uppercase font-bold leading-tight tracking-tight text-drcuotasPrimary-text">
                  Doctor Registrado
                </p>
              </div>

              {/* Botones */}
              <div className="flex gap-2">
                <button
                  className="w-40 h-14 flex flex-row justify-center items-center gap-2 bg-white border border-drcuotasPrimary-bg text-drcuotasPrimary-text rounded-xl"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/example.pdf';
                    link.download = 'Curriculum.pdf';
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
                  disabled={liked}
                  className={`relative w-40 h-14 flex flex-row justify-center items-center gap-2 rounded-xl border border-white transition-all duration-300 ${
                    liked
                      ? 'bg-drcuotasSecondaryPrimaryColor text-white transform scale-105'
                      : 'bg-drcuotasSecondary-bg text-white hover:bg-opacity-90'
                  } ${isAnimating ? 'button-pulse' : ''} ${
                    liked ? 'cursor-not-allowed opacity-90' : 'cursor-pointer'
                  }`}
                >
                  <LucideStar
                    className={`text-2xl transition-all duration-300 ${
                      isAnimating ? 'heart-beat' : ''
                    } ${liked ? 'fill-current' : ''}`}
                  />
                  {liked ? 'Liked!' : 'Me gusta'}

                  {/* Corazón flotante */}
                  {showFloatingHeart && (
                    <div className="floating-heart heart-float">
                      <LucideStar className="w-6 h-6 fill-current" />
                    </div>
                  )}
                </button>
              </div>
            </div>
          </>
          <>
            <div className="w-full h-full flex flex-col lg:flex-row justify-center gap-2 p-4">
              {/* Información extra (Opcional) */}
              <>
                <div className="w-full h-full flex flex-col justify-start gap-4">
                  {/* Sección de sobre mi */}
                  <>
                    <div className="w-full h-52 border rounded-xl p-10 border-drcuotasPrimary-bg text-center md:text-left hidden sm:flex flex-col justify-between items-start">
                      <>
                        <div>
                          <p className="text-base font-bold text-drcuotasPrimary-text uppercase leading-tight tracking-tight">
                            Sobre mi
                          </p>
                          {/* etiquetas de tipos de cirugias */}
                          <>
                            <span className="text-sm leading-tight tracking-tight text-drcuotasTertiary-text">
                              {doctorData?.doctor?.description ??
                                'No hay descripción disponible.'}
                            </span>
                          </>
                        </div>
                      </>
                      <>
                        <div>
                          <div className="w-full flex flex-row items-center gap-4 ">
                            <>
                              <button className="w-auto h-auto flex flex-row justify-center items-center gap-2">
                                <LucideMap className="w-4 h-4 text-drcuotasTertiary-text" />
                                <span className="text-sm leading-tight tracking-tight text-drcuotasTertiary-text">
                                  {doctorData?.doctor?.country ?? 'Argentina'}
                                </span>
                              </button>
                            </>
                            <>
                              <button className="w-auto h-auto flex flex-row justify-center items-center gap-2">
                                <LucideMapPinned className="w-4 h-4 text-drcuotasTertiary-text" />
                                <span className="text-sm leading-tight tracking-tight text-drcuotasTertiary-text">
                                  {doctorData?.doctor?.provincia ??
                                    'Buenos Aires'}
                                </span>
                              </button>
                            </>
                            <></>
                          </div>
                        </div>
                      </>
                    </div>
                    <p className="text-base font-bold text-drcuotasPrimary-text uppercase leading-tight tracking-tight">
                      Evidencias
                    </p>
                    <EvidenceCard />
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
                      <p className="text-sm text-drcuotasTertiary-text leading-tight tracking-tight mb-2 flex flex-row items-center justify-center sm:justify-start gap-2">
                        <LucidePartyPopper className="w-4 h-4" />{' '}
                        {doctorData?.doctor?.surgeries?.length ?? 0} Cirugias
                        Creadas
                      </p>
                      <p className="text-sm text-drcuotasTertiary-text leading-tight tracking-tight flex flex-row items-center justify-center sm:justify-start gap-2">
                        <LucideStar className="w-4 h-4" />{' '}
                        <span
                          className={`transition-all duration-300 ${
                            tempLikeCount !== (doctorData?.ratingsCount ?? 0)
                              ? 'text-drcuotasTertiary-text font-bold'
                              : ''
                          }`}
                        >
                          {tempLikeCount}
                        </span>{' '}
                        Me gusta
                      </p>
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
                        {doctor.user?.social_media?.length ? (
                          doctor.user.social_media.slice(0, 3).map((social) => {
                            // Usamos la función getSafeIcon para evitar componentes undefined
                            const Icon = getSafeIcon(
                              social.type as unknown as SocialMedia,
                            );
                            return (
                              <a
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
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
      <div className="w-full mb-40">
        <OurServices />
      </div>

      {/* Toast de notificación */}
      {showToast && (
        <div className={`toast ${showToast ? 'show toast-enter' : ''}`}>
          {toastMessage}
        </div>
      )}
    </>
  );
};
