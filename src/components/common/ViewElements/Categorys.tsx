import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';

function Categorys({
  categorys,
}: {
  categorys: Array<{ type: string; img: string; href: string }>;
}) {
  const { t } = useTranslation('common');
  return (
    <div className="flex flex-col md:flex-row gap-2   md:px-8 w-full ">
      {categorys.map((category, index) => (
        <Link key={index} href={category.href}>
          <div className="flex flex-col items-center  justify-center relative">
            <Image
              className="w-full h-10 md:h-full"
              src={category.img}
              alt={category.type}
              width={280}
              height={280}
            />

            <span className="bg-[#9665FF] backdrop-blur-sm  md:bg-[#9665FF] md:bg-opacity-100   w-80 h-full md:w-full md:h-8 lg:h-10  flex justify-center items-center   text-white text-center text-xs  md:text-sm xl:text-xl font-bold md:font-semibold absolute bottom-0 ">
              {t(`${category.type}`)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Categorys;
