'use client';

import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  children: JSX.Element;
  className?: string;
}

const MemoizedChildren = React.memo(function MemoizedChildren({
  children,
}: Props) {
  return (
    <Box sx={{ pb: '0px' }} position="relative">
      {children}
    </Box>
  );
});

const MainContent = ({ children }: Props) => {
  return (
    <Box
      sx={{
        mt: '0px',
        pb: '0px',
        minHeight: '80vh',
        width: '100%',
      }}
    >
      <MemoizedChildren>{children}</MemoizedChildren>
    </Box>
  );
};

function SimpleLayout({ children, className }: Props) {
  return (
    <>
      <div className={`${className}`}>
        <>
          <div className="w-full h-24  flex justify-center  items-center p-2 ">
            <>
              <div className="flex w-full items-center justify-center xl:px-20">
                <Link
                  href="/"
                  className="font-extrabold uppercase leading-tight tracking-wide text-xs w-auto"
                >
                  <Image
                    src="/images/logo/logo-1.svg"
                    alt="Logo"
                    width={110}
                    height={110}
                    className="w-40 h-full"
                  />
                </Link>
              </div>
            </>
          </div>
        </>

        <div className="flex flex-col items-center justify-center">
          <MainContent>{children}</MainContent>
        </div>
      </div>
    </>
  );
}

export default SimpleLayout;
