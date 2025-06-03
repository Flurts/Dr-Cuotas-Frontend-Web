/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Head } from '@/components/constants';
import getServerSideSharedProps from '@/lib/next';
import { getJwt } from '@/store';
import { Doctor, Gender, Role, Status, useGetDoctorLazyQuery } from '@/types';
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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Datos de ejemplo para usar mientras carga o no hay data real
  const exampleDoctor: Doctor = {
    id: 'doc-123456',
    user: {
      id: 'user-78910',
      first_name: 'Juan',
      last_name: 'Pérez',
      email: 'juan.perez@hospital.com',
      profile_picture: '/images/elements/doctor.svg',
      created_at: new Date('2022-01-15T08:00:00Z'),
      updated_at: new Date('2024-12-10T10:30:00Z'),
      password: '', // Puedes dejarla vacía o enmascarada si no se usa
      status: Status.Active,
      gender: Gender.Male, // or 'female', or whatever type is expected
      role: Role.Doctor, // or the appropriate role string or enum value
    },
    doctor: undefined,
    adjudicateds: [],
    status: Status.Active,
  };

  const responseData = data?.getDoctor ?? { doctor: exampleDoctor };

  return (
    <>
      <Head title={`Dr. ${responseData.doctor?.user?.first_name}`} />
      <DoctorView doctor={responseData.doctor as Doctor} />
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
