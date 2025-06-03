/* eslint-disable @next/next/no-html-link-for-pages */
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaStar } from 'react-icons/fa';

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
    router.push(`/store/${id}`);
    // O si prefieres usar el slug generado:
    // router.push(`/surgery/${slug}?id=${id}`);
  };

  return (
   <>
    <div
  className="w-60 lg:w-[400px] h-[500px] relative overflow-hidden shadow-2xl border-2 border-white cursor-pointer hover:shadow-md transition-shadow duration-300"
  onClick={handleCardClick}
>
  <div className="block w-full h-full relative">
    <Image
      src={imageUrl || '/images/elements/girl_footer.svg'}
      alt={title}
      layout="fill"
      objectFit="cover"
      className="z-0"
    />
    {/* Overlay oscuro */}
    <div className="absolute inset-0 bg-white backdrop-blur-sm bg-opacity-20 z-10"></div>

    {/* Contenido sobre la imagen */}
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-white text-xl font-bold uppercase tracking-wide">
        {title}
      </h1>
      <p className="text-white text-sm font-bold">
        ${price}
      </p>
    </div>
  </div>
    </div>
   </>
  );
};

export default SpecialtyCard;