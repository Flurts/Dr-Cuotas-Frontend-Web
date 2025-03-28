import { gql, GraphQLClient } from 'graphql-request';
import { LucideMessagesSquare, LucideZoomIn } from 'lucide-react';
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
  title,
  description,
  price,
  id,
  doctors,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const cuotasOptions = [4, 8, 12, 16]; // Opciones de cuotas
  const quotes = 10;
  const router = useRouter();

  const [selectedQuota, setSelectedQuota] = useState(cuotasOptions[0]); // Valor inicial
  console.log('Cuotas seleccionadas:', selectedQuota); // <- Verifica que se está enviando el número de cuotas seleccionado
  console.log('doctors', doctors);
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') ?? '[]');
    const newItem = { imageUrl, rating, title, description, price };
    localStorage.setItem('cart', JSON.stringify([...cart, newItem]));
  };

  const [selectedCuotas, setSelectedCuotas] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState(
    doctors[0]?.id || '',
  );
  console.log('selectedDoctorId', selectedDoctorId);
  console.log('selectedCuotas', selectedCuotas);

  const CREATE_PAYMENT_MUTATION = gql`
    mutation CreatePaymentRequest($data: PaymentInput!) {
      createPaymentRequest(data: $data)
    }
  `;

  async function subscribeSurgerie() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/login');
      console.error('No access token found');
      return;
    }

    console.log('ID enviado:', id); // <- Verifica que se está enviando el ID correcto

    console.log('Precio total:', price); // <- Verifica que se está enviando el precio correcto
    console.log('Número de cuotas:', quotes); // <- Verifica que se está enviando el número de cuotas correcto
    console.log('Precio por cuota:', price / quotes); // <- Verifica que se está calculando el precio por cuota correctamente

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

      console.log('📌 Respuesta completa de la API:', result); // <-- Log completo

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
      console.log('✅ ID :', result.data);
      console.log('✅ ID :', result.data.subscribeSurgerie.id);

      console.log('✅ ID adjudicado:', adjudicadosId);

      void handlePayment(adjudicadosId);
      return adjudicadosId;
    } catch (error) {
      console.error('🚨 Error en subscribeSurgerie:', error);
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
        adjudicadosId: String(adjudicadosId), // Convertir a string
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

  const planOptions = doctors.map(
    (doctor) => `${doctor.id} - ${doctor.provincia}`,
  );
  // Opciones de planes/nombres

  return (
    <>
      <div
        className="flex flex-col w-60 lg:w-80 h-full rounded-xl bg-white  cursor-pointer"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <>
          <div className="flex justify-center items-center">
            <Image
              src="/images/elements/girl_footer.svg"
              alt=""
              className="w-full h-full object-cover rounded-xl p-4"
              width={238}
              height={224}
            />
            {/* <Image
              src={imageUrl ?? '/images/elements/specialty.svg'}
              alt=""
              className="w-full h-full object-cover"
              width={238}
              height={224}
            /> */}
          </div>
        </>

        <>
          <div className="flex flex-col gap-4 items-center justify-center p-8 flex-grow">
            <div className="hidden flex-row w-[60px] items-center justify-center bg-[#26335D] gap-2 rounded-3xl p-1">
              <FaStar className="text-yellow-400 text-sm" />
              <span className="text-white text-xs">{rating ?? 0}</span>
            </div>
            <div className="flex flex-col justify-center items-center  w-full">
              <span className="uppercase leading-tight tracking-tight font-black text-xl text-drcuotasTertiary-text truncate">
                {title}
              </span>
              <span className="text-drcuotasTertiary-text text-xs line-clamp-3 uppercase leading-tight tracking-tight">
                {description.length > 0
                  ? description
                  : 'Descripción no disponible'}
              </span>
            </div>
          </div>
        </>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 w-full h-full backdrop-blur-md bg-drcuotasSecondary-bg bg-opacity-60 flex flex-row justify-center items-center z-50 gap-4 p-10">
          {/* Informacion de Cirugia  */}
          <>
            <div className="bg-white w-[80vw] lg:w-[30vw] h-full p-10 flex flex-col shadow-xl ">
              <h2 className="text-2xl uppercase font-black text-center leading-tight tracking-tight text-drcuotasPrimary-text w-full h-auto">
                {title}
              </h2>
              <div className="w-full h-full">
                <Image
                  src="/images/banners/banner_full_body.svg"
                  alt=""
                  className="w-full h-full object-cover border"
                  width={238}
                  height={224}
                />
              </div>
            </div>
          </>
          {/* Pagar  */}
          <>
            <div className="bg-white w-[80vw] lg:w-[40vw] h-full p-10 flex flex-col shadow-xl">
              <h2 className="text-2xl  uppercase font-black text-center leading-tight tracking-tight  text-drcuotasPrimary-text w-full h-auto">
                Paga a Cuotas Tu Sueño
              </h2>

              {/* Formulario de Pago */}
              <form className="w-full h-full">
                <>
                  <div className=" h-full w-full flex flex-col gap-2  p-10">
                    <>
                      <div className="w-full h-20 flex gap-2">
                        {/* Selección de plan o nombre */}
                        <div className="w-1/2 ">
                          <label className="text-sm font-medium text-drcuotasTertiary-text text-center leading-tight tracking-tight  truncate">
                            Seleccionar Doctor
                          </label>
                          <select
                            value={selectedDoctorId}
                            onChange={(e) => {
                              // Solo establece el ID del doctor seleccionado
                              setSelectedDoctorId(e.target.value);
                            }}
                          >
                            {doctors.map((doctor) => (
                              <option key={doctor.id} value={doctor.id}>
                                {doctor.first_name} {doctor.last_name} -{' '}
                                {doctor.provincia}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="w-1/2">
                          <label className="text-sm font-medium text-drcuotasTertiary-text text-center leading-tight tracking-tight  truncate">
                            Número de Cuotas
                          </label>
                          <select
                            value={selectedQuota}
                            onChange={(e) =>
                              setSelectedQuota(Number(e.target.value))
                            }
                          >
                            {cuotasOptions.map((quota) => (
                              <option key={quota} value={quota}>
                                {quota} cuotas
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </>
                    <>
                      <h2 className="text-sm  uppercase font-black leading-tight tracking-tight text-drcuotasPrimary-text w-full h-auto">
                        Pago A cuenta Bancaria
                      </h2>
                    </>
                    <>
                      <p className="w-full text-sm  leading-tight tracking-tight  text-drcuotasTertiary-text">
                        Pagando Via Transaccion disrecta ahorra hasta un 1% del
                        vaLor total de tu cirugia
                      </p>
                    </>
                    <>
                      <div className=" h-full border p-10 w-full flex">
                        <div className="justify-center items-center flex flex-col gap-2">
                          <Image
                            src="/images/logo/qr.png"
                            alt="QR"
                            width={158}
                            height={124}
                          />
                          <h2 className="text-xl  uppercase font-black text-center leading-tight tracking-tight  text-drcuotasPrimary-text w-full h-auto">
                            QR
                          </h2>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2">
                          <Image
                            src="/images/logo/banco.jpg"
                            alt="QR"
                            width={158}
                            height={124}
                          />
                          <h2 className="text-xl  uppercase font-black text-center leading-tight tracking-tight  text-drcuotasPrimary-text w-full h-auto">
                            numero: 123456789
                          </h2>
                        </div>
                      </div>
                    </>
                  </div>
                </>
              </form>

              <div className="w-full h-20 flex flex-col justify-center items-center gap-4 mt-10">
                <button
                  onClick={subscribeSurgerie}
                  type="submit"
                  className="w-full h-16 uppercase bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition text-center leading-tight tracking-tight  truncate"
                >
                  Pagar ahora a cuenta bancaria
                </button>
              </div>

              <div className="w-full h-full flex flex-col justify-end items-center gap-2">
                <h2 className="text-xl  uppercase font-black text-center leading-tight tracking-tight text-drcuotasPrimary-text w-full h-auto">
                  Pago por Pasarela
                </h2>
                <h2 className="text-sm  uppercase font-black text-center leading-tight tracking-tight  text-drcuotasPrimary-text w-full h-auto">
                  Pagando Via pasarela tienes la facilidad de pagar por varias{' '}
                  <br />
                  opciones como tarjeta de credito, debito, efectivo y otros
                </h2>

                <>
                  <div className="w-full h-20 flex flex-col justify-center items-center gap-4">
                    <button
                      onClick={subscribeSurgerie}
                      type="submit"
                      className="w-full h-16 uppercase bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition text-center leading-tight tracking-tight  truncate"
                    >
                      Pagar ahora pasarela de pago
                    </button>
                  </div>
                  <>
                    <div className="w-full h-auto flex justify-center items-center">
                      <span className="text-sm text-drcuotasTertiary-text text-center">
                        {selectedCuotas
                          ? `${selectedCuotas} cuotas de $${(price / Number(selectedCuotas)).toFixed(2)}`
                          : 'Seleccione cuotas'}
                        <br /> Para pagar el valor total de ${price}
                      </span>
                    </div>
                  </>
                </>
              </div>
            </div>
          </>
          <>
            <div className="w-auto h-full flex flex-col gap-2">
              <button
                className="  text-drcuotasPrimary hover:text-white bg-white hover:bg-red-500 font-black uppercase border-2 hover:border-red-500 border-drcuotasPrimary w-16 h-10 hidden lg:flex items-center justify-center rounded-xl transition-all duration-300 gap-2"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <span className="font-black uppercase leading-tight tracking-tight text-xs lg:text-base">
                  x
                </span>
              </button>
              <>
                <Link
                  href="/"
                  className="  text-drcuotasPrimary hover:text-white bg-white hover:bg-green-500 font-black uppercase border-2 hover:border-green-500 border-drcuotasPrimary w-16 h-10 hidden lg:flex items-center justify-center rounded-xl transition-all duration-300 gap-2"
                >
                  {/* <span className="uppercase leading-tight tracking-tight text-sm">
                                  Cuenta
                                </span> */}
                  {/* <FiUser className="text-2xl" /> */}
                  <LucideZoomIn className="text-2xl" />
                </Link>
              </>
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default SpecialtyCard;
