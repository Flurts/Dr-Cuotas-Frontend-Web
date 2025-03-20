import { GetServerSideProps } from 'next';

import { Head } from '@/components/constants';
import getServerSideSharedProps from '@/lib/next';
import ProfessionalView from '@/views/professional';
import OurProfessionals from '@/components/common/ViewElements/OurProfessionals';

export default function Professionals() {
  return (
    <>
      <Head title="Unete!" />
      <div className="w-full h-full">
        <ProfessionalView />

        {/* <OurProfessionals /> */}
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
