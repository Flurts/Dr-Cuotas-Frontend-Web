import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function SubscribeComponent() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-2 py-16">
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <p className="text-[#8576FF] text-[14px] font-bold">Newsletter</p>
          <p className="text-[#252B42] text-[40px] font-bold">Suscribite</p>
          <p className="text-[#737373] max-w-[80vh] text-center ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="flex w-full h-40 max-w-2xl items-center space-x-2 ">
          <Input
            className="h-12"
            type="email"
            placeholder="Correo electronico"
          />
          <Button type="submit" className="bg-[#8576FF] h-12">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SubscribeComponent;
