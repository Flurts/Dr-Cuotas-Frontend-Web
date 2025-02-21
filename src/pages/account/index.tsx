import { GetServerSideProps } from 'next';

import { Head } from '@/components/constants';
import getServerSideSharedProps from '@/lib/next';
import AccountView from '@/views/account';
import DoctorView from '@/views/account/doctor/DoctorView';

export default function Account() {
  return (
    <>
      <Head title="Account" />
      <div className="w-full h-96 border  ">
        <AccountView />
      </div>
      <DoctorView />
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
