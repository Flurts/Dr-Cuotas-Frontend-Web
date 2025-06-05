/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import settings from '@/settings';

interface Evidence {
  type: 'YOUTUBE' | 'MEDIA';
  link: string;
  image: string;
}

export const EvidenceCard = () => {
  const router = useRouter();
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const [evidences, setEvidences] = useState<Evidence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extraemos doctorId correctamente
  useEffect(() => {
    if (router.isReady) {
      const idFromQuery = router.query.doctorId as string;
      if (idFromQuery) {
        setDoctorId(idFromQuery);
      } else {
        // Alternativa: Extraer ID desde asPath si query no funciona
        const pathParts = router.asPath.split('/');
        const idIndex = pathParts.indexOf('doctor') + 1;
        if (idIndex > 0) {
          setDoctorId(pathParts[idIndex]);
        }
      }
    }
  }, [router.isReady, router.query]);

  console.log('Doctor ID:', doctorId);

  useEffect(() => {
    if (!doctorId) return;

    const fetchEvidences = async () => {
      try {
        console.log('Fetching evidences for doctor:', doctorId);

        const response = await fetch(`${settings.API_URL}/graphql`, {
          method: 'POST', // Cambio crítico: POST en lugar de GET
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query EvidencesByDoctor($doctorId: String!) {
                evidencesByDoctor(doctorId: $doctorId) {
                  type
                  link
                  image
                }
              }
            `,
            variables: { doctorId },
          }),
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('GraphQL result:', result);

        if (result.errors) {
          console.error('GraphQL errors:', result.errors);
          throw new Error(result.errors[0].message);
        }

        if (result.data?.evidencesByDoctor) {
          setEvidences(result.data.evidencesByDoctor);
          console.log('Evidences loaded:', result.data.evidencesByDoctor);
        } else {
          console.warn('No evidences found in response');
          setEvidences([]);
        }
      } catch (err: any) {
        console.error('Error fetching evidences:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    void fetchEvidences();
  }, [doctorId]);

  if (!doctorId)
    return <p className="text-center text-gray-500">Cargando doctor...</p>;
  if (loading)
    return <p className="text-center text-gray-500">Cargando evidencias...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  if (evidences.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No se encontraron evidencias para este doctor.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-96 lg:grid-cols-4 gap-6 ">
      {evidences.map((evidence, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <a
            href={evidence.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline block mt-2"
          >
            <img
              src={evidence.image}
              alt="Evidencia"
              className="w-full h-72 object-cover rounded-xl "
            />
          </a>
          <div className="p-4">
            <p className="text-sm font-semibold text-gray-700">
              {evidence.type === 'YOUTUBE' ? 'Video de YouTube' : 'Media'}
            </p>
            <a
              href={evidence.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-drcuotasPrimary hover:underline block mt-2"
            >
              Ver evidencia
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EvidenceCard;
