import { GetServerSideProps } from 'next';

import { Head } from '@/components/constants';
import getServerSideSharedProps from '@/lib/next';
import LoginView from '@/views/login';

export default function Login() {
  return (
    <>
      <Head title="Hola!" />
      <LoginView />
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
