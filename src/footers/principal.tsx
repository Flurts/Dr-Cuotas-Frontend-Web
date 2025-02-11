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
      <FooterPrincipal />
    </>
  );
}

export default PrincipalFooter;
