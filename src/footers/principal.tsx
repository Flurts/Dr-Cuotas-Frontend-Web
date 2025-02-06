'use client';

import * as React from 'react';

import FooterPrincipal from './components';

interface Props {
  children: JSX.Element;
}

function PrincipalFooter({ children }: Props) {
  return (
    <>
      {children}
      <div className="w-full h-80 lg:h-40 flex justify-center items-center lg:p-20">
        <FooterPrincipal />
      </div>
    </>
  );
}

export default PrincipalFooter;
