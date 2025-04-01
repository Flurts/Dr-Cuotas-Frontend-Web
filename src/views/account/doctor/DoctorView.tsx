'use client';
import { LucidePlus, LucideX } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoSettings } from 'react-icons/io5';
import { useSelector } from 'react-redux';

import DrViewCard from '@/components/common/Cards/drViewCard';
import CustomImageUploader from '@/components/common/Editable/UserImage';
import EvidenceForm from '@/components/common/ViewElements/formEvidence';
import { useToast } from '@/components/ui/use-toast';
import settings from '@/settings';
import { getCurrentUser } from '@/store';
import {
  Status,
  SurgeryCategories,
  SurgeryTypes,
  useCreateNewSurgerieMutation,
} from '@/types';

export default function DoctorView() {
  const user = useSelector(getCurrentUser);
  const { toast } = useToast();
  const [createSurgery] = useCreateNewSurgerieMutation();
  const [userData, setUserData] = useState<{
    first_name: string;
    last_name: string;
  } | null>(null);
  // State for surgery creation
  const [isSurgeryModalOpen, setIsSurgeryModalOpen] = useState(false);
  const [surgeries, setSurgeries] = useState<any[]>([]);
  const [newSurgery, setNewSurgery] = useState({
    name: '',
    description: '',
    amount: '',
    status: Status.Inactive,
    surgeryType: SurgeryTypes.Rhinoplasty,
    surgeryCategory: SurgeryCategories.GeneralSurgeries,
    surgeryImage: null as File | null,
  });
  const router = useRouter();
  const getUserData = async () => {
    const query = `
      query GetUserData {
        getUserData {
          user {
            first_name
            last_name
          }
        }
      }
    `;

    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await fetch(`${settings.API_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      const data = await response.json();
      if (data.errors)
        throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);

      console.log('Datos del usuario:', data.data.getUserData.user);
      return data.data.getUserData.user;
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      router.push('/login');

      return null;
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      if (data) {
        setUserData(data);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setNewSurgery((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (file: File) => {
    setNewSurgery((prev) => ({
      ...prev,
      surgeryImage: file,
    }));
  };

  const handleCreateSurgery = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate inputs
      if (!newSurgery.name || !newSurgery.description || !newSurgery.amount) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Por favor complete todos los campos obligatorios',
        });
        return;
      }

      // Convert amount to number
      const amount = parseFloat(newSurgery.amount);
      if (isNaN(amount)) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'El monto debe ser un número válido',
        });
        return;
      }

      // Prepare mutation variables
      const surgeryVariables = {
        surgery: {
          name: newSurgery.name,
          description: newSurgery.description,
          amount,
          status: newSurgery.status,
          type: newSurgery.surgeryType,
          category: newSurgery.surgeryCategory,
        },
      };

      // Perform mutation
      const response = await createSurgery({
        variables: surgeryVariables,
      });

      // Handle response
      if (response.data?.createNewSurgerie) {
        // Add new surgery to list
        setSurgeries((prev) => [...prev, response.data?.createNewSurgerie]);

        // Show success toast
        toast({
          variant: 'success',
          title: 'Cirugía Creada',
          description: 'La cirugía se ha creado exitosamente',
        });

        // Reset form and close modal
        setNewSurgery({
          name: '',
          description: '',
          amount: '',
          status: Status.Inactive,
          surgeryType: SurgeryTypes.Rhinoplasty,
          surgeryCategory: SurgeryCategories.GeneralSurgeries,
          surgeryImage: null,
        });
        setIsSurgeryModalOpen(false);
      } else {
        // Handle error
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'No se pudo crear la cirugía',
        });
      }
    } catch (error) {
      console.error('Error creating surgery:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Ocurrió un error al crear la cirugía',
      });
    }
  };

  return (
    <div className="w-full min-h-screen">
      {/* Banner with gradient */}
      <div className="h-72 bg-gradient-to-b from-white to-drcuotasPrimary-bg" />

      {/* Main Container */}
      <div className="px-6 pb-6  flex flex-col justify-center gap-4">
        {/* Profile header */}
        <div className="flex flex-col md:flex-row gap-4 -mt-16 items-center">
          {/* Doctor Image */}
          <div className="h-32 w-32 border-2 border-white bg-gray-200 rounded-full overflow-hidden shadow-md">
            <CustomImageUploader
              width={120}
              height={120}
              imageUrl={user.profile_picture ?? undefined}
            />
          </div>

          {/* Doctor Information  @@ */}
          <div className="w-full flex-1 text-center md:text-left">
            <h1 className="text-2xl lg:text-4xl uppercase mb-5 font-black leading-tight tracking-tight text-drcuotasPrimary-text md:text-white">
              {user?.first_name && user?.last_name
                ? ` Dr ${user.first_name} ${user.last_name}`
                : `Dr ${userData?.first_name ?? ''} ${userData?.last_name ?? ''}`}
            </h1>
            <p className="text-sm uppercase font-bold leading-tight tracking-tight text-drcuotasPrimary-text">
              Doctor Registrado
            </p>
          </div>

          {/* Buttons */}
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 items-center justify-end">
            {/* <DoctorInfo
              user={user}
              // Add placeholder handlers if not defined
              editInfoHandler={() => {}}
              cvHandler={() => {}}
              imagesHandler={() => {}}
            /> */}

            <Link
              href="/account/settings"
              className="w-full  sm:w-40 h-14 flex flex-row justify-center items-center gap-2 bg-white border border-drcuotasPrimary-bg text-drcuotasPrimary-text rounded-xl"
            >
              <IoSettings className="text-2xl" />
              <span className="leading-tight tracking-tight">
                {/* {t('uploadCv')} */}
                Perfil
              </span>
            </Link>

            {/* New Surgery Creation Button */}
            <button
              onClick={() => {
                setIsSurgeryModalOpen(true);
              }}
              className="w-full sm:w-40 h-14 flex flex-row justify-center items-center gap-2 bg-drcuotasPrimary-bg border border-white text-white rounded-xl"
            >
              <span className="w-full">Crear Cirugía</span>
            </button>
          </div>
        </div>

        {/* Surgeries List */}
        <DrViewCard />
        <EvidenceForm />
      </div>

      {/* Surgery Creation Modal */}
      {isSurgeryModalOpen && (
        <div className="fixed inset-0 w-full h-full backdrop-blur-md bg-drcuotasSecondary-bg bg-opacity-60 flex flex-col-reverse lg:flex-row justify-center items-center z-50 gap-2 p-10">
          <>
            <div className="w-[40vw] h-[45vw] bg-white rounded-xl hidden lg:flex flex-col p-4">
              <h2 className="text-xl text-drcuotasPrimary-text font-black uppercase leading-tight tracking-tight">
                Subir Imagenes
              </h2>
              <div className="w-full h-full rounded-xl flex flex-col items-center gap-2 py-4">
                <>
                  <button className="w-full h-40  rounded-xl border border-drcuotasPrimary-bg flex justify-center items-center">
                    <LucidePlus className="text-2xl text-drcuotasPrimary-text" />
                  </button>
                </>
                <>
                  <button className="w-full h-40  rounded-xl border border-drcuotasPrimary-bg flex justify-center items-center">
                    <LucidePlus className="text-2xl text-drcuotasPrimary-text" />
                  </button>
                </>
                <>
                  <button className="w-full h-40  rounded-xl border border-drcuotasPrimary-bg flex justify-center items-center">
                    <LucidePlus className="text-2xl text-drcuotasPrimary-text" />
                  </button>
                </>
              </div>
            </div>
          </>
          <>
            <div className="w-full h-screen lg:h-[45vw] bg-white rounded-xl  relative p-4 flex flex-col ">
              {/* Close Button */}
              <button
                onClick={() => {
                  setIsSurgeryModalOpen(false);
                }}
                className="absolute top-4 right-4 "
              >
                <LucideX className="w-6 h-6" />
              </button>

              <div className="w-full mb-2">
                <h2 className="text-xl hidden lg:block text-drcuotasPrimary-text font-black uppercase leading-tight tracking-tight">
                  Formulario para Crear Cirugia
                </h2>
                <h2 className="text-xl block lg:hidden text-drcuotasPrimary-text font-black uppercase leading-tight tracking-tight">
                  Crear Cirugia
                </h2>
              </div>

              <form
                onSubmit={handleCreateSurgery}
                className="w-full h-full flex flex-col gap-2 lg:gap-2"
              >
                {/* Name Input */}
                <div>
                  <label className="text-xs lg:text-sm text-drcuotasPrimary-text uppercase leading-tight tracking-tight">
                    Nombre de la Cirugía
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newSurgery.name}
                    onChange={handleInputChange}
                    className="w-full border rounded-xl h-10 xl:h-14 p-2 text-xs text-drcuotasTertiary-text border-drcuotasPrimary-bg leading-tight tracking-tight"
                    placeholder="Nombre de la cirugía"
                    required
                  />
                </div>

                {/* Description Input */}
                <div className="w-full">
                  <label className="text-xs lg:text-sm text-drcuotasPrimary-text uppercase leading-tight tracking-tight">
                    Descripción
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={newSurgery.description}
                    onChange={handleInputChange}
                    className="w-full border border-drcuotasPrimary-bg rounded-xl h-10 xl:h-14 p-2 text-xs text-drcuotasTertiary-text leading-tight tracking-tight"
                    placeholder="Descripción de la cirugía"
                    required
                  />
                </div>

                {/* Amount Input */}
                <div>
                  <label className="text-xs lg:text-sm text-drcuotasPrimary-text uppercase leading-tight tracking-tight">
                    Monto
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={newSurgery.amount}
                    onChange={handleInputChange}
                    className="w-full border border-drcuotasPrimary-bg rounded-xl h-10 xl:h-14 p-2 text-xs text-drcuotasTertiary-text leading-tight tracking-tight"
                    placeholder="Monto de la cirugía"
                    required
                  />
                </div>

                <div className="w-full flex flex-row gap-4">
                  {/* Surgery Type Select */}
                  <div>
                    <label className="text-xs lg:text-sm text-drcuotasPrimary-text uppercase leading-tight tracking-tight">
                      {' '}
                      Tipo de Cirugía{' '}
                    </label>
                    <select
                      name="surgeryType"
                      value={newSurgery.surgeryType}
                      onChange={handleInputChange}
                      className="w-full border border-drcuotasPrimary-bg rounded-xl h-10 xl:h-14 p-2 text-xs text-drcuotasTertiary-text leading-tight tracking-tight"
                    >
                      {Object.values(SurgeryTypes).map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Surgery Category Select */}
                  <div className="w-full">
                    <label className="text-xs lg:text-sm text-drcuotasPrimary-text uppercase leading-tight tracking-tight">
                      Categoría
                    </label>
                    <select
                      name="surgeryCategory"
                      value={newSurgery.surgeryCategory}
                      onChange={handleInputChange}
                      className="w-full border border-drcuotasPrimary-bg rounded-xl h-10 xl:h-14 p-2 text-xs text-drcuotasTertiary-text leading-tight tracking-tight"
                    >
                      {Object.values(SurgeryCategories).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Status Select */}
                <div>
                  <label className="text-xs lg:text-sm text-drcuotasPrimary-text uppercase leading-tight tracking-tight">
                    Estado
                  </label>
                  <select
                    name="status"
                    value={newSurgery.status}
                    onChange={handleInputChange}
                    className="w-full border border-drcuotasPrimary-bg rounded-xl h-10 xl:h-14 p-2 text-xs text-drcuotasTertiary-text leading-tight tracking-tight"
                  >
                    {Object.values(Status).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full flex flex-row gap-4">
                  <>
                    <button
                      type="submit"
                      className="w-full bg-drcuotasPrimary-text text-sm text-white leading-tight font-bold tracking-tight h-10 xl:h-14 rounded-xl"
                    >
                      Crear Cirugía
                    </button>
                  </>
                </div>
              </form>
            </div>
          </>
        </div>
      )}
    </div>
  );
}
