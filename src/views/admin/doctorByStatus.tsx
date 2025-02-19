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
  const [doctors, setDoctors] = useState<Doctor[]>([]); // Especificar el tipo

  useEffect(() => {
    const getDoctorByStatus = async () => {
      const query = `
        query GetDoctorByStatus($status: String!) {
          getDoctorByStatus(status: $status) {
            user {
              id
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
  }, [status]); // Se ejecutará cuando `status` cambie

  return (
    <div className="flex flex-wrap gap-10 justify-center items-center">
      {doctors.length > 0 ? (
        doctors.map((doctor) =>
          doctor.user ? (
            <ActivateSurgeryCard
              key={doctor.user.id}
              firstName={doctor.user.first_name}
              lastName={doctor.user.last_name}
              status={doctor.user.status}
            />
          ) : null,
        )
      ) : (
        <p>No hay doctores disponibles</p>
      )}
    </div>
  );
}
