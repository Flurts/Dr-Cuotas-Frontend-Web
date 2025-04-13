import { gql, GraphQLClient } from 'graphql-request';
import { LucideX, LucideZoomIn } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

import settings from '@/settings';

interface HomeSpecialtieCardProps {
  id: string;
  imageUrl: string;
  rating: number;
  title: string;
  description: string;
  category: string;
  price: number;
  doctors: Array<{
    id: string;
    provincia: string;
    first_name: string;
    last_name: string;
  }>;
}

const SpecialtyCard: React.FC<HomeSpecialtieCardProps> = ({
  imageUrl,
  rating,
  category,
  title,
  description,
  price,
  id,
  doctors = [], // Provide empty array as default value
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const cuotasOptions = [4, 8, 12, 16]; // Opciones de cuotas
  const quotes = 10;
  const router = useRouter();

  const [selectedQuota, setSelectedQuota] = useState(cuotasOptions[0]); // Valor inicial
  console.log('Cuotas seleccionadas:', selectedQuota);
  console.log('doctors', doctors);
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') ?? '[]');
    const newItem = { imageUrl, rating, title, description, price };
    localStorage.setItem('cart', JSON.stringify([...cart, newItem]));
  };

  const [selectedCuotas, setSelectedCuotas] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState(
    doctors && doctors.length > 0 ? doctors[0].id : '',
  );
  console.log('selectedDoctorId', selectedDoctorId);
  console.log('selectedCuotas', selectedCuotas);

  // Estado para los términos y condiciones
  const [termsAccepted, setTermsAccepted] = useState(false);

  const CREATE_PAYMENT_MUTATION = gql`
    mutation CreatePaymentRequest($data: PaymentInput!) {
      createPaymentRequest(data: $data)
    }
  `;

  async function subscribeSurgerie() {
    if (!termsAccepted) {
      alert('Debes aceptar los términos y condiciones para continuar.');
      return;
    }
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/login');
      console.error('No access token found');
      return;
    }

    console.log('ID enviado:', id);
    console.log('Precio total:', price);
    console.log('Número de cuotas:', quotes);
    console.log('Precio por cuota:', price / quotes);

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

      void handlePayment(adjudicadosId);
      return adjudicadosId;
    } catch (error) {
      console.error('🚨 Error en subscribeSurgerie:', error);
    }
  }

  async function subscribeSurgerieDirect() {
    if (!termsAccepted) {
      alert('Debes aceptar los términos y condiciones para continuar.');
      return;
    }
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/login');
      console.error('No access token found');
      return;
    }

    console.log('ID enviado:', id);
    console.log('Precio total:', price);
    console.log('Número de cuotas:', quotes);
    console.log('Precio por cuota:', price / quotes);

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
      alert(
        'El pago se ha realizado. Por favor, Espera a la confirmacion de un adminstrador para apreciar tu pago.',
      );
      router.push('/account');
      void createTransaction(adjudicadosId);
      return adjudicadosId;
    } catch (error) {
      console.error('🚨 Error en subscribeSurgerie:', error);
    }
  }

  async function createTransaction(adjudicatedId: string) {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/login');
      console.error('No access token found');
      return;
    }

    console.log('📌 ID adjudicado enviado:', adjudicatedId);

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
            adjudicatedId,
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
  }

  const handlePayment = async (adjudicadosId: string) => {
    if (!adjudicadosId) {
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
        first_due_date: '2025-04-01',
        first_total: price / selectedQuota,
        second_due_date: null,
        second_total: null,
        back_url_success: 'http://localhost:3000/account',
        back_url_pending: 'http://localhost:3000/',
        back_url_rejected: 'http://localhost:3000/',
        adjudicadosId: String(adjudicadosId),
      },
    };

    try {
      const response = await client.request(CREATE_PAYMENT_MUTATION, variables);

      if (response?.createPaymentRequest) {
        const checkoutUrl = response.createPaymentRequest;
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

  const planOptions = Array.isArray(doctors)
    ? doctors.map((doctor) => `${doctor.id} - ${doctor.provincia}`)
    : [];
  // Opciones de planes/nombres

  const images = [
    '/images/banners/banner_full_body.svg',
    '/images/surgerys/chest_body.svg',
    '/images/surgerys/girl_chest.svg',
    '/images/surgerys/girl_face.svg',
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <>
      <div
        className="flex flex-col w-60 lg:w-80 h-full rounded-xl bg-white cursor-pointer border"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <div className="flex justify-center items-center">
          <Image
            src="/images/elements/girl_footer.svg"
            alt=""
            className="w-full h-full object-cover rounded-xl p-4"
            width={238}
            height={224}
          />
        </div>
        <div className="flex flex-col gap-4 items-center justify-center p-8 flex-grow">
          <div className="hidden flex-row w-[60px] items-center justify-center bg-[#26335D] gap-2 rounded-3xl p-1">
            <FaStar className="text-yellow-400 text-sm" />
            <span className="text-white text-xs">{rating ?? 0}</span>
          </div>
          <div className="flex flex-col justify-center items-center w-full">
            <span className="uppercase leading-tight tracking-tight font-black text-xl text-drcuotasTertiary-text truncate">
              {title}
            </span>
            <span className="text-drcuotasTertiary-text text-xs line-clamp-3 uppercase leading-tight tracking-tight">
              {description?.length > 0
                ? description
                : 'Descripción no disponible'}
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 w-full h-full backdrop-blur-md bg-drcuotasSecondary-bg bg-opacity-60 flex flex-col-reverse lg:flex-row justify-center items-center z-50 gap-2 p-14 lg:p-10">
          {/* Miniaturas */}
          <div className="w-auto h-full hidden lg:flex flex-col gap-1">
            {images.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`Miniatura ${index}`}
                width={100}
                height={100}
                className={`w-24 h-14 cursor-pointer bg-white border-2 transition-all ${
                  selectedImage === img
                    ? 'border-drcuotasPrimary-bg bg-drcuotasPrimary-bg'
                    : 'border-gray-300'
                }`}
                onClick={() => {
                  setSelectedImage(img);
                }}
              />
            ))}
          </div>
          {/* Información de Cirugía */}
          <div className="bg-white w-[80vw] lg:w-full h-full p-6 shadow-xl rounded-xl hidden lg:flex flex-col items-center gap-4">
            {/* Imagen Principal */}
            <div className="w-full h-full flex justify-center">
              <Image
                src={selectedImage}
                alt="Imagen Principal"
                className="rounded-xl border w-screen object-cover"
                width={300}
                height={300}
              />
            </div>
          </div>
          {/* Pagar */}
          <div className="bg-white w-full lg:w-[40vw] h-full p-4 lg:p-10 flex flex-col shadow-xl shadow-drcuotasPrimary-bg rounded-xl">
            <h2 className="text-md xl:text-2xl uppercase font-black leading-tight tracking-tight text-drcuotasPrimary-text w-full">
              Paga a Cuotas Tu Sueño
            </h2>
            <span className="text-xs xl:text-sm uppercase font-bold leading-tight tracking-tight text-drcuotasPrimary-text w-full">
              {title}
            </span>
            <div className="w-full h-40 flex items-center">
              <span className="text-xs xl:text-sm text-drcuotasTertiary-text leading-tight tracking-tight">
                {selectedCuotas
                  ? `${selectedCuotas} cuotas de $${(
                      price / Number(selectedCuotas)
                    ).toFixed(2)}`
                  : 'Seleccione cuotas'}
                <br /> Para pagar el valor total de ${price}
              </span>
            </div>

            {/* Formulario de Pago */}
            <form>
              <div className="w-full h-40 flex flex-col justify-center items-center gap-2">
                <div className="w-full h-auto hidden lg:flex flex-col lg:flex-row justify-between gap-4 lg:gap-0">
                  {/* Selección de Categoria */}
                  <div className="w-1/2 flex flex-col justify-start items-start">
                    <p className="text-xs font-bold text-drcuotasTertiary-text text-center uppercase leading-tight tracking-tight truncate">
                      Categoria
                    </p>
                    <p className="text-xs text-drcuotasTertiary-text text-center leading-tight tracking-tight">
                      {category}
                    </p>
                  </div>
                  <div className="w-1/3 flex flex-col justify-start items-start">
                    <p className="text-xs font-bold text-drcuotasTertiary-text text-center uppercase leading-tight tracking-tight truncate">
                      Precio
                    </p>
                    <p className="text-xs text-drcuotasTertiary-text text-center leading-tight tracking-tight">
                      {price / selectedQuota
                        ? `$${(price / selectedQuota).toFixed(2)}`
                        : 'calculando...'}
                    </p>
                  </div>
                </div>
                <div className="w-full h-auto flex flex-col lg:flex-row justify-between gap-4 lg:gap-0">
                  {/* Selección de doctor */}
                  <div className="w-1/2 flex flex-col justify-start items-start">
                    <label className="text-xs font-bold text-drcuotasTertiary-text text-center uppercase leading-tight tracking-tight truncate">
                      Doctor
                    </label>
                    {Array.isArray(doctors) && doctors.length > 0 ? (
                      <select
                        value={selectedDoctorId}
                        onChange={(e) => setSelectedDoctorId(e.target.value)}
                        className="text-xs text-drcuotasTertiary-text text-center leading-tight tracking-tight"
                      >
                        {doctors.map((doctor) => (
                          <option key={doctor.id} value={doctor.id}>
                            {doctor.first_name} {doctor.last_name} - {doctor.provincia}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-xs text-drcuotasTertiary-text text-center leading-tight tracking-tight">
                        No hay doctores disponibles
                      </p>
                    )}
                  </div>
                  {/* Selección de cuotas */}
                  <div className="w-1/3 flex flex-col justify-start items-start">
                    <label className="text-xs font-bold text-drcuotasTertiary-text text-center uppercase leading-tight tracking-tight truncate">
                      Cuotas
                    </label>
                    <select
                      value={selectedQuota}
                      onChange={(e) => setSelectedQuota(Number(e.target.value))}
                      className="text-xs text-drcuotasTertiary-text text-center leading-tight tracking-tight"
                    >
                      {cuotasOptions.map((quota) => (
                        <option key={quota} value={quota}>
                          {quota} cuotas
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </form>

            {/* Checkbox de Términos y Condiciones */}
            <div className="w-full flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                id="terms"
              />
              <label htmlFor="terms" className="text-xs text-drcuotasTertiary-text underline cursor-pointer">
                <a href='/faq' className='leading-tight tracking-tight uppercase'>
                Acepto Términos y Condiciones
                </a>
              </label>
            </div>

            <div className="w-full h-full flex flex-col justify-center items-center gap-4">
              <div className="w-full flex flex-col justify-center">
                <span className="text-xs font-bold text-drcuotasTertiary-text uppercase leading-tight tracking-tight">
                  Descripcion
                </span>
                <p className="text-xs text-drcuotasTertiary-text leading-tight tracking-tight h-full">
             {description}
                </p>
              </div>
              <div className="w-full h-auto hidden sm:flex flex-col justify-between gap-4 ">
                <div className="w-1/2 flex flex-col justify-start items-start">
                  <p className="text-xs font-bold text-drcuotasTertiary-text text-center uppercase leading-tight tracking-tight">
                    Informacion
                  </p>
                  <Link
                    href="/faq"
                    className="text-xs text-drcuotasTertiary-text text-center leading-tight tracking-tight underline hidden lg:block"
                  >
                    Ver mas
                  </Link>
                  <Link
                    href="/faq"
                    className="text-xs text-drcuotasTertiary-text text-center leading-tight tracking-tight underline block lg:hidden"
                  >
                    Términos y Condiciones
                  </Link>
                </div>
                <div className="w-1/2 flex flex-col justify-start items-start">
                  <p className="text-xs font-bold text-drcuotasTertiary-text text-center uppercase leading-tight tracking-tight">
                    Soporte Tecnico
                  </p>
                  <Link
                    href="/faq"
                    className="text-xs text-drcuotasTertiary-text text-center leading-tight tracking-tight underline hidden lg:block"
                  >
                    Ver mas
                  </Link>
                  <Link
                    href="/faq"
                    className="text-xs text-drcuotasTertiary-text text-center leading-tight tracking-tight underline block lg:hidden"
                  >
                    Preguntas Frecuentes
                  </Link>
                </div>
              </div>
            </div>

            {/* Botones de Pago */}
            <span className="w-full h-full flex items-end justify-start text-xs text-drcuotasTertiary-text leading-tight tracking-tight mb-4 font-bold uppercase">
              Comprar por:
            </span>
            <div className="w-full h-auto flex flex-col lg:flex-row justify-end items-end gap-1">
              <button
                onClick={subscribeSurgerie}
                type="submit"
                disabled={!termsAccepted}
                className={`w-full h-14 uppercase rounded-xl font-bold text-lg transition text-center leading-tight tracking-tight truncate ${
                  termsAccepted
                    ? 'bg-drcuotasPrimary-bg text-white hover:bg-blue-700'
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
              >
                <p className="text-xs text-white text-center uppercase leading-tight tracking-tight">
                  Pasarela de Pago
                </p>
              </button>
              <button
                onClick={subscribeSurgerieDirect}
                type="submit"
                disabled={!termsAccepted}
                className={`w-full h-14 uppercase rounded-xl font-bold text-lg transition text-center leading-tight tracking-tight truncate ${
                  termsAccepted
                    ? 'bg-green-600 text-white hover:bg-blue-700'
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
              >
                <p className="text-xs text-white text-center uppercase leading-tight tracking-tight">
                  Cuenta Bancaria
                </p>
              </button>
            </div>
          </div>
          {/* Cerrar Modal */}
          <div className="w-full lg:w-auto h-full flex flex-row lg:flex-col gap-1">
            <button
              className="text-drcuotasPrimary hover:text-white bg-white hover:bg-red-500 font-black uppercase border-2 hover:border-red-500 border-drcuotasPrimary w-full lg:w-16 h-10 flex items-center justify-center rounded-xl transition-all duration-300 gap-2"
              onClick={() => setIsOpen(false)}
            >
              <LucideX className="text-2xl" />
              <span className="font-black uppercase leading-tight tracking-tight text-xs lg:text-base block lg:hidden">
                Cerrar
              </span>
            </button>
            <Link
              href="/"
              className="text-drcuotasPrimary hover:text-white bg-white hover:bg-green-500 font-black uppercase border-2 hover:border-green-500 border-drcuotasPrimary w-full lg:w-16 h-10 flex items-center justify-center rounded-xl transition-all duration-300 gap-2"
            >
              <LucideZoomIn className="text-2xl" />
              <span className="font-black uppercase leading-tight tracking-tight text-xs lg:text-base block lg:hidden">
                Ver mas
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SpecialtyCard;
