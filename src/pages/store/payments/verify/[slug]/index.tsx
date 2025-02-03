import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

import { Head } from '@/components/constants';
import getServerSideSharedProps from '@/lib/next';
import { isLoggedIn } from '@/store';
import { Surgery, useGetSurgerieByIdQuery } from '@/types';
import SlugProductView from '@/views/store/slugProduct';

export default function ProductId() {
  const router = useRouter();
  const isLogged = useSelector(isLoggedIn);
  const { slug } = router.query;

  const { data, loading, error } = useGetSurgerieByIdQuery({
    variables: { getSurgerieByIdId: slug as string },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const product = data?.getSurgerieById;

  return (
    <>
      <Head title="Store" />
      <SlugProductView isLogged={isLogged} item={product as Surgery} />
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
