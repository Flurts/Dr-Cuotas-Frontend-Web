/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';

import settings from '@/settings';

const EvidenceType = {
  YOUTUBE: 'YOUTUBE',
  MEDIA: 'MEDIA',
};

export const EvidenceForm = () => {
  const [type, setType] = useState(EvidenceType.YOUTUBE);
  const [link, setLink] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');
  const accessToken = localStorage.getItem('accessToken');

  // Función para convertir archivo a base64
  const convertToBase64 = async (file: File): Promise<string> => {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Error al convertir archivo a base64'));
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // Manejar selección de archivo
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        setMessage('Error: Por favor selecciona un archivo de imagen válido');
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage('Error: El archivo es muy grande. Máximo 5MB');
        return;
      }

      try {
        setImageFile(file);
        const base64 = await convertToBase64(file);
        setImage(base64);
        setImagePreview(base64);
        setMessage('');
      } catch (error) {
        setMessage('Error: No se pudo procesar la imagen');
        console.error('Error al convertir imagen:', error);
      }
    }
  };

  // Manejar cambio de URL de imagen
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImage(url);
    setImagePreview(url);
  };

  // Limpiar imagen
  const clearImage = () => {
    setImage('');
    setImageFile(null);
    setImagePreview('');
    // Limpiar el input file
    const fileInput = document.getElementById('imageFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch(`${settings.API_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({
          query: `
            mutation CreateEvidence($type: EvidenceType!, $link: String!, $image: String!) {
              createEvidence(type: $type, link: $link, image: $image)
            }
          `,
          variables: {
            type,
            link,
            image,
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      setMessage('Evidencia creada exitosamente');
      setLink('');
      clearImage();
    } catch (error) {
      setMessage(`Error: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 border border-drcuotasPrimary-bg mx-10">
      <h2 className="text-2xl font-bold text-drcuotasPrimary-text mb-6">
        Crear Evidencia
      </h2>

      {message && (
        <div
          className={`p-3 mb-4 rounded ${
            message.includes('Error')
              ? 'bg-red-100 text-red-700'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="type"
          >
            Tipo de Evidencia
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value={EvidenceType.YOUTUBE}>YouTube</option>
            <option value={EvidenceType.MEDIA}>Media</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="link"
          >
            Enlace
          </label>
          <input
            id="link"
            type="text"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
            placeholder="https://"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Imagen
          </label>

          {/* Selector de método de carga */}
          <div className="flex gap-4 mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="url"
                checked={uploadMethod === 'url'}
                onChange={(e) => {
                  setUploadMethod(e.target.value as 'url' | 'file');
                  clearImage();
                }}
                className="mr-2"
              />
              URL de imagen
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="file"
                checked={uploadMethod === 'file'}
                onChange={(e) => {
                  setUploadMethod(e.target.value as 'url' | 'file');
                  clearImage();
                }}
                className="mr-2"
              />
              Subir archivo
            </label>
          </div>

          {uploadMethod === 'url' ? (
            <input
              id="image"
              type="text"
              value={image}
              onChange={handleImageUrlChange}
              placeholder="https://ejemplo.com/imagen.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          ) : (
            <div className="space-y-4">
              <input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                required
              />
              <p className="text-sm text-gray-500">
                Formatos soportados: JPG, PNG, GIF, WebP. Máximo 5MB.
              </p>
            </div>
          )}

          {/* Vista previa de la imagen */}
          {imagePreview && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Vista previa:
                </span>
                <button
                  type="button"
                  onClick={clearImage}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Eliminar
                </button>
              </div>
              <div className="border-2 border-gray-200 rounded-lg p-2">
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  className="max-w-full max-h-48 object-contain rounded"
                />
              </div>
              {imageFile && (
                <p className="text-xs text-gray-500 mt-2">
                  Archivo: {imageFile.name} (
                  {(imageFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !image}
          className="w-full bg-drcuotasPrimary hover:bg-drcuotasSecondaryPrimaryColor-bg text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Procesando...' : 'Crear Evidencia'}
        </button>
      </form>
    </div>
  );
};

export default EvidenceForm;
