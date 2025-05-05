import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';

import SettingsLayout from '@/components/common/SettingsLayout';
import { Head } from '@/components/constants';
import getServerSideSharedProps from '@/lib/next';
import DoctorSettingView from '@/views/account/settings/DoctorSettingView';

export default function SettingsAccount() {
  const { t } = useTranslation('constants');

  return (
    <>
      <Head title={t('constants:settings')} />
      <SettingsLayout>
        <DoctorSettingView />
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
