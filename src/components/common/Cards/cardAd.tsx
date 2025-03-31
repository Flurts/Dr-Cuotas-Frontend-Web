/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

import settings from '@/settings';

interface Ad {
  id: string;
  image: string;
  link: string;
}

interface CardAdProps {
  id: string;
  image: string;
  link: string;
}

const CardAd: React.FC<CardAdProps> = ({ id, image, link }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const [newImage, setNewImage] = useState<string>('');
  const [newLink, setNewLink] = useState<string>('');

  const fetchAds = async () => {
    console.log('🔄 Recargando anuncios...');
  };

  const updateAd = async (): Promise<void> => {
    const accessToken = localStorage.getItem('accessToken');
    if (!selectedAd || !newImage.trim() || !newLink.trim()) {
      console.warn('⚠️ Datos incompletos');
      return;
    }

    try {
      const requestBody = {
        query: `mutation UpdateAdMutation($link: String!, $image: String!, $updateAdMutationId: String!) {
          updateAdMutation(link: $link, image: $image, id: $updateAdMutationId)
        }`,
        variables: {
          link: newLink,
          image: newImage,
          updateAdMutationId: selectedAd.id,
        },
      };

      const response = await fetch(`${settings.API_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      if (result.errors) {
        console.error('❌ Error en la mutación:', result.errors);
        return;
      }

      await fetchAds();

      setIsEditing(false);
      setSelectedAd(null);
      setNewImage('');
      setNewLink('');
    } catch (error) {
      console.error('❌ Error detallado al actualizar:', error);
    }
  };

  const deleteAd = async (adId: string) => {
    console.log('🔍 ID recibido para eliminar:', adId);
    const accessToken = localStorage.getItem('accessToken');

    try {
      const requestBody = {
        query: `mutation DeleteAdMutation($deleteAdMutationId: String!) {
          deleteAdMutation(id: $deleteAdMutationId)
        }`,
        variables: { deleteAdMutationId: adId },
      };

      const response = await fetch(`${settings.API_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log('📩 Respuesta del servidor:', result);

      if (result.errors) {
        console.error('❌ Error en la mutación de eliminación:', result.errors);
        return;
      }

      // 💡 Elimina el anuncio del estado manualmente antes de recargar
      setSelectedAd(null);
      await fetchAds();
      console.log('✅ Anuncio eliminado correctamente.');
    } catch (error) {
      console.error('❌ Error al eliminar anuncio:', error);
    }
  };

  return (
    <div className="relative w-full h-80 flex justify-center items-center p-10">
      {/* Imagen con blur si está en edición */}
      <img
        src={image}
        alt="Anuncio"
        className={`object-cover rounded-lg w-full h-full cursor-pointer transition-all duration-300 ${
          isEditing ? 'blur-md' : ''
        }`}
        onClick={() => {
          setIsEditing(true);
          setSelectedAd({ id, image, link });
          setNewImage(image);
          setNewLink(link);
        }}
      />

      {/* Botón de eliminar encima del blur */}
      <button
        onClick={async () => {
          await deleteAd(id);
        }}
        className="absolute top-12 right-12 bg-red-600 text-white h-5 w-5 rounded-full text-sm z-20"
      >
        ✕
      </button>

      {/* Formulario sobre la imagen */}
      {isEditing && (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black/60 rounded-lg p-4">
          <input
            type="text"
            placeholder="Nuevo Link"
            value={newLink}
            onChange={(e) => {
              setNewLink(e.target.value);
            }}
            className="border px-4 py-2 rounded-lg w-4/5 mb-2 bg-white"
          />
          <input
            type="text"
            placeholder="Nueva URL de Imagen"
            value={newImage}
            onChange={(e) => {
              setNewImage(e.target.value);
            }}
            className="border px-4 py-2 rounded-lg w-4/5 mb-2 bg-white"
          />
          <div className="flex gap-2">
            <button
              onClick={updateAd}
              className="bg-drcuotasPrimary text-white p-2 rounded-md"
            >
              Guardar
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
              }}
              className="bg-gray-500 text-white p-2 rounded-md"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardAd;
