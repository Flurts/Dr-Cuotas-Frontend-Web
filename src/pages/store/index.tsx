import { GetServerSideProps } from 'next';

import { Head } from '@/components/constants';
import getServerSideSharedProps from '@/lib/next';
import StoreView from '@/views/store';

export default function Store() {
  return (
    <>
      <Head title="Tienda!" />
      <StoreView />
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
