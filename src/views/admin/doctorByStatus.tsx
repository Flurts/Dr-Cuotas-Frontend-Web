import { useEffect, useState } from 'react';

import ActivateSurgeryCard from '@/components/common/Cards/ActivateSurgeryCard';
import settings from '@/settings';

// Definir la estructura de los datos esperados
interface Doctor {
  id: string;
  status: string;
  description: string;
  user: {
    first_name: string;
    last_name: string;
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
    description
    status
    user {
      first_name
      last_name
    }
    id
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
        prevDoctors.filter((doctor) => doctor.id !== doctorId),
      );
    } catch (error) {
      console.error('Error al actualizar el estado del doctor:', error);
    }
  };

  return (
    <div className="flex flex-wrap gap-10 justify-start items-start overflow-auto">
      {doctors.length > 0 ? (
        doctors.map((doctor) => {
          console.log('Doctor:', doctor);
          return doctor.id ? (
            <ActivateSurgeryCard
              key={doctor.id}
              id={doctor.id}
              firstName={doctor.user.first_name}
              lastName={doctor.user.last_name}
              descripción={doctor.description}
              status={doctor.status} // <-- Verifica que doctor.status existe
              type="doctor"
              onUpdateStatus={updateDoctorStatus}
            />
          ) : null;
        })
      ) : (
        <p>No hay doctores disponibles</p>
      )}
    </div>
  );
}
