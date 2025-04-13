/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { useEffect, useState } from 'react';

import ActivateSurgeryCard from '@/components/common/Cards/ActivateSurgeryCard';
import settings from '@/settings';

// Definir la estructura de los datos esperados
interface Surgery {
  id: string;
  name: string;
  description: string;
  amount: number;
  status: string;
  doctors: Array<{
    doctor: {
      user: {
        first_name: string;
      };
    };
  }>; // <- esto es lo que cambia
}
// Definir las props que acepta el componente
interface SurgeryByStatusProps {
  status: string;
}

export function SurgeryByStatus({ status }: SurgeryByStatusProps) {
  const [surgery, setSurgery] = useState<Surgery[]>([]);

  useEffect(() => {
    const getSurgeryByStatus = async () => {
      const query = `
        query GetSurgeryStatus($status: String!) {
          getSurgeryStatus(status: $status) {
            id
            name
            description
            amount
            status
            doctors {
      doctor {
        user {
          first_name
        }
      }
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

        setSurgery(data.data.getSurgeryStatus || []);
      } catch (error) {
        console.error('Error al obtener las cirugías:', error);
      }
    };

    void getSurgeryByStatus();
  }, [status]);

  const updateSurgeryStatus = async (surgeryId: string, newStatus: string) => {
    const token = localStorage.getItem('accessToken');
    const mutation = `
      mutation UpdateSurgerie($status: String!, $surgeryId: String!) {
        updateSurgerie(status: $status, surgeryId: $surgeryId)
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
          variables: { surgeryId, status: newStatus },
        }),
      });

      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      const data = await response.json();
      if (data.errors)
        throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);

      setSurgery((prevSurgeries) =>
        prevSurgeries.filter((surg) => surg.id !== surgeryId),
      );
    } catch (error) {
      console.error('Error al actualizar el estado de la cirugía:', error);
    }
  };

  return (
    <div className="flex flex-wrap gap-10 justify-start items-start overflow-auto">
      {surgery.length > 0 ? (
        surgery.map((surg) => (
          <ActivateSurgeryCard
            key={surg.id}
            id={surg.id}
            firstName={surg.name}
            lastName={surg.doctors[0]?.doctor.user.first_name ?? 'Sin doctor'}
            descripción={surg.description}
            status={surg.status}
            onUpdateStatus={updateSurgeryStatus}
            type="surgery"
          />
        ))
      ) : (
        <p>No hay cirugías disponibles</p>
      )}
    </div>
  );
}
