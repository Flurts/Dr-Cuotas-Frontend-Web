/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { useEffect, useState } from 'react';

import ActivateSurgeryCard from '@/components/common/Cards/ActivateSurgeryCard';
import settings from '@/settings';

// Definir la estructura de los datos esperados
interface Surgery {
  name: string;
  description: string;
  amount: number;
  status: string;
}

// Definir las props que acepta el componente
interface SurgeryByStatusProps {
  status: string;
}

export function SurgeryByStatus({ status }: SurgeryByStatusProps) {
  const [surgery, setSurgery] = useState<Surgery[]>([]);

  useEffect(() => {
    const getSurgeryByStatus = async () => {
      console.log(`Fetching surgeries with status: ${status}`);

      const query = `
        query GetSurgeryStatus($status: String!) {
          getSurgeryStatus(status: $status) {
            name
            description
            amount
            status
          }
        }
      `;

      try {
        const response = await fetch(`${settings.API_URL}/graphql`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, variables: { status } }),
        });

        console.log('Response status:', response.status);

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data = await response.json();
        console.log('GraphQL response data:', data);

        if (data.errors) {
          console.error('GraphQL Errors:', JSON.stringify(data.errors));
          throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);
        }

        setSurgery(data.data.getSurgeryStatus || []);
        console.log('Surgeries set to state:', data.data.getSurgeryStatus);
      } catch (error) {
        console.error('Error al obtener las cirugías:', error);
      }
    };

    void getSurgeryByStatus();
  }, [status]);

  return (
    <div className="flex flex-wrap gap-10 justify-center items-center">
      {surgery.length > 0 ? (
        surgery.map((surg, index) => (
          <ActivateSurgeryCard
            key={index}
            firstName={surg.name}
            lastName={surg.description}
            status={surg.status}
          />
        ))
      ) : (
        <p>No hay cirugías disponibles</p>
      )}
    </div>
  );
}
