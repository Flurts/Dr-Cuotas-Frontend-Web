import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

import { Head } from '@/components/constants';
import getServerSideSharedProps from '@/lib/next';
import AccountView from '@/views/account';
import DoctorView from '@/views/account/doctor/DoctorView';

export default function Account() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role'); // Obtener el rol del localStorage
    setRole(storedRole);
  }, []);

  return (
    <>
      <Head title="Account" />
      <div
        className="w-full h-auto bg-[#E5F9F7] relative bg-cover bg-center"
        style={{ backgroundImage: "url('/images/fondo/DrCuotasFondo.svg')" }}
      >
        <div className="absolute inset-0 bg-white"></div>
        <div className="relative">
          {role === 'Doctor' ? <DoctorView /> : <AccountView />}
        </div>
      </div>
      ``
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await getServerSideSharedProps(ctx)),
    },
  };
};
