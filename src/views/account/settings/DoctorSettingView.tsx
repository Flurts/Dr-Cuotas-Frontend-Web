import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSelector } from 'react-redux';

import { Separator } from '@/components/ui/separator';
import { getCurrentUser, getJwt } from '@/store';
import { useCreateNewDoctorMutation } from '@/types';
import FaqView from '@/views/faq';

export default function DoctorSettingView() {
  const { t } = useTranslation(['common', 'form']);
  const user = useSelector(getCurrentUser);

  const jwt = useSelector(getJwt);
  const [CreateNewDoctor] = useCreateNewDoctorMutation();

  const handleDoctor = async () => {
    try {
      await CreateNewDoctor({
        context: {
          headers: {
            Authorization: jwt,
          },
        },
      });
    } catch (error) {
      console.error('Error creating doctor:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full h-screen">
        <Separator className="my-4" />
        <>
          <div className="w-full border rounded-xl p-10 ">
            <>
              <div className="mb-10">
                <h2 className="text-base font-semibold text-drcuotasTertiary-text leading-tight tracking-tight">
                  Unete a Dr.Cuotas
                </h2>
                <p className="text-sm  text-drcuotasTertiary-text leading-tight tracking-tight">
                  Envía una solicitud a nuestros administradores solo si ya has
                  establecido contacto previamente.
                </p>
              </div>
            </>
            <>
              <button
                onClick={handleDoctor}
                className="w-full h-14 border rounded-xl border-drcuotasPrimary-bg text-white bg-drcuotasPrimary-bg   uppercase leading-tight tracking-tight"
              >
                ¿Te gustaría unirte a nuestro equipo?
              </button>
            </>
          </div>
        </>
        <>
          <FaqView />
        </>
      </div>
    </>
  );
}
