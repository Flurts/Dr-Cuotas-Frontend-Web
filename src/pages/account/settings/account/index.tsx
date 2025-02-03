import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';

import SettingsLayout from '@/components/common/SettingsLayout';
import { Head } from '@/components/constants';
import getServerSideSharedProps from '@/lib/next';
import AccountSettingsView from '@/views/account/settings/AccountSettingsView';

export default function SettingsAccount() {
  const { t } = useTranslation('constants');
  return (
    <>
      <Head title={t('constants:settings')} />
      <SettingsLayout>
        <AccountSettingsView />
      </SettingsLayout>
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
