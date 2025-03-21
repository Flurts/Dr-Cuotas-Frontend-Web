import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { IoChevronBack } from 'react-icons/io5';

import { SidebarNav } from '@/components/sidebar-nav';
import { Separator } from '@/components/ui/separator';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const { t } = useTranslation('constants');

  const sidebarNavItems = [
    {
      title: 'profile',
      href: '/account/settings',
    },
    {
      title: 'account',
      href: '/account/settings/account',
    },
    {
      title: 'Doctor',
      href: '/account/settings/doctor',
    },
  ];

  return (
    <>
      <div className="w-full h-full flex flex-col p-10 sm:p-20">
        <>
          <div className="w-full h-full">
            <>
              <div className="w-full hidden sm:flex flex-col">
                <h2 className="text-sm sm:text-2xl text-drcuotasTertiary-text font-bold uppercase leading-tight tracking-tight">
                  {t('constants:settings')}
                </h2>
                <p className="hidden lg:block text-base text-drcuotasTertiary-text leading-tight tracking-tight">
                  {t('constants:settingsDescription')}
                </p>
              </div>
            </>
            <Separator className="my-2" />
            <>
              <div className="flex flex-col">
                <aside className="w-full h-20 ">
                  <SidebarNav items={sidebarNavItems} />
                </aside>
                <div className="flex-1 w-full">{children}</div>
              </div>
            </>
          </div>
        </>
      </div>
    </>
  );
}
