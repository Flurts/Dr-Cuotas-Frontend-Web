/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @next/next/no-html-link-for-pages */
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

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
  const router = useRouter();

  // Función para formatear el precio con separadores de miles
  const formatPrice = (price: number): string => {
    // Opción 1: Usando toLocaleString() - Más automático
    return price.toLocaleString('es-CO'); // Para Colombia usa puntos como separador de miles

    // Opción 2: Usando toLocaleString() con configuración personalizada
    // return price.toLocaleString('es', {
    //   minimumFractionDigits: 0,
    //   maximumFractionDigits: 0
    // });

    // Opción 3: Formateo manual con puntos
    // return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Opción 4: Formateo manual con comas (estilo estadounidense)
    // return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Función para generar el slug basado en el título
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remover caracteres especiales
      .replace(/\s+/g, '-') // Reemplazar espacios con guiones
      .replace(/-+/g, '-') // Remover guiones duplicados
      .trim();
  };

  // Función para manejar el click y redirigir
  const handleCardClick = () => {
    const slug = generateSlug(title);
    // Redirigir a la página del producto con el ID
    console.log(
      `Redirigiendo a /store/${id}?adjudicatedId=${id} o /surgery/${slug}?id=${id}`,
    );
    localStorage.setItem('selectedSurgeryId', id); // Guardar el ID en localStorage
    router.push(`/store/${id}`);
    // O si prefieres usar el slug generado:
    // router.push(`/surgery/${slug}?id=${id}`);
  };

  return (
    <>
      <div
        className="w-80 lg:w-450px] h-[400px] relative overflow-hidden border-2 border-white cursor-pointer  transition-shadow duration-300"
        onClick={handleCardClick}
      >
        <div className="block w-full h-full relative shadow-2xl shadow-">
          <Image
            src={imageUrl || '/images/elements/girl_footer.svg'}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="z-0"
          />
          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(192,132,252,0.5)] to-[rgba(59,130,246,0.5)]   z-10"></div>

          {/* Contenido sobre la imagen */}
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center text-center">
            <h1 className="text-white text-xl font-black uppercase tracking-wide">
              {title}
            </h1>
            <p className="text-green-500 text-xl font-bold">
              ${formatPrice(price)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialtyCard;
