/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
'use client';
import { gql, GraphQLClient } from 'graphql-request';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

import settings from '@/settings';
import { Surgery, useGetAllSurgeriesWithValuesQuery } from '@/types';

interface ProductPageProps {
  surgeryId?: string; // Para obtener una cirugía específica
}

const ProductPage = ({ surgeryId }: ProductPageProps) => {
  const router = useRouter();
  const params = useParams();
  const currentSurgeryId = params?.id as string;

  // Estados para manejar la información
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [surgeriesList, setSurgeriesList] = useState<Surgery[]>([]);
  const [selectedSurgery, setSelectedSurgery] = useState<Surgery | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [selectedQuota, setSelectedQuota] = useState<number>(1);
  const [selectedCuotas, setSelectedCuotas] = useState<number>(1);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  // Query para obtener las cirugías
  const { data, error } = useGetAllSurgeriesWithValuesQuery({
    variables: { limit: 10, offset: 0 },
  });

  localStorage.getItem('selectedSurgeryId');
  console.log('🔍 Cirugía ID desde localStorage:', surgeryId);

  console.log('🔍 ID de cirugía desde URL:', currentSurgeryId);

  useEffect(() => {
    if (data && !error) {
      const surgeries = data.getAllSurgeriesWithValues as Surgery[];
      setSurgeriesList(surgeries);

      // Obtener el ID del localStorage (solo en cliente)
      const surgeryIdLocal =
        typeof window !== 'undefined'
          ? localStorage.getItem('selectedSurgeryId')
          : null;

      console.log('🔍 Cirugía ID desde localStorage:', surgeryIdLocal);
      console.log('🔍 ID buscado:', currentSurgeryId);
      console.log(
        '📋 Lista de cirugías disponibles:',
        surgeries.map((s) => ({ id: s.id, name: s.name })),
      );

      // Determinar qué ID usar (prioridad: currentSurgeryId > localStorage > primera cirugía)
      const idToUse = currentSurgeryId || surgeryIdLocal;

      if (idToUse) {
        const surgery = surgeries.find((s) => s.id === idToUse);
        if (surgery) {
          console.log('✅ Cirugía encontrada:', surgery);
          setSelectedSurgery(surgery);
        } else {
          console.log('❌ No se encontró cirugía con ID:', idToUse);
          // Si no se encuentra, usar la primera disponible
          if (surgeries.length > 0) {
            console.log('🔄 Usando primera cirugía disponible:', surgeries[0]);
            setSelectedSurgery(surgeries[0]);
          }
        }
      } else if (surgeries.length > 0) {
        // Si no hay ningún ID, usar la primera cirugía
        console.log(
          '📝 Sin ID específico, usando primera cirugía:',
          surgeries[0],
        );
        setSelectedSurgery(surgeries[0]);
      }
    } else if (error) {
      console.error('Error fetching surgeries:', error);
      setSurgeriesList([]);
    }
  }, [data, error, currentSurgeryId]);

  // Actualizar selectedCuotas cuando cambia selectedQuota
  useEffect(() => {
    setSelectedCuotas(selectedQuota);
  }, [selectedQuota]);

  // Resetear doctor seleccionado cuando cambia la provincia
  useEffect(() => {
    setSelectedDoctorId('');
  }, [selectedProvince]);

  // Opciones de cuotas disponibles
  const cuotasOptions = [4, 8, 16];

  // Función para obtener fecha futura
  const getDatePlusDays = (days: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0]; // devuelve 'yyyy-mm-dd'
  };

  // Mutation para crear el pago
  const CREATE_PAYMENT_MUTATION = gql`
    mutation CreatePaymentRequest($data: PaymentInput!) {
      createPaymentRequest(data: $data)
    }
  `;

  // Extraer información de la cirugía seleccionada
  const doctors = selectedSurgery?.doctors ?? [];

  // Formatear doctores para el select
  const formattedDoctors = doctors.map((d) => ({
    id: d.doctor?.id || '',
    first_name: d.doctor?.user?.first_name || 'Sin nombre',
    last_name: d.doctor?.user?.last_name || 'Sin apellido',
    provincia: d.doctor?.provincia || 'Sin provincia',
  }));

  // Obtener provincias únicas de los doctores
  const availableProvinces = useMemo(() => {
    const provinces = formattedDoctors
      .map((doctor) => doctor.provincia)
      .filter((provincia) => provincia && provincia !== 'Sin provincia');

    // eslint-disable-next-line @typescript-eslint/require-array-sort-compare
    return Array.from(new Set(provinces)).sort();
  }, [formattedDoctors]);

  // Filtrar doctores por provincia seleccionada
  const filteredDoctors = useMemo(() => {
    if (!selectedProvince) return [];

    return formattedDoctors.filter(
      (doctor) => doctor.provincia === selectedProvince,
    );
  }, [formattedDoctors, selectedProvince]);

  // Función para suscribirse a la cirugía y procesar pago por pasarela
  const subscribeSurgerie = async () => {
    if (!termsAccepted) {
      alert('Debes aceptar los términos y condiciones para continuar.');
      return;
    }

    if (!selectedSurgery || !selectedDoctorId) {
      alert('Por favor complete todos los campos requeridos.');
      return;
    }

    localStorage.setItem('isRegister', '1');
    localStorage.setItem('surgeryId', selectedSurgery.id);

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/login');
      console.error('No access token found');
      return;
    }

    const { id, amount: price } = selectedSurgery;
    console.log('ID enviado:', id);
    console.log('Precio total:', price);
    console.log('Número de cuotas:', selectedQuota);
    console.log('Precio por cuota:', price / selectedQuota);

    try {
      const response = await fetch(`${settings.API_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({
          query: `
            mutation SubscribeSurgerie($surgerieId: String!, $phone: String!, $email: String!, $quotaPrice: Float!, $totalPrice: Float!, $quotasNumber: Int!, $documentIdentification: String!, $lastName: String!, $firstName: String!, $doctorId: String) {
              subscribeSurgerie(surgerieId: $surgerieId, phone: $phone, email: $email, quotaPrice: $quotaPrice, totalPrice: $totalPrice, quotasNumber: $quotasNumber, document_identification: $documentIdentification, last_name: $lastName, first_name: $firstName, doctorId: $doctorId) {
                adjudicated_status
                id
              }
            }
          `,
          variables: {
            surgerieId: id,
            phone: '5551234567',
            email: 'example@email.com',
            documentIdentification: 'A123456789',
            lastName: 'Doe',
            firstName: 'John',
            quotaPrice: Math.floor(price / selectedQuota),
            totalPrice: price,
            quotasNumber: selectedQuota,
            doctorId: selectedDoctorId,
          },
        }),
      });

      const result = await response.json();
      console.log('📌 Respuesta completa de la API:', result);

      if (!response.ok) {
        console.error('GraphQL Error:', result.errors);
        throw new Error(result.errors?.[0]?.message || 'Error en la API');
      }

      if (result.errors) {
        console.error('❌ GraphQL Errors:', result.errors);
        throw new Error(
          result.errors[0]?.message || 'Error desconocido en GraphQL',
        );
      }

      if (!result.data?.subscribeSurgerie) {
        console.error('❌ Datos inválidos:', result);
        throw new Error('No se recibió ID de subscribeSurgerie');
      }

      const adjudicadosId = result.data.subscribeSurgerie.id;
      console.log('✅ ID adjudicado:', adjudicadosId);

      await handlePayment(adjudicadosId);
      return adjudicadosId;
    } catch (error) {
      console.error('🚨 Error en subscribeSurgerie:', error);
      alert(
        'Hubo un error al procesar la suscripción. Por favor intente nuevamente.',
      );
    }
  };

  // Función para manejar el pago por pasarela
  const handlePayment = async (adjudicadosId: string) => {
    if (!adjudicadosId || !selectedSurgery) {
      alert('El ID de adjudicación es inválido.');
      return;
    }

    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/login');
      alert('No se encontró el token de autenticación.');
      return;
    }

    const client = new GraphQLClient(`${settings.API_URL}/graphql`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    const variables = {
      data: {
        description: 'Pago de servicio',
        first_due_date: getDatePlusDays(2),
        first_total: Math.round(selectedSurgery.amount / selectedQuota),
        second_due_date: null,
        second_total: null,
        back_url_success: 'https://www.drcuotas.com/account',
        back_url_pending: 'https://www.drcuotas.com/',
        back_url_rejected: 'https://www.drcuotas.com/',
        adjudicadosId: String(adjudicadosId),
      },
    };

    try {
      interface CreatePaymentResponse {
        createPaymentRequest: string;
      }

      const response = await client.request<CreatePaymentResponse>(
        CREATE_PAYMENT_MUTATION,
        variables,
      );

      if (response?.createPaymentRequest) {
        const checkoutUrl = (response as { createPaymentRequest: string })
          .createPaymentRequest;
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

  // Función para pago directo (sin cambios)
  const subscribeSurgerieDirect = () => {
    if (!selectedSurgery || !selectedDoctorId || !termsAccepted) {
      alert('Por favor complete todos los campos y acepte los términos');
      return;
    }

    console.log('Procesando pago directo:', {
      surgery: selectedSurgery,
      doctor: selectedDoctorId,
      cuotas: selectedQuota,
      amount: selectedSurgery.amount / selectedQuota,
    });

    // Aquí iría la lógica para el pago directo
  };

  // Mostrar error si hay problemas
  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-lg text-red-500">Error al cargar la información</p>
      </div>
    );
  }

  // Si no hay cirugía seleccionada
  if (!selectedSurgery) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-lg">No se encontró información de la cirugía</p>
      </div>
    );
  }

  const {
    name: title,
    amount: price,
    category,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    description,
    file_banner,
  } = selectedSurgery;

  const imageUrl = file_banner?.file_link ?? '/images/elements/specialty.svg';

  console.log('🎯 Selected surgery:', selectedSurgery);
  console.log('🌍 Available provinces:', availableProvinces);
  console.log('👨‍⚕️ Filtered doctors:', filteredDoctors);

  return (
    <>
      <div className="w-full min-h-screen  flex flex-col lg:flex-row justify-center items-stretch p-10 gap-2 ">
        {/* Imagen Principal */}
        <div className="w-1/2 hidden lg:flex justify-center items-center border border-black">
          <Image
            src={imageUrl}
            alt={`Imagen de ${title}`}
            className="w-full h-full object-cover "
            quality={80}
            width={300}
            height={300}
          />
        </div>

        {/* Panel de Pago */}
        <div className="w-full  bg-white border border-black overflow-hidden">
          <div className="p-10 h-full flex flex-col">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 leading-tight">
                Cirugía {title}
              </h2>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4  border-l-4 border-blue-400">
                <p className="text-sm text-gray-700">
                  {selectedCuotas
                    ? `${selectedCuotas} cuotas de $${(price / selectedCuotas).toFixed(0)}`
                    : 'Seleccione cuotas'}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Valor total:{' '}
                  <span className="text-2xl font-bold text-green-600">
                    ${price?.toFixed(0)}
                  </span>
                </p>
              </div>
            </div>

            {/* Formulario de Pago */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="flex-1"
            >
              {/* Información de Categoría y Precio (Desktop) */}
              <div className="hidden lg:grid grid-cols-2 gap-6 mb-6 p-4 bg-gray-50 rounded-2xl">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Categoría
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    {category || 'Sin categoría'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Precio por Cuota
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    $
                    {selectedQuota
                      ? (price / selectedQuota).toFixed(0)
                      : 'Calculando...'}
                  </p>
                </div>
              </div>

              {/* Campos de Selección */}
              <div className="space-y-6 mb-6">
                {/* Selección de provincia */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Provincia
                  </label>
                  {availableProvinces.length > 0 ? (
                    <select
                      value={selectedProvince}
                      onChange={(e) => {
                        setSelectedProvince(e.target.value);
                      }}
                      className="w-full p-4 text-xs border border-black focus:border-blue-400 focus:ring-0 transition-colors bg-white"
                      required
                    >
                      <option value="">Seleccionar provincia</option>
                      {availableProvinces.map((province) => (
                        <option key={province} value={province}>
                          {province}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                      <p className="text-sm text-yellow-700">
                        No hay provincias disponibles
                      </p>
                    </div>
                  )}
                </div>

                {/* Selección de doctor */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Doctor
                  </label>
                  {!selectedProvince ? (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                      <p className="text-sm text-blue-700">
                        Primero selecciona una provincia
                      </p>
                    </div>
                  ) : filteredDoctors.length > 0 ? (
                    <select
                      value={selectedDoctorId}
                      onChange={(e) => {
                        setSelectedDoctorId(e.target.value);
                      }}
                      className="w-full p-4 text-xs border border-black focus:border-blue-400 focus:ring-0 transition-colors bg-white"
                      required
                    >
                      <option value="">Seleccionar doctor</option>
                      {filteredDoctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.first_name} {doctor.last_name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                      <p className="text-sm text-yellow-700">
                        No hay doctores disponibles en {selectedProvince}
                      </p>
                    </div>
                  )}
                </div>

                {/* Selección de cuotas */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Cuotas
                  </label>
                  <select
                    value={selectedQuota}
                    onChange={(e) => {
                      setSelectedQuota(Number(e.target.value));
                    }}
                    className="w-full p-4 text-xs border border-black focus:border-blue-400 focus:ring-0 transition-colors bg-white"
                    required
                  >
                    {cuotasOptions.map((quota) => (
                      <option key={quota} value={quota}>
                        {quota} cuota{quota > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>

            {/* Checkbox de Términos y Condiciones */}
            <div className="flex items-start gap-3 mb-6 p-4 bg-gray-50 ">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked);
                }}
                id="terms"
                className="mt-1 w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                required
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-700 cursor-pointer leading-relaxed"
              >
                <Link
                  href="/faq"
                  className="text-blue-600 hover:text-blue-800 font-medium underline decoration-2 underline-offset-2"
                >
                  Acepto Términos y Condiciones
                </Link>
              </label>
            </div>

            {/* Sección de Botones */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                Pagar por:
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <button
                  onClick={subscribeSurgerie}
                  type="button"
                  disabled={!termsAccepted || !selectedDoctorId}
                  className={`group relative h-14 font-bold text-sm uppercase tracking-wider transition-all duration-200 overflow-hidden ${
                    termsAccepted && selectedDoctorId
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative">Pasarela de Pago</span>
                </button>

                <button
                  onClick={subscribeSurgerieDirect}
                  type="button"
                  disabled={!termsAccepted || !selectedDoctorId}
                  className={`group relative h-14 font-bold text-sm uppercase tracking-wider transition-all duration-200 overflow-hidden ${
                    termsAccepted && selectedDoctorId
                      ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative">Cuenta Bancaria</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
