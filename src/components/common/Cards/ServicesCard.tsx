import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
  imageSrc: string;
  link: string;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  imageSrc,
  link,
  title,
  description,
}) => {
  return (
    <div className="w-[400px] h-[500px] relative overflow-hidden shadow-2xl border-2 border-white  hover:shadow-md transition-shadow duration-300">
      <Link href={link} className="block w-full h-full relative">
        <Image
          src={imageSrc}
          alt="Service Image"
          layout="fill"
          objectFit="cover"
          className="z-0"
          loading="lazy"
        />
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-white backdrop-blur-sm bg-opacity-20 z-10"></div>

        {/* Contenido sobre la imagen */}
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-xl font-bold uppercase tracking-wide">
            {title}
          </h1>
          <p className="text-white text-xs">{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default ServiceCard;
