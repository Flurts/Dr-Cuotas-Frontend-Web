import { useTranslation } from 'next-i18next';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';

import { User } from '@/types';

export default function UserInfo({ user }: { user: User }) {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col md:flex-row justify-between items-start w-[78%] mb-10  gap-4 lg:gap-[550px]">
      <div className="flex flex-col lg:ml-14 text-start gap-1 h-full justify-center">
        <span className="text-lg lg:font-normal font-bold text-center md:text-left lg:text-xl text-[#6636E2]">
          {t('welcome')}
        </span>
        <span className="text-lg lg:text-xl text-center md:text-left text-[#9665FF]">
          {user.first_name + ' ' + user.last_name}
        </span>
        {user.phone_number && (
          <span className="flex gap-1 items-center mx-2">
            <FaWhatsapp className="text-[#25d366] text-2xl " />
            <span className="text-base text-[#9665FF]">
              {user.phone_number}
            </span>
          </span>
        )}
        {user.email && (
          <span className="flex gap-2 items-center mx-2">
            <MdOutlineEmail className="text-[#d93025] text-lg lg:text-2xl text-center md:text-left" />
            <span className="text-sm lg:text-base text-[#9665FF] text-center md:text-left">
              {user.email}
            </span>
          </span>
        )}
      </div>

      <div className="flex flex-col mx-20 lg:mx-10 text-end mt-2 mr-16">
        <span className="text-xl text-center md:text-left text-[#6636E2]">
          Status
        </span>
        <span className="text-sm lg:text-xl text-center md:text-left text-[#6636E2]">
          {user.status}
        </span>
        <span className="text-xl text-[#6636E2] text-center md:text-left">
          -
        </span>
      </div>
    </div>
  );
}
