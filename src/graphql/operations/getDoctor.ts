/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import settings from '@/settings';

// Definir la estructura de los datos esperados
interface Doctor {
  doctor: {
    user: {
      ratings: Array<{
        rating: number;
      }>;
    };
    surgeries: Array<{
      id: string;
    }>;
    description: string;
    provincia: string;
    country: string;
  };
}

export default function useDoctorDetails() {
  const router = useRouter();
  const [doctorData, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [doctorId, setDoctorId] = useState<string | null>(null);

  // Primer useEffect: extraer el doctorId de la URL
  useEffect(() => {
    if (router.isReady) {
      const idFromQuery = router.query.doctorId as string;
      if (idFromQuery) {
        setDoctorId(idFromQuery);
      } else {
        // Alternativa: Extraer ID desde asPath si query no funciona
        const pathParts = router.asPath.split('/');
        const idIndex = pathParts.indexOf('doctor') + 1;
        if (idIndex > 0 && idIndex < pathParts.length) {
          setDoctorId(pathParts[idIndex]);
        }
      }
    }
  }, [router.isReady, router.query, router.asPath]);

  // Segundo useEffect: cargar los datos del doctor cuando tengamos el ID
  useEffect(() => {
    if (!doctorId) return;

    const getDoctorDetails = async () => {
      const query = `
          query GetDoctor($doctorId: String!) {
            getDoctor(doctorId: $doctorId) {
              doctor {
                user {
                  ratings {
                    rating
                  }
                }
                surgeries {
                  id
                }
                description
                provincia
                country
              }
            }
          }
        `;

      let token;
      try {
        token = localStorage.getItem('accessToken');
      } catch (e) {
        console.error('Error accessing localStorage:', e);
      }

      try {
        const response = await fetch(`${settings.API_URL}/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
          body: JSON.stringify({ query, variables: { doctorId } }),
        });

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data = await response.json();
        if (data.errors)
          throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);

        setDoctor(data.data.getDoctor || null);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
        setError('Error al obtener los detalles del doctor');
      } finally {
        setLoading(false);
      }
    };

    getDoctorDetails();
  }, [doctorId]);

  return { doctorData, loading, error, doctorId }; // Añadido doctorId aquí
}

export async function rateDoctor(doctorId: string) {
  console.log('Doctor ID:', doctorId); // Añadido para depuración
  if (!doctorId) {
    console.error('ID de doctor no disponible');
    return false;
  }

  const mutation = `
     mutation Mutation($doctorId: String!) {
  ratingDoctor(doctorId: $doctorId)
}
    `;

  let token;
  try {
    token = localStorage.getItem('accessToken');
  } catch (e) {
    console.error('Error accessing localStorage:', e);
    return false;
  }

  try {
    const response = await fetch(`${settings.API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `${token}` : '',
      },
      body: JSON.stringify({
        query: mutation,
        variables: { doctorId },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0]?.message || 'Error al calificar');
    }

    return result.data.ratingDoctor.success;
  } catch (err) {
    console.error('Error al calificar doctor:', err);
    return false;
  }
}
