/* eslint-disable no-unmodified-loop-condition */
/* eslint-disable prefer-const */
import { LucideLaugh } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { IoIosArrowDown, IoMdArrowDropdown } from 'react-icons/io';

import { Adjudicated, Adjudicated_Status } from '@/types';
import { Payment_Status } from '@/utils/constants';

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

// Mensajes motivacionales por cuota
const getMotivationalMessage = (quotaNumber: number): string => {
  const messages = {
    1: 'Felicitaciones has tomado el primer paso para iniciar tu proceso de transformación física y estética con Dr cuotas. Muchas veces por los malos hábitos, mala alimentación nuestro organismo se encuentra inflamado, el hecho de estar inflamado hace que no se absorban de la mejor manera ciertos nutrientes por lo que para que tu proceso de transformación sea exitoso y duradero te sugerimos que inicies consulta con nutricionista y actividad física (personal trainer)',
    2: 'Actividad Física: Recuerda realizar movimientos aeróbicos HIT intervalos de alta intensidad para mejorar tu salud mitocondrial y energía, esto también va a colaborar a mejorar la calidad de tu piel. Las pesas también tienen que ir en el entrenamiento diario sesiones de entrenamiento de fuerza de 30 minutos, los músculos, al contraerse -como cuando hacemos ejercicio– secretan estas sustancias químicas al torrente sanguíneo, activando todo el sistema endocrino.',
    3: 'Consulta con tu nutricionista o médico funcional, que tu plan de alimentación no esté basado en Kcal sino alimentos que den salud a tu sistema metabólico',
    4: '¡En buena hora! tienes la consulta con tu cirujano plástico, podrás contactar para agendar turno',
    5: 'Recuerda que no siempre estarás motivada pero la disciplina en tu día a día es el puente entre las metas y los logros. ¡Fuerza continua así!',
    6: 'Recuerda en tu plan de alimentación ingerir alimentos que contengan vitamina A, zinc, hierro, vitamina C, D y más que ayudan a la cicatrización, consulta a tu nutricionista o médico funcional',
    7: 'Tu éxito no es casualidad, es el resultado de un esfuerzo constante',
    8: 'Los cambios en tus hábitos no solo preparan el camino para un posoperatorio óptimo, sino que también te guían hacia una transformación perdurable, donde cada paso es una semilla que florece en una vida mejor.',
    9: 'Los ácidos grasos omega-3 presentes en pescados como el salmón pueden reducir la inflamación y favorecer la curación.',
    10: 'Descansa lo suficiente para permitir que tu cuerpo se recupere adecuadamente y reducir el estrés.',
    11: '¡Felicitaciones en buena hora! Has llegado hasta aquí ahora debes realizarte el prequirúrgico consulta con tu cirujano plástico Dr cuotas',
    12: 'Mantén una actitud positiva y enfócate en los beneficios a largo plazo de la cirugía para mantenerte motivado durante el proceso de recuperación',
  };

  return messages[quotaNumber as keyof typeof messages] || '';
};

function CardCirugia({ adjudicated }: { adjudicated: Adjudicated }) {
  const { t } = useTranslation(['common', 'constants']);
  const [expanded, setExpanded] = useState(false);

  // Verificar si hay información adicional para expandir
  const hasDetails =
    adjudicated.surgery ??
    adjudicated.doctor ??
    adjudicated.adjudicated_status ??
    adjudicated.date_surgery;

  const toggleAccordion = () => {
    if (hasDetails) {
      setExpanded(!expanded);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const monthsRemaining =
    (adjudicated.quotas_number ?? 0) - (adjudicated.quotas_paid ?? 0);

  const surgeryDate = new Date(adjudicated.created_at);

  let nextPaymentDate = new Date(adjudicated.created_at);
  nextPaymentDate.setMonth(
    nextPaymentDate.getMonth() + (adjudicated.quotas_paid ?? 0),
  );

  const today = new Date();

  // Si la fecha ya pasó, calcular cuál sería la siguiente cuota que debería pagar
  while (
    nextPaymentDate < today &&
    (adjudicated.quotas_paid ?? 0) < (adjudicated.quotas_number ?? 0)
  ) {
    nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
  }

  return (
    <div className="w-full justify-center items-center flex flex-col relative gap-4">
      <div
        className={`flex flex-col bg-white w-full items-center gap-2 border rounded-xl border-drcuotasPrimary-bg`}
      >
        <div
          className="flex flex-col w-full items-center justify-center p-4 relative cursor-pointer"
          onClick={toggleAccordion}
        >
          <IoMdArrowDropdown className="text-drcuotasPrimary-text text-5xl absolute -top-[18px] left-2 md:left-10" />

          {/* Card tipo de cirugía y doctor */}
          <div
            className={`flex flex-col md:flex-row w-full justify-center relative gap-4 md:gap-10 ${
              expanded ? 'mb-5' : ''
            }`}
          >
            <div className="flex w-full md:w-1/2 justify-between items-center">
              <span className="text-lg md:text-xl lg:text-2xl text-drcuotasPrimary-text leading-tight tracking-tight uppercase font-black p-4">
                {t('constants:surgery')}
              </span>
              <div className="flex justify-center items-center w-3/5 md:w-full border p-2">
                <span className="text-xs md:text-base lg:text-lg text-drcuotasTertiary-text leading-tight tracking-tight">
                  {adjudicated.surgery?.name}
                </span>
              </div>
            </div>

            <div className="absolute hidden md:flex h-[50px] border-r-[1px] -top-1 border-drcuotasPrimary-bg" />

            <div className="hidden sm:flex w-full md:w-1/2 justify-between items-center">
              <span className="text-lg md:text-xl lg:text-2xl text-drcuotasPrimary-text p-4 font-black uppercase leading-tight tracking-tight">
                {t('constants:surgeon')}
              </span>
              <div className="flex justify-center items-center w-3/5 md:w-full border p-2">
                <span className="text-xs md:text-lg text-drcuotasTertiary-text leading-tight tracking-tight">
                  {'Dr. ' + adjudicated?.doctor?.user!.first_name}
                </span>
              </div>
            </div>
          </div>
          {expanded && (
            <div
              className={`flex flex-col w-full items-center justify-center overflow-hidden transition-max-h ease-out duration-300 ${
                expanded ? 'max-h-[1000px]' : 'max-h-0'
              }`}
            >
              {/* Buttons info del procedimiento e info del profesional */}
              <div className="w-full flex flex-col sm:flex-row  justify-center gap-2 md:gap-10">
                <Link
                  href={`/store/${adjudicated.surgery?.id}?adjudicatedId=${adjudicated.id}`}
                  className="flex w-full lg:w-1/2 h-10 justify-center items-center p-1 md:p-2 bg-drcuotasPrimary-bg"
                >
                  <span className="text-white text-xs md:text-base leading-tight tracking-tight font-bold uppercase">
                    Adelantar Pago
                  </span>
                </Link>
                <Link
                  href={`/view-account/doctor/${adjudicated.doctor?.id}`}
                  className="flex w-full lg:w-1/2 h-10 justify-center items-center p-1 md:p-2 bg-drcuotasPrimary-bg"
                >
                  <span className="text-white text-xs md:text-base leading-tight tracking-tight font-bold uppercase">
                    Doctor
                  </span>
                </Link>
              </div>
              <div className="w-full flex flex-col sm:flex-row mt-5  justify-center gap-2 md:gap-10">
                <div className="flex w-full lg:w-1/2 h-10 justify-center items-center p-1 md:p-2 ">
                  <span className="text-4xl md:text-base text-drcuotasPrimary-text leading-tight tracking-tight ">
                    fecha de aprox cirugia:{' '}
                    {new Date(
                      surgeryDate.getFullYear(),
                      surgeryDate.getMonth() + monthsRemaining,
                      surgeryDate.getDate(),
                    ).toLocaleDateString('es-ES')}
                  </span>
                </div>
                <Link
                  href={`/contact`}
                  className="flex w-full lg:w-1/2 h-10 justify-center items-center p-1 md:p-2 bg-drcuotasSecondaryPrimaryColor"
                >
                  <span className="text-white text-xs md:text-base leading-tight tracking-tight font-bold uppercase">
                    Reprogramar Cirugía
                  </span>
                </Link>
              </div>

              {adjudicated.adjudicated_status ===
                Adjudicated_Status.Validating && (
                <div className="flex flex-col w-full items-center justify-center gap-2 p-16">
                  <span className="text-drcuotasPrimary-text text-2xl font-normal">
                    {t(
                      `constants:adjudicatedStatus.${adjudicated.adjudicated_status}`,
                    )}
                  </span>
                  <span className="text-drcuotasPrimary-text text-lg font-light">
                    {t(
                      `constants:adjudicatedStatusDescription.${adjudicated.adjudicated_status}`,
                    )}
                  </span>
                </div>
              )}

              {adjudicated.adjudicated_status ===
                Adjudicated_Status.Verified && (
                <div className="flex flex-col w-full items-center justify-center gap-5 p-16">
                  <span className="text-drcuotasPrimary-text text-5xl font-bold">
                    {t(
                      `constants:adjudicatedStatus.${adjudicated.adjudicated_status}`,
                    )}
                  </span>
                  <span className="text-drcuotasPrimary-text text-lg font-light">
                    {t(
                      `constants:adjudicatedStatusDescription.${adjudicated.adjudicated_status}`,
                    )}
                  </span>
                  <Link
                    href={`/store/payments/update/${adjudicated.id}`}
                    className="bg-drcuotasPrimary-bg rounded-md w-[400px] h-[40px] px-2 hover:scale-105 transition-all duration-300 text-white text-xl font-bold flex justify-center items-center gap-2"
                  >
                    Comienza tu transformación!
                  </Link>
                </div>
              )}

              {adjudicated.adjudicated_status === Adjudicated_Status.Active && (
                <>
                  <div className="border-dashed border-[1px] border-drcuotasPrimary-bg w-full mt-5" />
                  {adjudicated.date_surgery && (
                    <>
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

                        <div className="absolute hidden md:flex h-[50px] border-r-[1px] top-5 border-[#9665FF]" />

                        <button className="flex w-full md:w-1/2 justify-center items-center p-2 bg-[#9665FF]">
                          <span className="text-white font-semibold text-base md:text-lg lg:text-xl">
                            {t('constants:ReScheduleSurgery')}
                          </span>
                        </button>
                      </div>
                      <div className="border-dashed border-[1px] border-[#9665FF] w-full" />
                    </>
                  )}
                  <div className="flex flex-col w-full justify-center items-center relative p-4">
                    <div className="flex flex-col sm:flex-row w-full justify-start sm:justify-between items-start sm:items-center md:px-3">
                      <span className="text-xs md:text-base text-drcuotasPrimary-text leading-tight tracking-tight ">
                        {t('constants:quotas', {
                          current: adjudicated.quotas_paid,
                          total: adjudicated.quotas_number,
                        })}
                      </span>
                      <span className="text-xs md:text-base text-drcuotasPrimary-text leading-tight tracking-tight ">
                        proximo pago{' '}
                        {nextPaymentDate.toLocaleDateString('es-ES')}{' '}
                      </span>
                    </div>
                    <div className="lg:p-5">
                      <div className="w-full p-4 flex flex-row justify-center items-center">
                        {Array.from({ length: adjudicated.quotas_number! }).map(
                          (_, index) => (
                            <React.Fragment key={index}>
                              {/* Círculos */}
                              <div
                                className={`w-8 lg:w-10 h-8 lg:h-10 rounded-full flex justify-center items-center 
                ${
                  index < adjudicated.quotas_paid! // Cuotas pagadas
                    ? 'bg-green-500' // Cuotas pagadas en verde
                    : 'bg-drcuotasTertiary-bg bg-opacity-20'
                }`}
                              >
                                <LucideLaugh className="text-drcuotasTertiary-text opacity-80 w-6 lg:w-8 h-6 lg:h-8" />
                              </div>

                              {/* Conectores (barras entre círculos) */}
                              {index < adjudicated.quotas_number! - 1 && (
                                <div
                                  className={`w-4 h-2 
                  ${
                    index < adjudicated.quotas_paid! - 1
                      ? 'bg-green-500' // Conectores en verde si están dentro de las cuotas pagadas
                      : 'bg-drcuotasTertiary-bg bg-opacity-50'
                  }`}
                                ></div>
                              )}
                            </React.Fragment>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
              {adjudicated.quotas_paid &&
                adjudicated.quotas_paid >= 1 &&
                adjudicated.quotas_paid <= 12 && (
                  <div className="w-full flex flex-col gap-3">
                    {Array.from(
                      { length: adjudicated.quotas_paid },
                      (_, index) => {
                        const quotaNumber = index + 1;
                        const message = getMotivationalMessage(quotaNumber);

                        if (!message) return null;

                        return (
                          <div
                            key={quotaNumber}
                            className="bg-gradient-to-r  rounded-xl p-4 md:p-6 shadow-lg border border-drcuotasPrimary-bg"
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 bg-drcuotasSecondaryPrimaryColor rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                                <span className="text-white font-bold text-xl md:text-base">
                                  {quotaNumber}
                                </span>
                              </div>
                              <div className="flex-1 mt-3">
                                <h3 className="text-drcuotasSecondaryPrimaryColor font-bold text-xl md:text-base mb-2">
                                  Cuota {quotaNumber}
                                </h3>
                                <p className="text-drcuotasSecondaryPrimaryColor text-xs md:text-base leading-relaxed">
                                  {message}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                )}
            </div>
          )}
        </div>
      </div>

      {/* Mensajes motivacionales basados en cuotas pagadas */}

      {expanded && hasDetails && (
        <div className="absolute -top-10 -right-4 hover:scale-110 transition">
          <button
            className="rounded-full border border-drcuotasPrimary-bg mt-6 mb-auto bg-white"
            onClick={toggleAccordion}
          >
            <IoIosArrowDown className="text-drcuotasPrimary-text text-3xl md:text-4xl lg:text-5xl" />
          </button>
        </div>
      )}
    </div>
  );
}

export default CardCirugia;
