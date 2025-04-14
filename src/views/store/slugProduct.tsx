import { gql, GraphQLClient } from 'graphql-request';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';

import settings from '@/settings';

// Define TypeScript interface for adjudicated data
interface AdjudicatedData {
  quota_price: number;
  quotas_number: number;
  surgery: {
    name: string;
    description: string;
  };
}

const GET_ADJUDICATED_BY_ID = gql`
  query GetAdjudicatedById($adjudicatedId: String!) {
    getAdjudicatedById(adjudicatedId: $adjudicatedId) {
      quota_price
      quotas_number
      surgery {
        name
        description
      }
    }
  }
`;

const CREATE_PAYMENT_MUTATION = gql`
  mutation CreatePaymentRequest($data: PaymentInput!) {
    createPaymentRequest(data: $data)
  }
`;

export default function ProductPage() {
  // Array de imágenes de ejemplo; reemplázalas por tus URLs reales
  const images = [
    '/images/surgerys/girl_chest.svg',
    '/images/elements/girl_footer.svg',
    '/images/surgerys/chest_body.svg',
    '/images/surgerys/girl_sculpture.svg',
  ];

  // Imagen seleccionada inicialmente (la primera del array)
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const router = useRouter();
  const { isReady, query } = router;
  const [adjudicatedData, setAdjudicatedData] =
    useState<AdjudicatedData | null>(null);

  console.log('adjudicatedData', adjudicatedData);

  const getDatePlusDays = (days: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0]; // devuelve 'yyyy-mm-dd'
  };
  useEffect(() => {
    if (!isReady || !query.adjudicatedId) return;

    const fetchAdjudicatedData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const client = new GraphQLClient(`${settings.API_URL}/graphql`, {
          headers: {
            Authorization: `${token}`, // Added 'Bearer' prefix
          },
        });

        const response = await client.request(GET_ADJUDICATED_BY_ID, {
          adjudicatedId: query.adjudicatedId,
        });

        // Type assertion for the response data
        const data = response as { getAdjudicatedById: AdjudicatedData };
        setAdjudicatedData(data.getAdjudicatedById);
      } catch (error) {
        console.error('Error fetching adjudicated data:', error);
      }
    };

    fetchAdjudicatedData();
  }, [isReady, query.adjudicatedId]);

  const createTransaction = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      void router.push('/login');
      console.error('No access token found');
      return;
    }

    console.log('📌 ID adjudicado enviado:', query.adjudicatedId);

    try {
      const response = await fetch(`${settings.API_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({
          query: `
            mutation CreateTransaction($adjudicatedId: String!) {
              createTransaction(adjudicatedId: $adjudicatedId) {
                AdjudicadosId
              }
            }
          `,
          variables: {
            adjudicatedId: query.adjudicatedId,
          },
        }),
      });

      const result = await response.json();
      console.log('📌 Respuesta completa de la API:', result);

      if (!response.ok || result.errors) {
        console.error('❌ GraphQL Error:', result.errors);
        throw new Error(result.errors?.[0]?.message || 'Error en la API');
      }

      if (!result.data?.createTransaction) {
        console.error('❌ Datos inválidos:', result);
        throw new Error('No se recibió ID de createTransaction');
      }

      const adjudicadosId = result.data.createTransaction.AdjudicadosId;
      console.log('✅ ID adjudicado:', adjudicadosId);
      alert('Transacción creada exitosamente.');
      return adjudicadosId;
    } catch (error) {
      console.error('🚨 Error en createTransaction:', error);
    }
  };

  const handlePayment = async () => {
    if (!query.adjudicatedId) {
      alert('El ID de adjudicación es inválido.');
      return;
    }

    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('No se encontró el token de autenticación.');
      return;
    }

    const client = new GraphQLClient(`${settings.API_URL}/graphql`, {
      headers: {
        Authorization: `${token}`, // Added 'Bearer' prefix
      },
    });

    if (!adjudicatedData) {
      alert('No se encontraron datos de la adjudicación.');
      return;
    }

    const variables = {
      data: {
        description: 'Pago de servicio',
        first_due_date: getDatePlusDays(2),
        first_total: adjudicatedData.quota_price,
        second_due_date: null,
        second_total: null,
        back_url_success: 'http://localhost:3000/account',
        back_url_pending: 'http://localhost:3000/',
        back_url_rejected: 'http://localhost:3000/',
        adjudicadosId: String(query.adjudicatedId), // Convertir a string
      },
    };

    try {
      const response = await client.request(CREATE_PAYMENT_MUTATION, variables);
      const paymentResponse = response as { createPaymentRequest: string };

      if (paymentResponse?.createPaymentRequest) {
        const checkoutUrl = paymentResponse.createPaymentRequest;
        console.log('✅ URL de pago:', checkoutUrl);

        if (checkoutUrl.startsWith('http')) {
          window.location.href = checkoutUrl;
        } else {
          alert('La URL de pago recibida no es válida.');
        }
      } else {
        alert('No se encontró la URL de pago.');
      }
    } catch (error) {
      console.error('❌ Error al crear el pago:', error);
      alert(
        'Hubo un error al procesar el pago. Revisa la consola para más detalles.',
      );
    }
  };

  return (
    <>
      <div className="w-full h-full flex flex-col p-4 mb-40">
        {/* Volver para atras */}
        <div className="w-full h-10 flex justify-start items-center p-4">
          <Link
            href="/account"
            className="w-auto h-auto flex flex-row justify-center items-center gap-2"
          >
            <FiChevronLeft className="text-drcuotasTertiary-text" />
            <span className="text-sm text-drcuotasTertiary-text uppercase leading-tight tracking-tight">
              Volver a mi cuenta
            </span>
          </Link>
        </div>

        {/* Información del Producto */}
        <div className="w-full h-full  flex flex-row justify-start  gap-4 p-4">
          {/* Área principal de imagen del producto */}
          <div className="bg-white border-2 w-full h-full flex justify-center items-center">
            <Image
              src={selectedImage}
              alt="Imagen del Producto"
              width={500}
              height={500}
              className="object-cover h-[30vw]"
            />
          </div>
          {/* Información del Producto */}
          <div className="bg-white border-2  w-[40vw] h-96 flex flex-col justify-start items-center gap-4 p-4">
            {/* Título del Producto */}
            <div className="w-full h-auto flex flex-col">
              <span className="text-2xl text-drcuotasPrimary-text uppercase leading-tight tracking-tight font-black">
                {adjudicatedData?.surgery.name ?? 'Nombre del Producto'}
              </span>
              <span className="text-sm text-drcuotasTertiary-text leading-tight tracking-tight">
                {adjudicatedData?.surgery.description ??
                  'Descripción del Producto'}
              </span>
            </div>
            {/* Precio del Producto */}
            <div className="w-full h-auto flex flex-row justify-start items-center gap-4">
              <span className="text-2xl text-drcuotasTertiary-text leading-tight tracking-tight">
                Cuotas de ${adjudicatedData?.quota_price ?? 200}
              </span>
              <span className="text-xs text-drcuotasTertiary-text leading-tight tracking-tight">
                ( Valor Total $
                {adjudicatedData
                  ? adjudicatedData.quota_price * adjudicatedData.quotas_number
                  : 4000}{' '}
                )
              </span>
            </div>
            {/* Separador */}
            <div className="w-full h-1 bg-drcuotasPrimary-bg"></div>
            {/* Términos y Condiciones */}
            <div className="w-full h-40 flex flex-col justify-start gap-2">
              <span className="text-lg text-drcuotasTertiary-text uppercase leading-tight tracking-tight">
                Términos y Condiciones
              </span>
              <span className="text-xs text-drcuotasTertiary-text leading-tight tracking-tight">
                A continuación se describen los Términos y Condiciones Generales
                (en adelante las "Condiciones Generales") aplicables a la
                utilización de los servicios y contenidos suministrados por el
                Sitio de Internet www.drcuotas.com (en adelante, la "LA
                APLICACIÓN Y/O SITIO WEB") que Dr. Cuotas S.A. (en adelante "DR.
                CUOTAS") pone a disposición de los Usuarios en general. Los
                presentes Términos y Condiciones Generales abarcan a las
                “CONDICIONES DE UTILIZACIÓN DE LA APLICACIÓN Y/O SITIO WEB” y a
                la “POLÍTICA DE PRIVACIDAD
              </span>
              <Link href="/faq">
                <button className="text-xs text-drcuotasPrimary-bg uppercase leading-tight tracking-tight">
                  Ver más
                </button>
              </Link>
            </div>
            {/* Botones para pagar */}
            <div className="w-full h-40 flex flex-row justify-center items-center gap-2">
              <button
                className="border border-drcuotasPrimary-bg p-1"
                onClick={handlePayment}
              >
                <span className="text-sm text-drcuotasPrimary-text uppercase leading-tight tracking-tight font-bold">
                  Pagar Cuota Pasarela
                </span>
              </button>
              <button
                className="border border-drcuotasPrimary-bg p-1"
                onClick={createTransaction}
              >
                <span className="text-sm text-drcuotasPrimary-text uppercase leading-tight tracking-tight font-bold">
                  Pagar Cuota Transaccion
                </span>
              </button>
              <button className="bg-drcuotasPrimary-bg p-1">
                <span className="text-sm text-white uppercase leading-tight tracking-tight font-bold">
                  Completar Cuotas
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Galería de miniaturas */}
        <div className="w-full h-auto flex flex-row gap-2 justify-start items-center p-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`w-20 h-20 border cursor-pointer ${
                selectedImage === img
                  ? 'border-drcuotasPrimary-bg '
                  : 'border-transparent'
              }`}
              onClick={() => {
                setSelectedImage(img);
              }}
            >
              <Image
                src={img}
                alt={`Producto ${idx + 1}`}
                width={192}
                height={160}
                className="object-cover w-full h-full border"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
