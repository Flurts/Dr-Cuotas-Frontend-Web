import { GetServerSideProps } from 'next';

import { Head } from '@/components/constants';
import getServerSideSharedProps from '@/lib/next';
import AccountView from '@/views/account';
import DoctorView from '@/views/account/doctor/DoctorView';

export default function Account() {
  return (
    <>
      <Head title="Account" />
      <div
        className="w-full h-auto bg-[#E5F9F7]  relative bg-cover bg-center "
        style={{ backgroundImage: "url('/images/fondo/DrCuotasFondo.svg')" }}
      >
        <div className="absolute inset-0 bg-[#E5F9F7] bg-opacity-0"></div>
        <div className="relative">
          <AccountView />
        </div>
      </div>
      {/* <DoctorView /> */}
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
