import { useEffect, useState } from 'react';

import settings from '@/settings';

import CardAd from './Cards/cardAd';

// Define interfaces para TypeScript
interface Ad {
  id: string;
  image: string;
  link: string;
}

const AdComponent = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [newImage, setNewImage] = useState<string>('');
  const [newLink, setNewLink] = useState<string>('');
  const [isCreating, setIsCreating] = useState<boolean>(false);

  // Función reutilizable para obtener los anuncios
  const fetchAds = async (): Promise<void> => {
    try {
      console.log('🔄 Cargando anuncios...');
      const response = await fetch(`${settings.API_URL}/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `query GetAdsQuery { getAdsQuery { image link id } }`,
        }),
      });

      const result = await response.json();
      console.log('✅ Anuncios recibidos:', result.data.getAdsQuery);
      setAds(result.data.getAdsQuery);
    } catch (error) {
      console.error('❌ Error al obtener anuncios:', error);
    }
  };

  useEffect(() => {
    void fetchAds();
  }, []);

  const createAd = async () => {
    if (!newImage.trim() || !newLink.trim()) {
      console.warn('⚠️ Datos incompletos.');
      return;
    }

    try {
      console.log('📡 Creando anuncio...');

      const requestBody = {
        query: `mutation CreateAdMutation($link: String!, $image: String!) {
          createAdMutation(link: $link, image: $image)
        }`,
        variables: {
          link: newLink,
          image: newImage,
        },
      };

      const response = await fetch(`${settings.API_URL}/graphql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log('📩 Respuesta del servidor:', result);

      if (result.errors) {
        console.error('❌ Error en la mutación:', result.errors);
        return;
      }

      // Recargar anuncios después de la creación
      await fetchAds();

      // Resetear inputs
      setNewImage('');
      setNewLink('');
      setIsCreating(false);

      console.log('✅ Anuncio creado correctamente.');
    } catch (error) {
      console.error('❌ Error al crear anuncio:', error);
    }
  };

  return (
    <div className="flex flex-col gap-20 rounded-lg w-full h-full justify-start items-center">
      <div className="w-full flex flex-col justify-start items-center">
        <span className="uppercase font-black leading-tight tracking-tight truncate text-drcuotasPrimary-text text-8xl">
          Tabla de anuncios
        </span>
      </div>

      <div className="grid grid-cols-2 w-full overflow-auto gap-y-0">
        {ads.map((ad) => (
          <CardAd key={ad.id} id={ad.id} image={ad.image} link={ad.link} />
        ))}

        {/* Formulario de creación, del mismo tamaño que los anuncios */}
        <div className="relative w-[750px] ml-10 h-60 flex justify-center mt-10 items-center border-2 border-dashed border-drcuotasPrimary rounded-lg">
          {isCreating ? (
            <div className="bg-white  rounded-lg flex flex-col gap-4 w-full h-[300px] justify-center items-center">
              <input
                type="text"
                placeholder="Nuevo Link"
                value={newLink}
                onChange={(e) => {
                  setNewLink(e.target.value);
                }}
                className="border px-4 h-12 rounded-lg w-full border-drcuotasPrimary"
              />
              <input
                type="text"
                placeholder="Nueva URL de Imagen"
                value={newImage}
                onChange={(e) => {
                  setNewImage(e.target.value);
                }}
                className="border px-4 h-12 rounded-lg w-full  border-drcuotasPrimary"
              />
              <div className="flex gap-4">
                <button
                  onClick={createAd}
                  className="bg-drcuotasPrimary text-white p-2 rounded-md w-full"
                >
                  Crear
                </button>
                <button
                  onClick={() => {
                    setIsCreating(false);
                  }}
                  className="bg-gray-500 text-white p-2 rounded-md w-full"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsCreating(true);
              }}
              className="text-gray-500 text-lg font-bold"
            >
              + Agregar Anuncio
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdComponent;
