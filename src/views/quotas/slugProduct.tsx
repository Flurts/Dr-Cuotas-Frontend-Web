/* eslint-disable react/no-unescaped-entities */
import { gql, GraphQLClient } from 'graphql-request';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronLeft } from 'react-icons/fi';

import settings from '@/settings';

// Define TypeScript interface for adjudicated data
interface AdjudicatedData {
  quota_price: number;
  quotas_number: number;
  surgery: {
    name: string;
    description: string;
    file_banner: {
      file_link: string;
    };
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
        file_banner {
          file_link
        }
      }
    }
  }
`;

const CREATE_PAYMENT_MUTATION = gql`
  mutation CreatePaymentRequest($data: PaymentInput!) {
    createPaymentRequest(data: $data)
  }
`;

// Define TypeScript interface for surgerie data
interface SurgerieData {
  description: string;
  name: string;
  amount: number;
}

export default function ProductPage() {
  // Array de imágenes de ejemplo; reemplázalas por tus URLs reales

  // Estados del componente
  const [selectedQuotas, setSelectedQuotas] = useState(2);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const router = useRouter();
  const { isReady, query } = router;
  const [adjudicatedData, setAdjudicatedData] =
    useState<AdjudicatedData | null>(null);
  const [surgerieData, setSurgerieData] = useState<SurgerieData | null>(null);

  // Opciones de cuotas disponibles
  const quotasOptions = [2, 4, 8, 12];

  const getDatePlusDays = (days: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0]; // devuelve 'yyyy-mm-dd'
  };

  useEffect(() => {
    if (!isReady) return; // Solo verificamos isReady

    const fetchData = async () => {
      try {
        // 1° Intento: Fetch AdjudicatedData (si existe adjudicatedId)
        if (query.adjudicatedId) {
          console.log('Intentando fetchAdjudicatedData...');
          const token = localStorage.getItem('accessToken');
          const client = new GraphQLClient(`${settings.API_URL}/graphql`, {
            headers: { Authorization: `${token}` },
          });

          const response = await client.request(GET_ADJUDICATED_BY_ID, {
            adjudicatedId: query.adjudicatedId,
          });

          const data = response as { getAdjudicatedById: AdjudicatedData };
          console.log('Datos adjudicados recibidos:', data);
          setAdjudicatedData(data.getAdjudicatedById);
          return; // Si tiene éxito, terminamos aquí
        }
      } catch (error) {
        console.error('Error en fetchAdjudicatedData:', error);
        // Si falla, continuamos con fetchSurgerieData
      }

      // 2° Intento: Fetch SurgerieData (si no hay adjudicatedId o si falló el primero)
      try {
        console.log('Intentando fetchSurgerieData...');
        const surgerieId = query.adjudicatedId ?? extraerIdDeURL(); // Fallback a URL
        if (!surgerieId) throw new Error('No hay ID disponible');

        const token = localStorage.getItem('accessToken');
        const client = new GraphQLClient(`${settings.API_URL}/graphql`, {
          headers: { Authorization: `${token}` },
        });

        const response = await client.request(
          gql`
            query GetSurgerieById($id: String!) {
              getSurgerieById(id: $id) {
                description
                name
              }
            }
          `,
          { id: surgerieId },
        );

        const data = response as { getSurgerieById: SurgerieData };
        setSurgerieData(data.getSurgerieById);
        console.log('Datos de cirugía recibidos:', data);
      } catch (error) {
        console.error('Error en fetchSurgerieData:', error);
        // Aquí puedes manejar el error final (ej: mostrar un toast)
      }
    };

    void fetchData();
  }, [isReady, query.adjudicatedId]); // query.adjudicatedId sigue en dependencias

  // Función auxiliar para extraer ID de la URL si no viene en query
  const extraerIdDeURL = () => {
    const path = window.location.pathname.split('/');
    return path[path.length - 1]; // Último segmento de la URL
  };

  const createTransaction = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      void router.push('/login');
      console.error('No access token found');
      return;
    }

    console.log('📌 ID adjudicado enviado:', query.adjudicatedId);

    // Hardcodear para debugging
    const hardcodedAmount = 35000;

    const requestPayload = {
      query: `
      mutation CreateTransaction($adjudicatedId: String!, $amount: Float!) {
        createTransaction(adjudicatedId: $adjudicatedId, amount: $amount) {
          AdjudicadosId
          amount
        }
      }
    `,
      variables: {
        adjudicatedId: query.adjudicatedId,
        amount: hardcodedAmount,
      },
    };

    // 🔍 LOG COMPLETO DEL PAYLOAD
    console.log(
      '📌 Payload completo que se enviará:',
      JSON.stringify(requestPayload, null, 2),
    );
    console.log('📌 Variables específicas:', requestPayload.variables);
    console.log('📌 Tipo de amount:', typeof requestPayload.variables.amount);

    try {
      const response = await fetch(`${settings.API_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify(requestPayload),
      });

      // 🔍 LOG DE LA RESPUESTA CRUDA
      const responseText = await response.text();
      console.log('📌 Respuesta HTTP status:', response.status);
      console.log('📌 Respuesta cruda (texto):', responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ Error parseando JSON:', parseError);
        console.error('❌ Texto que no se pudo parsear:', responseText);
        throw new Error('Respuesta no es JSON válido');
      }

      console.log('📌 Respuesta parseada:', JSON.stringify(result, null, 2));

      // 🔍 VERIFICAR SI HAY ERRORES EN LA RESPUESTA
      if (result.errors) {
        console.error('❌ GraphQL Errors:', result.errors);
        result.errors.forEach(
          (error: { message: any; extensions: any }, index: number) => {
            console.error(`❌ Error ${index + 1}:`, error.message);
            if (error.extensions) {
              console.error(`❌ Extensions:`, error.extensions);
            }
          },
        );
      }

      if (!response.ok) {
        console.error('❌ HTTP Error:', response.status, response.statusText);
        throw new Error(`HTTP Error: ${response.status}`);
      }

      if (!result.data) {
        console.error('❌ No data in response:', result);
        throw new Error('No data field in response');
      }

      if (!result.data.createTransaction) {
        console.error('❌ No createTransaction in data:', result.data);
        throw new Error('No createTransaction field in response data');
      }

      const transactionData = result.data.createTransaction;
      console.log('✅ Transacción creada exitosamente:', transactionData);
      console.log('✅ AdjudicadosId recibido:', transactionData.AdjudicadosId);
      console.log('✅ Amount recibido:', transactionData.amount);
      console.log('✅ Tipo de amount recibido:', typeof transactionData.amount);

      alert(
        `Transacción creada exitosamente.\nID: ${transactionData.AdjudicadosId}\nMonto: ${transactionData.amount}`,
      );
      return transactionData.AdjudicadosId;
    } catch (error) {
      console.error('🚨 Error completo:', error);

      throw error; // Re-throw para debugging
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

    // Calcular el total basado en las cuotas seleccionadas
    const totalAmount = adjudicatedData.quota_price * selectedQuotas;

    const variables = {
      data: {
        description: 'Pago de servicio',
        first_due_date: getDatePlusDays(2),
        first_total: totalAmount, // Multiplicado por las cuotas seleccionadas
        second_due_date: null,
        second_total: null,
        back_url_success: 'http://localhost:3000/account',
        back_url_pending: 'http://localhost:3000/',
        back_url_rejected: 'http://localhost:3000/',
        adjudicadosId: String(query.adjudicatedId), // Convertir a string
        amount: totalAmount, // Monto total a pagar
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-6">
          {/* Header - Volver atrás */}
          <div className="mb-8">
            <Link
              href="/account"
              className="inline-flex items-center gap-2 text-drcuotasSecondaryPrimaryColor-text hover:text-drcuotasPrimary-bg transition-colors duration-200"
            >
              <FiChevronLeft className="text-lg" />
              <span className="text-sm uppercase font-medium tracking-wide">
                Volver a mi cuenta
              </span>
            </Link>
          </div>

          {/* Contenido principal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Área de imagen del producto */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="aspect-square flex items-center justify-center p-8">
                  <Image
                    src={
                      adjudicatedData?.surgery.file_banner.file_link ??
                      '/images/elements/placeholder-image.png'
                    }
                    alt="Imagen del Producto"
                    width={700}
                    height={900}
                    className="object-contain max-h-full w-auto "
                  />
                </div>
              </div>

              {/* Galería de miniaturas */}
            </div>

            {/* Información del producto */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
              <div className="space-y-6">
                {/* Título y descripción */}
                <div>
                  <h1 className="text-3xl font-bold text-drcuotasPrimary-text mb-2">
                    {adjudicatedData?.surgery.name ??
                      surgerieData?.name ??
                      'Nombre del Producto'}
                  </h1>
                  <p className="text-gray-600 leading-relaxed">
                    {adjudicatedData?.surgery.description ??
                      surgerieData?.description ??
                      'Descripción del Producto'}
                  </p>
                </div>

                {/* Selector de cuotas */}
                <div className="space-y-3">
                  <label className="block text-lg font-semibold text-drcuotasPrimary-text">
                    Número de Cuotas
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(!isDropdownOpen);
                      }}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-drcuotasPrimary-bg focus:outline-none focus:ring-2 focus:ring-drcuotasPrimary-bg focus:border-transparent transition-colors duration-200"
                    >
                      <span className="font-medium">
                        {selectedQuotas} cuotas
                      </span>
                      <FiChevronDown
                        className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                        {quotasOptions.map((quota) => (
                          <button
                            key={quota}
                            onClick={() => {
                              setSelectedQuotas(quota);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                          >
                            {quota} cuotas
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Información de precios */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Precio por cuota:</span>
                    <span className="font-semibold">
                      {adjudicatedData?.quota_price
                        ? formatCurrency(adjudicatedData.quota_price)
                        : 'Cuotas cómodas'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Cuotas seleccionadas:</span>
                    <span className="font-semibold">{selectedQuotas}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-semibold text-drcuotasPrimary-text">
                        Total a pagar:
                      </span>
                      <span className="font-bold text-drcuotasPrimary-text">
                        {adjudicatedData?.quota_price
                          ? formatCurrency(
                              adjudicatedData.quota_price * selectedQuotas,
                            )
                          : formatCurrency(surgerieData?.amount ?? 0)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Términos y condiciones */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-drcuotasPrimary-text">
                    Términos y Condiciones
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    A continuación se describen los Términos y Condiciones
                    Generales aplicables a la utilización de los servicios y
                    contenidos suministrados por www.drcuotas.com que Dr. Cuotas
                    S.A. pone a disposición de los usuarios.
                  </p>
                  <Link href="/faq" className="inline-block">
                    <button className="text-sm text-drcuotasPrimary-bg hover:underline font-medium">
                      Ver más →
                    </button>
                  </Link>
                </div>

                {/* Botones de acción */}
                <div className="grid grid-cols-1 gap-3 pt-4">
                  <button
                    onClick={handlePayment}
                    className="bg-drcuotasPrimary-bg hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 uppercase tracking-wide"
                  >
                    Pagar con Pasarela
                  </button>
                  <button
                    onClick={createTransaction}
                    className="border-2 border-drcuotasPrimary-bg text-drcuotasPrimary-bg hover:bg-drcuotasPrimary-bg hover:text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 uppercase tracking-wide"
                  >
                    Pagar con Transacción
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
