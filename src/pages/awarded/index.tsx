import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';

import { Head } from '@/components/constants';
import getServerSideSharedProps from '@/lib/next';
import AwardedView from '@/views/awarded';

export default function Awarded() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head title={t('adjudicated')} />
      <AwardedView />
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
