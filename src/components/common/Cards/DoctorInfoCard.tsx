import Image from 'next/image';

import { SocialMedia } from '@/types';
import { socialMediaIcons } from '@/utils/social-media-icos';

interface DoctorProps {
  doctor: {
    id: string;
    profession: string;
    user: {
      first_name: string;
      last_name: string;
      profile_picture: string;
      social_media: Array<{
        link: string;
        status: string;
        type: string;
      }>;
    };
  };
}

const DoctorInfoCard: React.FC<DoctorProps> = ({ doctor }) => {
  return (
    <div className="flex flex-col w-[238px] h-[375px] rounded-3xl items-center shadow-lg bg-white">
      <Image
        src={doctor.user.profile_picture ?? '/images/elements/doctor.svg'}
        alt={doctor.user.first_name}
        className="rounded-t-3xl w-[238px] h-[224px] object-cover"
        width={238}
        height={224}
      />
      <div className="flex flex-col justify-center items-center gap-2 mt-4">
        <span className="text-lg font-bold text-drcuotasSecondary-text capitalize">
          {doctor.user.first_name.concat(' ', doctor.user.last_name)}
        </span>
        <span className="text-drcuotasTertiary-text text-md capitalize">
          {doctor.profession ?? 'Doctor'}
        </span>
      </div>
      <div className="flex justify-center items-center gap-4 mt-4 text-drcuotasPrimary-text">
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
          <span className="text-xs font-bold text-drcuotasTertiary-text">
            No hay redes sociales
          </span>
        )}
      </div>
    </div>
  );
};

export default DoctorInfoCard;
