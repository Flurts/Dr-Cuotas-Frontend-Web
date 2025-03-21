'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'next-i18next';

import { cn } from '@/lib/utils';

import { Button } from './ui/button';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: Array<{
    href: string;
    title: string;
  }>;
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const { t } = useTranslation('common');
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'flex flex-row justify-center items-center gap-2',
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            <Button variant="ghost" />,
            pathname === item.href
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline',
            'flex  items-center border text-xs sm:text-base  uppercase text-drcuotasTertiary-text leading-tight tracking-tight  w-full h-14 text-left rounded-xl p-2 transition-colors duration-200 ease-in-out',
          )}
        >
          {t(`common:${item.title}`)}
        </Link>
      ))}
    </nav>
  );
}
