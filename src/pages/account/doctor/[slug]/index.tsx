import { GetServerSideProps } from 'next';
import React from 'react';
import { useSelector } from 'react-redux';

import { Head } from '@/components/constants';
import getServerSideSharedProps from '@/lib/next';
import { getCurrentUser } from '@/store';
import DoctorView from '@/views/account/doctor/DoctorView';

export default function ProductId() {
  const user = useSelector(getCurrentUser);

  return (
    <>
      <Head title={`Dr. ${user.first_name}`} />
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
