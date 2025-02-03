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
        <div>
          {/* <TopNavbar /> */}
          <div className="flex justify-center items-center w-full p-4 ">
            <div className="flex flex-row justify-center   w-full max-w-screen-2xl mx-[10rem]">
              <Link
                href="/"
                className="w-screen flex items-center justify-center mb-2 mt-2"
              >
                <Image
                  src="/images/logo/logo-1.svg"
                  alt="Logo"
                  width={200}
                  height={200}
                  className="w-60  flex justify-center items-center"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <MainContent>{children}</MainContent>
        </div>
      </div>
    </>
  );
}

export default SimpleLayout;
