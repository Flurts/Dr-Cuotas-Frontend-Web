import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';

import currencyFormatter from '@/utils/currencyFormatter';

export default function StoreCardSurgery({
  surgery,
}: {
  surgery: {
    id: string;
    name: string;
    amount: number;
    discount: number;
    file_banner: {
      file_link: string;
    };
  };
}) {
  const { t } = useTranslation('constants');

  return (
    <>
      <div className="w-full h-72 flex flex-col justify-center items-center  rounded-xl shadow-xl hover:shadow-xl hover:shadow-[#B398F5] border hover:border-[#6636E2] p-2 hover:scale-105 transition-all duration-300 bg-white">
        <div className="w-full h-full overflow-hidden flex justify-center items-center">
          <Image
            src={
              surgery.file_banner.file_link ??
              '/images/banners/bannerMobile.svg'
            }
            alt={surgery.name}
            width={200}
            height={150}
            className="object-cover w-full h-full rounded-xl border "
          />
        </div>

        <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
          <span className="w-full text-[#6636E2] font-bold text-lg text-center truncate">
            {surgery.name}
          </span>
          <div className="w-full flex flex-col items-center justify-center">
            <span className="text-[#6636E2] text-base">{t('quotasFrom')}</span>
            <span className="text-green-500 text-center font-bold text-2xl truncate">
              {currencyFormatter(surgery.amount / 10 ?? 0)}
            </span>
            {surgery.discount && (
              <span className="text-gray-700 text-xs">
                u$s {currencyFormatter(surgery.discount / 10 ?? 0)}
              </span>
            )}
          </div>
          <Link
            className="w-32 h-8 flex justify-center items-center rounded-full  text-base font-semibold text-center  text-white bg-[#6636E2] "
            href={`/store/${surgery.id}`}
          >
            <span className="">{t('viewPlan')}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
