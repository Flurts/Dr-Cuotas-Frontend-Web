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
  ];

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="hidden space-y-6 p-10 md:block w-full max-w-screen-xl">
          <Link href="/account">
            <IoChevronBack className="text-3xl text-[#6636E2] " />
          </Link>
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">
              {t('constants:settings')}
            </h2>
            <p className="text-muted-foreground">
              {t('constants:settingsDescription')}
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
