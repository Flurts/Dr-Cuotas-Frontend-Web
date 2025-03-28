import Image from 'next/image';
import Link from 'next/link';
import { BiGroup } from 'react-icons/bi';
import { FiZoomIn } from 'react-icons/fi';

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
    <>
      <button className="w-auto h-auto min-w-[200px] min-h-[150px] lg:w-[320px] lg:h-[199px] flex flex-col  hover:z-50 hover:scale-105 transition-all duration-300 rounded-xl gap-4">
        <Link href={link} className="relative w-40 h-40 min-w-[200px] min-h-[150px] lg:w-full lg:h-full rounded-xl">
          <Image
            src={imageSrc}
            alt="Service Image"
            layout="fill"
            objectFit="cover"
            className="rounded-xl blur-sm"
          />
          <div className=" w-40 h-40 min-w-[200px] min-h-[150px] lg:w-full lg:h-full flex flex-col justify-center items-center   rounded-xl">
            <h1 className="text-white lg:text-2xl font-bold leading-tight uppercase tracking-tight z-50">
              {title}
            </h1>
            <p className="text-white font-bold w-full flex justify-center items-center line-clamp-2 text-center leading-tight tracking-tight z-50">
            <FiZoomIn className='text-6xl'/>
            </p>
          </div>
        </Link>
      </button>
    </>

    // <a
    //   href={link}
    //   className="w-[270px] h-96 rounded-3xl flex flex-col justify-between items-center shadow-sm hover:shadow-lg hover:shadow-drcuotasSecondaryPrimaryColor hover:z-50 transition-all duration-300 "
    // >
    //   <div className="bg-white w-full h-full flex flex-col justify-between items-center rounded-[16px] overflow-hidden">
    // <div className="relative w-full h-2/3">
    //   <Image
    //     src={imageSrc}
    //     alt="Service Image"
    //     layout="fill"
    //     objectFit="cover"
    //     className="rounded-t-[16px]"
    //   />
    // </div>

    // <div className="w-full flex flex-col justify-center items-center gap-2 p-5">
    //   <h1 className="text-drcuotasSecondary-text text-lg font-bold">
    //     {title}
    //   </h1>
    //   <p className="text-drcuotasTertiary-text text-base w-40 line-clamp-2 text-center">
    //     {description}
    //   </p>
    // </div>
    //   </div>
    // </a>
  );
};

export default ServiceCard;
