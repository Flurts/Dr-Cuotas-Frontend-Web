import Image from 'next/image';

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
      <button className="w-[320px] h-[199px] flex flex-col justify-center items-center  shadow-lg hover:shadow-md hover:shadow-drcuotasSecondaryPrimaryColor hover:z-50 hover:scale-105 transition-all duration-300  rounded-3xl gap-4">
        <div className="relative w-full h-full">
    <Image
      src={imageSrc}
      alt="Service Image"
      layout="fill"
      objectFit="cover"
      className="rounded-[16px]  blur-sm"
    />
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-2 p-4 bg-white bg-opacity-40  rounded-[16px]">
        <h1 className="text-drcuotasPrimary text-xl font-bold uppercase">
          {title}
        </h1>
        <p className="text-drcuotasTertiary-text text-xs w-40 line-clamp-2 text-center">
          {description}
        </p>
      </div>
    </div>

        {/* <div className="w-full flex flex-col justify-center items-center gap-2 p-5">
          <h1 className="text-drcuotasSecondary-text text-lg font-bold">
            {title}
          </h1>
          <p className="text-drcuotasTertiary-text text-base w-40 line-clamp-2 text-center">
            {description}
          </p>
        </div> */}
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
