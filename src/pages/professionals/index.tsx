import { GetServerSideProps } from 'next';

import { Head } from '@/components/constants';
import getServerSideSharedProps from '@/lib/next';
import ProfessionalView from '@/views/professional';

export default function Professionals() {
  return (
    <>
      <Head title="Unete!" />
      <div className="w-full h-60 lg:h-screen">
        <ProfessionalView />
      </div>
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
