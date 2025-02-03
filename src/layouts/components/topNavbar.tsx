import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';

function TopNavbar() {
  const links = [
    {
      text: 'questionsFrequent',
      href: '/faq',
    },
    {
      text: 'conditionsGeneral',
      href: '/terms',
    },
  ];

  const { t } = useTranslation('common');

  return (
    <>
      <div className="flex w-full h-full justify-center lg:justify-start gap-2">
        {links.map((link, index) => (
          <Link key={index} href={link.href}>
            <span className="text-[#737373] font-semibold md:text-sm text-xs  cursor-pointer">
              {t(`${link.text}`)}
            </span>
            {index < links.length - 1 && (
              <span className="text-[#737373] text-xs m-2">|</span>
            )}
          </Link>
        ))}
      </div>
    </>
  );
}

export default TopNavbar;
