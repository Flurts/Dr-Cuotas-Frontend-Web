import Link from 'next/link';
import React from 'react';
import { FiPhone } from 'react-icons/fi';
import { MdEmail } from 'react-icons/md';
import { PiMapPinBold } from 'react-icons/pi';

import SocialMedia from '@/components/common/socialMedia';

function FooterPrincipal() {
  return (
    <div className="w-full h-full  flex flex-col justify-between items-center ">
      <>
        <div className="w-[160vh] h-full flex flex-row justify-center items-center ">
          <>
            <div className="w-[80vh] min-h-40 gap-2 flex flex-col text-drcuotasTertiary-text font-bold ">
              <h1 className="text-drcuotasSecondary-text">Company Info</h1>
              <Link href="/faq">Nosotros</Link>
              <Link href="/faq">Preguntas frecuentes</Link>
              <Link href="/payment-methods">Medios de pago</Link>
            </div>
          </>

          <>
            <div className="w-full min-h-40 gap-2 flex flex-col text-drcuotasTertiary-text font-bold ">
              <h1 className="text-drcuotasSecondary-text">Legal</h1>
              <Link href="/">Terminos y condiciones</Link>
            </div>
          </>

          <>
            <div className="w-[80vh] min-h-40 gap-2 flex flex-col  text-drcuotasPrimary font-bold ">
              <h1 className="text-drcuotasSecondary-text">Contacto</h1>
              <Link href="" className="w-full flex flex-row  items-center">
                <FiPhone />
                (111) 111-11111
              </Link>
              <Link href="" className="w-full flex flex-row items-center">
                <PiMapPinBold />
                Lorem Ipsum Dolor Sit Amet 1111.
              </Link>
              <Link href="" className="w-full flex flex-row items-center">
                <MdEmail />
                contacto@gmail.com
              </Link>
            </div>
          </>
        </div>
      </>

      <>
        <div className="w-full min-h-16 flex justify-center items-center ">
          <h1 className="w-full text-center text-drcuotasTertiary-text">
            Derechos reservados
          </h1>
          <div className="w-full h-full flex justify-center items-center ">
            <SocialMedia />
          </div>
        </div>
      </>
    </div>
  );
}

export default FooterPrincipal;
