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
    <div className="w-full h-80 lg:h-full flex flex-col  gap-8 justify-center items-center">
      <>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <>
            <span className="text-lg sm:text-2xl lg:text-4xl  text-drcuotasPrimary-text leading-tight tracking-wide uppercase font-black">
              {t('welcome')}
            </span>
          </>
          <>
            <span className="text-sm md:text-lg xl:text-2xl text-drcuotasPrimary-text leading-tight tracking-wide">
              {user.first_name + ' ' + user.last_name}
            </span>
          </>
          {user.phone_number && (
            <span className="flex gap-1 items-center mx-2">
              <FaWhatsapp className="text-[#25d366] md:text-lg xl:text-2xl" />
              <span className="md:text-xs xl:text-lg text-drcuotasPrimary-text leading-tight tracking-wide">
                {user.phone_number}
              </span>
            </span>
          )}
          {user.email && (
            <span className="hidden gap-2 items-center justify-center w-full h-full">
              <MdOutlineEmail className="text-drcuotasPrimary text-xl" />
              <span className="text-sm  text-drcuotasPrimary-text leading-tight tracking-wide">
                {user.email}
              </span>
            </span>
          )}
        </div>
      </>
      <>
        <div className="flex flex-col w-full justify-center md:w-1/3 items-center gap-4">
          <CustomImageUploader
            width={120}
            height={120}
            imageUrl={user.profile_picture ?? undefined}
            onChange={handleChange}
          />

          <span className="hidden text-sm text-drcuotasPrimary-text w-full text-center leading-tight tracking-wide">
            {t('memberOfSince', {
              date: new Date(user.created_at).toLocaleDateString(),
            })}
          </span>
        </div>
      </>
      <>
        <div className="flex flex-col w-full justify-center items-center ">
          <span className="text-sm hidden text-drcuotasPrimary-text">
            Status
          </span>
          <span className="text-sm hidden text-drcuotasPrimary-text">
            {user.status}
          </span>
          <Link href="/account/settings" className="flex gap-1 items-center ">
            <IoSettings className="text-drcuotasPrimary-text md:text-2xl xl:text-3xl" />
          </Link>
        </div>
      </>
    </div>
  );
}
