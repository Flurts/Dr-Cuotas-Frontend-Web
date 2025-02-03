import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Head } from '@/components/constants';
import getServerSideSharedProps from '@/lib/next';
import { getJwt } from '@/store';
import { Doctor, File_Db, useGetDoctorLazyQuery } from '@/types';
import { DoctorView } from '@/views/doctor-view';

export default function OurProfessionals() {
  const router = useRouter();
  const { slug } = router.query;
  const jwt = useSelector(getJwt);
  const [getDoctor, { data, error }] = useGetDoctorLazyQuery();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      getDoctor({
        variables: { doctorId: slug as string },
      })
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [slug, jwt, getDoctor]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data?.getDoctor || !data.getDoctor.status) {
    return <div>No doctor found.</div>;
  }

  const responseData = data.getDoctor;

  return (
    <>
      <Head title={`Dr.${responseData.doctor?.user?.first_name}`} />
      <DoctorView
        doctor={responseData.doctor as Doctor}
        curriculum={responseData.curriculum as File_Db}
      />
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
