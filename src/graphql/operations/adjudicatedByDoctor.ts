import { useEffect, useState } from 'react';

import settings from '@/settings';

// Definir la estructura de los datos esperados
interface AdjudicatedDoctor {
  adjudicated_status: string;
  user: {
    first_name: string;
    id: string;
  };
  surgery: {
    category: string;
    subcategory: string;
    amount: number;
  };
}

export function useAdjudicatedByDoctor(status: string) {
  const [doctors, setDoctors] = useState<AdjudicatedDoctor[]>([]);

  useEffect(() => {
    const getAdjudicatedByDoctor = async () => {
      const query = `
        query GetAdjudicatedByDoctor($status: Adjudicated_Status!) {
          getAdjudicatedByDoctor(status: $status) {
            adjudicated_status
            user {
              first_name
              id
            }
            surgery {
              category
              subcategory
              amount
            }
          }
        }
      `;

      const token = localStorage.getItem('accessToken');

      try {
        const response = await fetch(`${settings.API_URL}/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
          body: JSON.stringify({ query, variables: { status } }),
        });

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data = await response.json();
        if (data.errors)
          throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);

        setDoctors(data.data.getAdjudicatedByDoctor || []);
      } catch (error) {
        console.error('Error al obtener los doctores adjudicados:', error);
      }
    };

    void getAdjudicatedByDoctor();
  }, [status]);

  return doctors;
}
