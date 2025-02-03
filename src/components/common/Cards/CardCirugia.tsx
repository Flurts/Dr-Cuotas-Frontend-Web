import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { IoIosArrowDown, IoMdArrowDropdown } from 'react-icons/io';

import { Adjudicated, Adjudicated_Status } from '@/types';
import { Payment_Status } from '@/utils/constants';

import Cuotes from './Cuotes';

function createCuotas(
  totalQuotas: number,
  quotasPaid: number,
  startDatePayment: Date | string,
  endDatePayment: Date | string,
) {
  const cuotas = [];
  const currentDate = new Date();
  const proximityThresholdDays = 7; // Número de días para considerar una cuota como "Proximity"

  // Asegurarse de que startDatePayment y endDatePayment sean instancias de Date
  const startDate = new Date(startDatePayment);
  const endDate = new Date(endDatePayment);

  // Calcular la duración total en milisegundos entre las fechas de inicio y fin de pago
  const totalDuration = endDate.getTime() - startDate.getTime();
  // Calcular la duración entre cada cuota en milisegundos
  const cuotaDuration = totalDuration / (totalQuotas - 1);

  for (let i = 0; i < totalQuotas; i++) {
    let status: Payment_Status;

    if (i < quotasPaid) {
      status = Payment_Status.Paid;
    } else {
      const cuotaPaymentDate = new Date(
        startDate.getTime() + i * cuotaDuration,
      );

      if (cuotaPaymentDate <= currentDate) {
        status = Payment_Status.Pending;
      } else if (
        cuotaPaymentDate > currentDate &&
        (cuotaPaymentDate.getTime() - currentDate.getTime()) /
          (1000 * 3600 * 24) <=
          proximityThresholdDays
      ) {
        status = Payment_Status.Proximity;
      } else {
        status = Payment_Status.Pending;
      }
    }

    cuotas.push({
      number: i + 1,
      id: i + 1,
      status,
    });
  }

  return cuotas;
}

function CardCirugia({ adjudicated }: { adjudicated: Adjudicated }) {
  const { t } = useTranslation(['common', 'constants']);
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  const cuotas: Array<{
    number: number;
    id: number;
    status: Payment_Status;
  }> = createCuotas(
    adjudicated.quotas_number ?? 0,
    adjudicated.quotas_paid ?? 0,
    adjudicated.start_date_payment ?? new Date(),
    adjudicated.end_date_payment ?? new Date(),
  );

  return (
    <div className="w-full justify-center items-center flex flex-row gap-2 relative">
      <div
        className={`flex flex-col bg-white w-full items-center gap-2 ${expanded ? '' : 'border border-[#9665FF]'}`}
      >
        <div
          className="flex flex-col w-full items-center justify-center p-4 relative"
          onClick={!expanded ? toggleAccordion : () => {}}
        >
          <IoMdArrowDropdown className="text-[#9665FF] text-5xl absolute -top-[18px] left-2 md:left-10" />

          {/* Card tipo de cirugia y doctor */}
          <div
            className={` flex flex-col md:flex-row w-full justify-center relative gap-4 md:gap-10 ${expanded ? 'mb-5' : ''} `}
          >
            <div className="flex w-full md:w-1/2 justify-between items-center">
              <span className="text-lg md:text-xl lg:text-2xl text-[#6636E2] mx-2 md:mx-4">
                {t('constants:surgery')}
              </span>
              <div className="flex justify-center items-center w-3/5 md:w-full border p-2">
                <span className="text-sm md:text-base lg:text-lg text-gray-500">
                  {adjudicated.surgery?.name}
                </span>
              </div>
            </div>

            <div className="absolute hidden md:flex h-[50px] border-r-[1px] -top-1 border-[#9665FF]" />

            <div className="flex w-full md:w-1/2 justify-between items-center">
              <span className="text-lg md:text-xl lg:text-2xl text-[#6636E2] mx-2 md:mx-4">
                {t('constants:surgeon')}
              </span>
              <div className="flex justify-center items-center w-3/5 md:w-full border p-2">
                <span className="text-base md:text-lg text-gray-500">
                  Dra. {adjudicated?.doctor?.user!.first_name}
                </span>
              </div>
            </div>
          </div>
          {expanded && (
            <>
              <div
                className={`flex flex-col w-full items-center justify-center overflow-hidden transition-max-h ease-out duration-300 ${expanded ? 'max-h-[1000px]' : 'max-h-0'}`}
              >
                {/* Buttons info del procedimiento y info del profesional */}
                <div className="flex flex-row w-full justify-center gap-2 md:gap-10">
                  <Link
                    href={`/store/${adjudicated.surgery?.id}`}
                    className="flex w-1/2 justify-center items-center p-1 md:p-2 bg-[#6636E2]"
                  >
                    <span className="text-white text-xs md:text-base mt-5 md:mt-0">
                      {t('constants:procedureInformation')}
                    </span>
                  </Link>
                  <Link
                    href={`/view-account/doctor/${adjudicated.doctor?.id}`}
                    className="flex w-1/2 justify-center items-center p-1 md:p-2 bg-[#6636E2]"
                  >
                    <span className="text-white text-xs md:text-base mt-5 md:mt-0">
                      {t('constants:professionalInformation')}
                    </span>
                  </Link>
                </div>

                {adjudicated.adjudicated_status ===
                  Adjudicated_Status.Validating && (
                  <div className="flex flex-col w-full items-center justify-center gap-2 p-16">
                    <span className="text-[#6636E2] text-2xl font-normal">
                      {t(
                        `constants:adjudicatedStatus.${adjudicated.adjudicated_status}`,
                      )}
                    </span>
                    <span className="text-[#6636E2] text-lg font-light">
                      {t(
                        `constants:adjudicatedStatusDescription.${adjudicated.adjudicated_status}`,
                      )}
                    </span>
                  </div>
                )}

                {adjudicated.adjudicated_status ===
                  Adjudicated_Status.Verified && (
                  <div className="flex flex-col w-full items-center justify-center gap-5 p-16">
                    <span className="text-[#6636E2] text-5xl font-bold">
                      {t(
                        `constants:adjudicatedStatus.${adjudicated.adjudicated_status}`,
                      )}
                    </span>

                    <span className="text-[#6636E2] text-lg font-light">
                      {t(
                        `constants:adjudicatedStatusDescription.${adjudicated.adjudicated_status}`,
                      )}
                    </span>

                    <Link
                      href={`/store/payments/update/${adjudicated.id}`}
                      className="bg-[#6636E2] rounded-md w-[400px] h-[40px] px-2 hover:scale-105 transition-all duration-300 text-white text-xl font-bold flex justify-center items-center gap-2"
                    >
                      Comienza tu transformación!
                    </Link>
                  </div>
                )}

                {adjudicated.adjudicated_status ===
                  Adjudicated_Status.Active && (
                  <>
                    <div className="border-dashed border-[1px] border-[#9665FF] w-full mt-5" />
                    {adjudicated.date_surgery && (
                      <>
                        {/* Border-dashed */}

                        {/* Date cirugia */}
                        <div className="flex flex-col md:flex-row w-full justify-center py-2 md:py-5 relative gap-5 md:gap-10">
                          <div className="flex w-full md:w-1/2 justify-between items-center">
                            <span className="text-base lg:text-xl xl:text-2xl text-center w-full text-[#6636E2]">
                              {t('constants:ApproxDateSurgery')}
                            </span>
                            <div className="flex justify-center items-center w-6/12 border p-2">
                              <span className="text-sm md:text-base lg:text-lg text-gray-500">
                                {adjudicated.date_surgery}
                              </span>
                            </div>
                          </div>

                          {/* Border */}
                          <div className="absolute hidden md:flex h-[50px] border-r-[1px] top-5 border-[#9665FF]" />

                          {/* Button Re-programar cirugia */}
                          <button className="flex w-full md:w-1/2 justify-center items-center p-2 bg-[#9665FF]">
                            <span className="text-white font-semibold text-base md:text-lg lg:text-xl">
                              {t('constants:ReScheduleSurgery')}
                            </span>
                          </button>
                        </div>

                        {/* Border-dashed */}
                        <div className="border-dashed border-[1px] border-[#9665FF] w-full" />
                      </>
                    )}

                    {/* Number of cuotas and date of pay */}
                    <div className="flex flex-col w-full justify-center items-center relative py-3">
                      {/* Cuotas */}
                      <div className="flex flex-row w-full justify-between items-center md:px-3">
                        <span className="text-xs md:text-base text-[#6636E2]">
                          {t('constants:quotas', { current: 3, total: 10 })}
                        </span>
                        <span className="text-xs md:text-base text-[#6636E2]">
                          {t('constants:nextPayment', { date: '14/07/2024' })}
                        </span>
                      </div>

                      <div className="p-5">
                        <Cuotes cuotas={cuotas} />
                      </div>
                    </div>
                  </>
                )}
                <div className="w-full border flex flex-col md:flex-row border-[#9665FF] justify-between items-center relative">
                  <div className="flex flex-col justify-center items-center p-3 md:p-5 lg:p-10 gap-4">
                    <span className="text-base text-[#6636E2]">
                      {t('constants:indications')}
                    </span>
                    <p className="text-xs text-justify">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                      sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                      magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                      quis nostrud exerci tation ullamcorper suscipit lobortis
                      nisl ut aliquip ex ea commodo consequat. Duis autem vel
                      eum iriure dolor in hendrerit in vulputate
                    </p>
                  </div>

                  {/* Border */}
                  <div className="absolute hidden md:flex h-[75%] border-r-[1px] right-[33%] border-[#9665FF]" />

                  <div className="flex flex-col justify-center items-center p-3 md:p-5 lg:p-10 gap-4">
                    <span className="text-base text-[#6636E2]">
                      {t('constants:WhatNotDo')}
                    </span>
                    <p className="text-xs text-justify">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                      sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                      magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                      quis nostrud exerci tation ullamcorper suscipit lobortis
                      nisl ut aliquip ex ea commodo consequat. Duis autem vel
                      eum iriure dolor in hendrerit in vulputate
                    </p>
                  </div>
                  <div className="absolute hidden md:flex h-[75%] border-r-[1px] right-[67%] border-[#9665FF]" />
                  <div className="flex flex-col justify-center items-center p-3 md:p-5 lg:p-10 gap-4">
                    <span className="text-base text-[#6636E2]">Tips</span>
                    <p className="text-xs text-justify bg-white">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                      sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                      magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                      quis nostrud exerci tation ullamcorper suscipit lobortis
                      nisl ut aliquip ex ea commodo consequat. Duis autem vel
                      eum iriure dolor in hendrerit in vulputate
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {expanded && (
        <div className="absolute -top-10 -right-4 hover:scale-110 transition">
          <button
            className="rounded-full border border-[#9665FF] mt-6 mb-auto bg-white"
            onClick={toggleAccordion}
          >
            <IoIosArrowDown className="text-[#9665FF] text-3xl md:text-4xl lg:text-5xl" />
          </button>
        </div>
      )}
    </div>
  );
}

export default CardCirugia;
