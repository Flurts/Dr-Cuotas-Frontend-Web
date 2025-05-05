import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import TitleElements from './TitleElements';

function SubscribeComponent() {
  return (
    <div className="w-full h-full hidden lg:flex flex-col items-center justify-center p-20 ">
      <>
        <TitleElements
          primaryText="Mantente informado"
          secondaryText="Suscríbete ahora"
          descriptionText=""
        />
      </>
      <>
        <div className="flex w-full h-auto max-w-2xl items-center gap-2">
          <Input
            className="h-16 leading-tight tracking-wide  rounded-xl shadow-md"
            type="email"
            placeholder="Correo electronico"
          />
          <Button
            type="submit"
            className="bg-[#8576FF] h-16 w-48 leading-tight tracking-wide rounded-xl shadow-md"
          >
            Subscribe
          </Button>
        </div>
      </>
    </div>
  );
}

export default SubscribeComponent;
