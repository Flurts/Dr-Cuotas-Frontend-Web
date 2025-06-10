import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import { Head } from '@/components/constants';
import getServerSideSharedProps from '@/lib/next';
import { useGetSurgerieByIdQuery } from '@/types';
import SlugProductView from '@/views/quotas/slugProduct';

export default function ProductId() {
  const router = useRouter();

  const { slug } = router.query;

  const { loading, error } = useGetSurgerieByIdQuery({
    variables: { getSurgerieByIdId: slug as string },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Head title="Store" />
      <SlugProductView />
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
