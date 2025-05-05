import { LucideGlobe } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { SocialMedia } from '@/types';
import { socialMediaIcons } from '@/utils/social-media-icos';

interface DoctorProps {
  doctor: {
    id?: string | null;
    profession?: string | null;
    user?: {
      first_name: string | null;
      last_name: string | null;
      profile_picture?: string | null;
      social_media?: Array<{
        link: string | null;
        status: string | null;
        type: string | null;
      }> | null; // Permitir que social_media sea opcional o null
    } | null; // Permitir que user sea opcional o null
  };
}

const DoctorInfoCard: React.FC<DoctorProps> = ({ doctor }) => {
  // Verificar que la imagen no sea null o undefined
  const defaultImage = '/images/elements/doctor.svg';
  const initialImage =
    doctor.user!.profile_picture && doctor.user!.profile_picture.trim() !== ''
      ? doctor.user!.profile_picture
      : defaultImage;

  const [imageSrc, setImageSrc] = useState(initialImage);

  return (
    <a
      href={`/view-account/doctor/${doctor.id}`}
      className="w-60 lg:w-80 h-full rounded-xl border cursor-pointer flex flex-col justify-center items-center gap-4"
    >
      {/* Contenedor de la imagen con tamaño fijo */}
      <Image
        src={imageSrc}
        alt={doctor.user!.first_name ?? 'Doctor'}
        className="w-full object-cover rounded-t-xl"
        width={238}
        height={224}
        onError={() => {
          setImageSrc(defaultImage); // Establecer imagen por defecto en caso de error
        }}
      />

      {/* Información del doctor */}
      <div className="flex flex-col justify-center items-center">
        <span className="text-lg font-bold text-drcuotasTertiary-text capitalize text-center leading-tight tracking-tight w-64">
          {doctor.user!.first_name} {doctor.user!.last_name}
        </span>
        <span className="text-drcuotasTertiary-text text-md capitalize">
          {doctor.profession ?? 'Doctor'}
        </span>
      </div>

      {/* Redes sociales */}
      <div className="w-full h-full flex justify-center items-center gap-4 text-drcuotasPrimary-text">
        {doctor.user!.social_media!.length > 0 ? (
          doctor.user!.social_media!.slice(0, 3).map((social) => {
            const Icon = socialMediaIcons[social.type as SocialMedia];
            return (
              <a
                ref={social.link}
                target="_blank"
                key={social.type}
                className="h-full"
                rel="noopener noreferrer" // Añadir seguridad al link externo
              >
                <Icon className="h-full" size={30} />
              </a>
            );
          })
        ) : (
          <span className="w-full h-10 flex justify-center items-center font-bold text-drcuotasTertiary-text">
            <LucideGlobe className="w-4 h-4" />
          </span>
        )}
      </div>
    </a>
  );
};

export default DoctorInfoCard;
