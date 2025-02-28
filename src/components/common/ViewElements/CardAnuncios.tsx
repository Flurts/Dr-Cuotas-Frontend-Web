import Link from 'next/link';
import React from 'react';

interface AdBannerProps {
  imageUrl: string;
  title: string;
  buttonText: string;
  link: string;
}

const AdBanner: React.FC<AdBannerProps> = ({
  imageUrl,
  title,
  buttonText,
  link,
}) => {
  return (
    <div className="relative w-96 h-72 bg-white rounded-2xl shadow-lg overflow-hidden flex items-center p-4 border border-gray-200">
      <div className="w-32 h-32 flex-shrink-0">
        <img
          src={imageUrl}
          alt="Ad Image"
          className="w-full h-full object-contain rounded-xl"
        />
      </div>
      <div className="ml-6 flex-1">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <Link href={link} legacyBehavior>
          <a className="mt-3 px-4 py-2 inline-block text-base font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition">
            {buttonText}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default AdBanner;
