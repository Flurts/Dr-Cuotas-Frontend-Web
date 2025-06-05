import { GetServerSideProps } from 'next';

import getServerSideSharedProps from '@/lib/next';
import RegisterView from '@/views/register';

export default function Login() {
  return (
    <>
      <RegisterView />
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
