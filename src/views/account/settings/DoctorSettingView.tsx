/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import settings from '@/settings';
import { getCurrentUser } from '@/store';
import FaqView from '@/views/faq';

interface FormData {
  description: string;
  country: string;
  province: string;
}

export default function DoctorSettingView() {
  const { t } = useTranslation(['common', 'form']);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useSelector(getCurrentUser);

  const [formData, setFormData] = useState<FormData>({
    description: '',
    country: '',
    province: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Mover la obtención de localStorage a useEffect para asegurar que esté en el cliente
  useEffect(() => {
    // Asegurarnos de que estamos en el cliente antes de acceder a localStorage
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('accessToken'));
    }
  }, []);

  // Valida que todos los campos estén completos
  useEffect(() => {
    const { description, country, province } = formData;
    const valid =
      description.trim() !== '' &&
      country.trim() !== '' &&
      province.trim() !== '';
    setIsFormValid(valid);
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDoctor = async () => {
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);

    const mutation = `
      mutation CreateNewDoctor($description: String!, $province: String!, $country: String!) {
        createNewDoctor(description: $description, province: $province, country: $country) {
          status
        }
      }
    `;

    try {
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${settings.API_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            description: formData.description,
            province: formData.province,
            country: formData.country,
          },
        }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();
      if (result.errors) {
        throw new Error(`GraphQL error: ${JSON.stringify(result.errors)}`);
      }

      toast({
        variant: 'success',
        title: 'Solicitud enviada',
        description: 'Tu solicitud ha sido enviada exitosamente.',
      });

      // Limpiar el formulario después de una solicitud exitosa
      setFormData({
        description: '',
        country: '',
        province: '',
      });
    } catch (error) {
      console.error('Error creating doctor:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          'No se pudo procesar tu solicitud. Por favor intenta nuevamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full h-screen">
        <Separator className="my-4" />
        <>
          <div className="w-full border rounded-xl p-10 ">
            <>
              <div className="mb-10">
                <h2 className="text-base font-semibold text-drcuotasTertiary-text leading-tight tracking-tight">
                  Unete a Dr.Cuotas
                </h2>
                <p className="text-sm text-drcuotasTertiary-text leading-tight tracking-tight">
                  Envía una solicitud a nuestros administradores solo si ya has
                  establecido contacto previamente.
                </p>
              </div>
            </>

            <div className="space-y-4 mb-6">
              <div className="flex flex-col">
                <label
                  htmlFor="description"
                  className="mb-2 text-sm font-medium text-gray-600"
                >
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-drcuotasPrimary-bg focus:border-transparent"
                  placeholder="Cuéntanos sobre ti y tu experiencia..."
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="country"
                  className="mb-2 text-sm font-medium text-gray-600"
                >
                  País
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full h-10 px-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-drcuotasPrimary-bg focus:border-transparent"
                  placeholder="Ingresa tu país"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="province"
                  className="mb-2 text-sm font-medium text-gray-600"
                >
                  Provincia
                </label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="w-full h-10 px-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-drcuotasPrimary-bg focus:border-transparent"
                  placeholder="Ingresa tu provincia"
                />
              </div>
            </div>
            <>
              <button
                onClick={handleDoctor}
                disabled={!isFormValid || isSubmitting}
                className={`w-full h-14 border rounded-xl uppercase leading-tight tracking-tight ${
                  isFormValid && !isSubmitting
                    ? 'border-drcuotasPrimary-bg text-white bg-drcuotasPrimary-bg cursor-pointer'
                    : 'border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed'
                }`}
              >
                {isSubmitting
                  ? 'Enviando...'
                  : '¿Te gustaría unirte a nuestro equipo?'}
              </button>
            </>
          </div>
        </>
        <>
          <FaqView />
        </>
      </div>
    </>
  );
}
