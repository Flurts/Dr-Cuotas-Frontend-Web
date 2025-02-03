import { Rating } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';

import { SocialMedia } from '@/types';
import { socialMediaIcons } from '@/utils/social-media-icos';

interface DoctorProps {
  doctor: {
    id: string;
    profession: string;
    user: {
      first_name: string;
      profile_picture: string;
      social_media: Array<{
        link: string;
        status: string;
        type: string;
      }>;
    };
  };
}

const DoctorCard: React.FC<DoctorProps> = ({ doctor }) => {
  return (
    <div className="bg-[#6636E2] w-80 xl:w-[400px] hover:shadow-2xl hover:shadow-[#B398F5] text-white p-10 rounded-tr-[80px] rounded-bl-[80px] relative mb-24 hover:scale-105 transition-all duration-300">
      <div className="w-full flex flex-col gap-10">
        <div className="flex self-end gap-2 h-8 opacity-50">
          {doctor.user.social_media.slice(0, 3).map((social) => {
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
          })}
        </div>
        <div>
          <h1 className="text-2xl font-bold truncate">
            {doctor.user?.first_name}
          </h1>
          <p className="text-lg mb-2 truncate opacity-50">
            {doctor.profession}
          </p>
          <Rating value={4} readOnly />
        </div>
      </div>

      <Link
        href={`/view-account/doctor/${doctor.id}`}
        className="absolute bottom-5 right-5"
      >
        <AiFillPlusCircle className="text-5xl" />
      </Link>

      <div className="bg-white overflow-hidden border-2 border-[#6636E2] w-40 h-40 rounded-full  absolute -top-20 left-0">
        {doctor.user?.profile_picture ? (
          <Image
            src={doctor.user.profile_picture}
            alt={doctor.user.first_name}
            fill
            objectFit="cover"
            className="rounded-full border-8 border-gray-200"
          />
        ) : (
          <Image
            src="/images/surgerys/mamas.png"
            alt="Default profile"
            fill
            objectFit="cover"
            className="rounded-full border-8 border-gray-100"
          />
        )}
      </div>
    </div>
  );
};

export default DoctorCard;
