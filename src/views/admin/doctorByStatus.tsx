import { useEffect, useState } from 'react';

import ActivateSurgeryCard from '@/components/common/Cards/ActivateSurgeryCard';
import settings from '@/settings';

// Definir la estructura de los datos esperados
interface Doctor {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    status: string;
  };
}

// Definir las props que acepta el componente
interface DoctorByStatusProps {
  status: string;
}

export function DoctorByStatus({ status }: DoctorByStatusProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const getDoctorByStatus = async () => {
      const query = `
        query GetDoctorByStatus($status: String!) {
          getDoctorByStatus(status: $status) {
            id
            user {
              first_name
              last_name
              status
            }
          }
        }
      `;

      try {
        const response = await fetch(`${settings.API_URL}/graphql`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, variables: { status } }),
        });

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data = await response.json();
        if (data.errors)
          throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);

        setDoctors(data.data.getDoctorByStatus || []);
      } catch (error) {
        console.error('Error al obtener los doctores:', error);
      }
    };

    void getDoctorByStatus();
  }, [status]);

  const updateDoctorStatus = async (doctorId: string, newStatus: string) => {
    const token = localStorage.getItem('accessToken');
    console.log(doctorId, newStatus);
    const mutation = `
      mutation UpdateInfoDoctor($doctorId: String!, $status: String!) {
        updateInfoDoctor(doctorId: $doctorId, status: $status) {
          user {
            first_name
            last_name
          }
        }
      }
    `;

    try {
      const response = await fetch(`${settings.API_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          query: mutation,
          variables: { doctorId, status: newStatus },
        }),
      });

      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      const data = await response.json();
      if (data.errors)
        throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);

      // Actualizar la lista de doctores después de la mutación
      setDoctors((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor.user.id !== doctorId),
      );
    } catch (error) {
      console.error('Error al actualizar el estado del doctor:', error);
    }
  };

  return (
    <div className="flex flex-wrap gap-10 justify-start items-start overflow-auto">
      {doctors.length > 0 ? (
        doctors.map((doctor) => {
          if (!doctor.user?.id) {
            console.warn('⚠️ Doctor sin ID detectado:', doctor);
            return null;
          }

          return (
            <ActivateSurgeryCard
              key={doctor.user.id}
              id={doctor.user.id}
              firstName={doctor.user.first_name}
              lastName={doctor.user.last_name}
              status={doctor.user.status}
              onUpdateStatus={updateDoctorStatus}
            />
          );
        })
      ) : (
        <p>No hay doctores disponibles</p>
      )}
    </div>
  );
}
