/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client';
import { LucideImage, LucidePlus, LucideTrash2, LucideX } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
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
    surgeryImages: [] as Array<{
      id: string;
      file: File;
      base64: string;
      name: string;
      size: number;
      type: string;
      preview: string;
    }>, // Cambio: array de imágenes en lugar de una sola
  });

  // Ref para el input de archivos
  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  // Función para convertir archivo a base64
  const convertToBase64 = async (file: File): Promise<string> => {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // Función para manejar la selección de archivos
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.target.files || []);

    // Validar que no exceda el límite de imágenes (3 en este caso)
    if (newSurgery.surgeryImages.length + files.length > 3) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Solo puedes subir máximo 3 imágenes',
      });
      return;
    }

    // Validar tamaño de archivos (5MB por archivo)
    const invalidFiles = files.filter((file) => file.size > 5 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Algunos archivos son muy grandes. Máximo 5MB por imagen.',
      });
      return;
    }

    // Validar tipos de archivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const invalidTypes = files.filter(
      (file) => !validTypes.includes(file.type),
    );
    if (invalidTypes.length > 0) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Solo se permiten archivos JPG, JPEG, PNG o WebP',
      });
      return;
    }

    try {
      // Convertir archivos a base64
      const imagePromises = files.map(async (file) => {
        const base64 = await convertToBase64(file);
        return {
          id: Date.now() + Math.random() + '',
          file,
          base64,
          name: file.name,
          size: file.size,
          type: file.type,
          preview: URL.createObjectURL(file),
        };
      });

      const newImages = await Promise.all(imagePromises);
      setNewSurgery((prev) => ({
        ...prev,
        surgeryImages: [...prev.surgeryImages, ...newImages],
      }));
    } catch (error) {
      console.error('Error al procesar las imágenes:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Error al procesar las imágenes',
      });
    }

    // Limpiar el input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Función para eliminar una imagen
  const removeImage = (imageId: string) => {
    setNewSurgery((prev) => {
      const updated = prev.surgeryImages.filter((img) => img.id !== imageId);
      // Limpiar URLs de objeto para evitar memory leaks
      const imageToRemove = prev.surgeryImages.find(
        (img) => img.id === imageId,
      );
      if (imageToRemove?.preview) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return {
        ...prev,
        surgeryImages: updated,
      };
    });
  };

  // Función para formatear el tamaño del archivo
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

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

  // Función para manejar la subida de imagen de perfil - IMPLEMENTADA COMPLETA
  const handleImageUpload = async (file: File) => {
    try {
      // Validar que sea una imagen
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Solo se permiten archivos JPG, JPEG, PNG o WebP',
        });
        return;
      }

      // Validar tamaño (5MB máximo)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'La imagen es muy grande. Máximo 5MB.',
        });
        return;
      }

      // Convertir a base64
      const base64 = await convertToBase64(file);

      // Mutación GraphQL para actualizar la foto de perfil
      const updateProfileImageMutation = `
        mutation UpdateProfileImage($image: String!) {
          updateProfileImage(image: $image) {
            success
            message
            user {
              id
              profile_picture
              first_name
              last_name
            }
          }
        }
      `;

      const accessToken = localStorage.getItem('accessToken');

      const response = await fetch(`${settings.API_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({
          query: updateProfileImageMutation,
          variables: {
            image: base64,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (data.errors) {
        throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);
      }

      if (data.data?.updateProfileImage?.success) {
        toast({
          variant: 'success',
          title: 'Éxito',
          description: 'Imagen de perfil actualizada correctamente',
        });

        // Aquí podrías actualizar el estado global del usuario si usas Redux
        // dispatch(updateUserProfilePicture(data.data.updateProfileImage.user.profile_picture));
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description:
            data.data?.updateProfileImage?.message ||
            'No se pudo actualizar la imagen',
        });
      }
    } catch (error) {
      console.error('Error uploading profile image:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Ocurrió un error al subir la imagen',
      });
    }
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

      // Prepare mutation variables - INCLUYE LAS IMÁGENES EN BASE64
      const surgeryVariables = {
        surgery: {
          name: newSurgery.name,
          description: newSurgery.description,
          amount,
          status: newSurgery.status,
          type: newSurgery.surgeryType,
          category: newSurgery.surgeryCategory,
          // Agregar las imágenes en base64
          images: newSurgery.surgeryImages.map((img) => ({
            name: img.name,
            base64: img.base64,
            size: img.size,
            type: img.type,
          })),
        },
      };

      // Log para verificar los datos
      console.log('Datos de la cirugía con imágenes:', surgeryVariables);

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
          description: `La cirugía se ha creado exitosamente con ${newSurgery.surgeryImages.length} imágenes`,
        });

        // Reset form and close modal
        // Limpiar URLs de objetos antes de resetear
        newSurgery.surgeryImages.forEach((img) => {
          if (img.preview) {
            URL.revokeObjectURL(img.preview);
          }
        });

        setNewSurgery({
          name: '',
          description: '',
          amount: '',
          status: Status.Inactive,
          surgeryType: SurgeryTypes.Rhinoplasty,
          surgeryCategory: SurgeryCategories.GeneralSurgeries,
          surgeryImages: [],
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
              onChange={handleImageUpload}
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
            <Link
              href="/account/settings"
              className="w-full  sm:w-40 h-14 flex flex-row justify-center items-center gap-2 bg-white border border-drcuotasPrimary-bg text-drcuotasPrimary-text rounded-xl"
            >
              <IoSettings className="text-2xl" />
              <span className="leading-tight tracking-tight">Perfil</span>
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

      {/* Surgery Creation Modal - MODIFICADO */}
      {isSurgeryModalOpen && (
        <div className="fixed inset-0 w-full h-full backdrop-blur-md bg-drcuotasSecondary-bg bg-opacity-60 flex flex-col-reverse lg:flex-row justify-center items-center z-50 gap-2 p-10">
          {/* Panel de Imágenes - COMPLETAMENTE RENOVADO */}
          <div className="w-[40vw] h-[45vw] bg-white rounded-xl hidden lg:flex flex-col p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-drcuotasPrimary-text font-black uppercase leading-tight tracking-tight">
                Subir Imagenes ({newSurgery.surgeryImages.length}/3)
              </h2>
            </div>

            {/* Input oculto para archivos */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="w-full h-full rounded-xl flex flex-col gap-2 py-4">
              {/* Botón para seleccionar archivos */}
              {newSurgery.surgeryImages.length < 3 && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-40 rounded-xl border-2 border-dashed border-drcuotasPrimary-bg flex flex-col justify-center items-center hover:border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <LucideImage className="text-2xl text-drcuotasPrimary-text mb-2" />
                  <span className="text-drcuotasPrimary-text font-medium">
                    Seleccionar Imágenes
                  </span>
                  <span className="text-xs text-gray-500 mt-1">
                    JPG, PNG, WebP (máx. 5MB)
                  </span>
                </button>
              )}

              {/* Vista previa de imágenes seleccionadas */}
              {newSurgery.surgeryImages.map((image) => (
                <div
                  key={image.id}
                  className="w-full h-40 rounded-xl border border-drcuotasPrimary-bg relative overflow-hidden"
                >
                  <img
                    src={image.preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => {
                        removeImage(image.id);
                      }}
                      className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <LucideTrash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                    <p className="text-xs truncate">{image.name}</p>
                    <p className="text-xs">{formatFileSize(image.size)}</p>
                  </div>
                </div>
              ))}

              {/* Mostrar slots vacíos */}
              {Array.from(
                { length: 3 - newSurgery.surgeryImages.length },
                (_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="w-full h-40 rounded-xl border border-dashed border-gray-300 flex justify-center items-center opacity-30"
                  >
                    <LucidePlus className="text-2xl text-gray-400" />
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Panel del Formulario - SIN CAMBIOS */}
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
                <button
                  type="submit"
                  className="w-full bg-drcuotasPrimary-text text-sm text-white leading-tight font-bold tracking-tight h-10 xl:h-14 rounded-xl"
                >
                  Crear Cirugía ({newSurgery.surgeryImages.length} imágenes)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
