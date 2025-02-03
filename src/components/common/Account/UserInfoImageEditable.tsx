import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
// import { IoSettings } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';

import CustomImageUploader from '@/components/common/Editable/UserImage';
import { User } from '@/types';

export default function UserInfoImageEditable({
  user,
  handleChange,
}: {
  user: User;
  handleChange: (FileUpload: File) => void;
}) {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col gap-6   md:flex-row w-full justify-center md:justify-between items-start my-10 px-2 md:px-10 xl:px-20">
      <div className="flex w-full justify-center items-center md:items-start md:w-1/3 flex-col md:ml-4 xl:ml-10 text-start gap-1 h-full mt-22">
        <span className="md:text-xl xl:text-2xl text-[#6636E2]">
          {t('welcome')}
        </span>
        <span className="text-sm md:text-lg xl:text-2xl text-[#9665FF]">
          {user.first_name + ' ' + user.last_name}
        </span>
        {user.phone_number && (
          <span className="flex gap-1 items-center mx-2">
            <FaWhatsapp className="text-[#25d366] md:text-lg xl:text-2xl" />
            <span className="md:text-xs xl:text-lg text-[#9665FF]">
              {user.phone_number}
            </span>
          </span>
        )}
        {user.email && (
          <span className="flex gap-2 items-center mx-2">
            <MdOutlineEmail className="text-[#d93025] md:text-xl xl:text-3xl" />
            <span className="text-xs xl:text-lg text-[#9665FF]">
              {user.email}
            </span>
          </span>
        )}
      </div>
      <div className="flex flex-col w-full justify-center md:w-1/3 items-center gap-5 md:ml-10 xl:ml-24">
        <CustomImageUploader
          width={120}
          height={120}
          imageUrl={user.profile_picture ?? undefined}
          onChange={handleChange}
        />

        <span className="text-xs w-full text-center">
          {t('memberOfSince', {
            date: new Date(user.created_at).toLocaleDateString(),
          })}
        </span>
      </div>
      <div className="flex flex-col w-full justify-center items-center md:justify-end md:items-end md:w-1/3 xl:mx-10 xl:mr-16 md:text-end mt-2 gap-1">
        <span className="text-base md:text-xl text-[#6636E2]">Status</span>
        <span className="text-sm md:text-xl text-[#6636E2]">{user.status}</span>
        <Link
          href="/account/settings"
          className="flex gap-1 items-center text-[#6636E2]"
        >
          <IoSettings className="text-[#6636E2] md:text-2xl xl:text-3xl" />
        </Link>
      </div>
    </div>
  );
}
