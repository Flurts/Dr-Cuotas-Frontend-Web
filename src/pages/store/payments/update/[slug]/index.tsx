import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import { Head } from '@/components/constants';
import getServerSideSharedProps from '@/lib/next';
import { Adjudicated, useGetAdjudicatedByIdQuery } from '@/types';
import PaymentForm from '@/views/store/update/PaymentForm';

export default function UpdateAdjudicatePayment() {
  const router = useRouter();
  const { slug } = router.query;

  const { data, loading, error } = useGetAdjudicatedByIdQuery({
    variables: { adjudicatedId: slug as string },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const adjudicated = data?.getAdjudicatedById;

  return (
    <>
      <Head title="Update Adjudicate Payment" />
      <PaymentForm adjudicated={adjudicated as Adjudicated} />
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
