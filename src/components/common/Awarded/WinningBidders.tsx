import { useTranslation } from 'next-i18next';
import React from 'react';

// views/awarded.ts
export interface AdjudicatedList {
  quotas_number: string;
  surgery: { name: string };
  user: { first_name: string; last_name: string };
  locality: { name: string };
  date_payment: string;
}

interface WinningBiddersProps {
  adjudicatedData: AdjudicatedList[] | null;
}

const WinningBidders: React.FC<WinningBiddersProps> = ({ adjudicatedData }) => {
  const { t } = useTranslation('common');

  return (
    <>
      <div className="flex justify-center items-center w-full">
        <div className="px-4 sm:px-0 w-full max-w-screen-2xl h-80 mt-6 flex justify-center items-center overflow-x-auto">
          <div className="w-full h-72 md:px-10 xl:px-40 flex flex-col">
            {adjudicatedData === null && (
              <div className="flex justify-center items-center w-full h-72">
                <p className="text-[#6636E2] text-2xl font-bold">
                  {t('noData')}
                </p>
              </div>
            )}

            {adjudicatedData !== null && adjudicatedData.length > 0 && (
              <div className="w-full h-72 md:px-10 xl:px-40 flex flex-col">
                <div className="bg-[#6636E2] text-white  flex justify-center items-center gap-6 sm:gap-12 text-xs p-4 w-[180vw] sm:w-full h-10">
                  <p className="w-[15%] text-center">{t('quotaNumber')}</p>
                  <p className="w-[35%] text-center">{t('surgery')}</p>
                  <p className="w-[30%] text-center">{t('firstName')}</p>
                  <p className="w-[30%] text-center">{t('location')}</p>
                  <p className="w-[30%] text-center">{t('month')}</p>
                  <p className="w-[30%] text-center">{t('year')}</p>
                </div>
                {adjudicatedData.map((user, index) => (
                  <div
                    key={index}
                    className={`bg-${index % 2 === 0 ? 'white' : 'black bg-opacity-5'} flex justify-center items-center gap-6 sm:gap-12 text-xs text-gray-500 p-4 w-[180vw] sm:w-full h-8`}
                  >
                    <p className="w-[15%] text-center">{user.quotas_number}</p>
                    <p className="w-[35%] text-center">{user.surgery.name}</p>
                    <p className="w-[30%] text-center">
                      {user.user.first_name.concat(' ' + user.user.last_name)}
                    </p>
                    <p className="w-[30%] text-center">{user.locality.name}</p>
                    <p className="w-[30%] text-center">{user.date_payment}</p>
                    <p className="w-[30%] text-center">{user.date_payment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WinningBidders;
