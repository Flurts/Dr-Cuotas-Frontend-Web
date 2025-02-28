import {
  LucideFolder,
  LucidePackageCheck,
  LucidePackagePlus,
  LucideUsers,
} from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

import AdComponent from '@/components/common/AdComponent';
import TitleElements from '@/components/common/ViewElements/TitleElements';
import { Head } from '@/components/constants';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Status } from '@/utils/constants';

import { DoctorByStatus } from './doctorByStatus';
import LotteryComponent from './Lottery';
import RevenueChart from './revenuechart';
import { SurgeryByStatus } from './surgeryByStatus';

export default function AdminView() {
  const [selectedStatus, setSelectedStatus] = useState<Status>(Status.Active);

  return (
    <>
      <Head title="Dr.Cuotas - AD" />
      <>
        <div className="w-full h-full flex flex-col justify-center items-center ">
          <>
            <div className="w-full hidden lg:flex justify-center items-center shadow-2xl shadow-drcuotasPrimary">
              <div
                className="w-full h-[80vh] sm:h-screen flex flex-col justify-center items-center bg-[#E5F9F7] bg-opacity-40 border-drcuotasPrimary"
                style={{
                  backgroundImage: 'url(/images/banners/BannerBody.svg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <TitleElements
                  primaryText="Observa el Ritmo de Crecimiento"
                  secondaryText="Resumen de Actividad"
                  descriptionText=""
                />
                <div className="w-full hidden lg:flex flex-row justify-center items-center gap-2">
                  <>
                    <Link
                      href="/admin"
                      className="bg-white w-28 lg:w-80 lg:h-44 rounded-xl border shadow-xl shadow-drcuotasPrimary border-drcuotasPrimary flex flex-col justify-center items-start p-8 gap-4 lg:gap-0"
                    >
                      <span className="text-drcuotasPrimary-text font-extrabold text-lg uppercase leading-tight tracking-tight text-center  w-full">
                        Total Usuarios
                      </span>
                      <div className="w-full flex flex-row justify-center items-center gap-4">
                        <span className="text-drcuotasPrimary-text text-xl lg:text-4xl uppercase font-black leading-tight tracking-tight truncate w-full text-center">
                          + 17.000
                        </span>
                        <LucideUsers className="hidden lg:block w-20 h-20 text-drcuotasPrimary-text" />
                      </div>
                    </Link>
                  </>
                  <>
                    <Link
                      href="/admin"
                      className="bg-white w-28 lg:w-80 lg:h-44 rounded-xl border shadow-xl shadow-drcuotasPrimary border-drcuotasPrimary flex flex-col justify-center items-start p-8 gap-4 lg:gap-0"
                    >
                      <span className="text-drcuotasPrimary-text font-extrabold text-lg uppercase leading-tight tracking-tight text-center  w-full">
                        Total Cirugias
                      </span>
                      <div className="w-full flex flex-row justify-center items-center gap-4">
                        <span className="text-drcuotasPrimary-text text-xl lg:text-4xl uppercase font-black leading-tight tracking-tight truncate w-full text-center ">
                          + 560
                        </span>
                        <LucidePackagePlus className="hidden lg:block w-20 h-20 text-drcuotasPrimary-text" />
                      </div>
                    </Link>
                  </>
                  <>
                    <Link
                      href="/admin"
                      className="bg-white w-28 lg:w-80 lg:h-44 rounded-xl border shadow-xl shadow-drcuotasPrimary border-drcuotasPrimary flex flex-col justify-center items-start p-8 gap-4 lg:gap-0"
                    >
                      <span className="text-drcuotasPrimary-text font-extrabold text-lg uppercase leading-tight tracking-tight text-center  w-full">
                        Total Ventas
                      </span>
                      <div className="w-full flex flex-row justify-center items-center gap-4">
                        <span className="text-drcuotasPrimary-text text-xl lg:text-4xl uppercase font-black leading-tight tracking-tight truncate w-full text-center">
                          $ 23.500
                        </span>
                        <LucidePackageCheck className="hidden lg:block w-20 h-20 text-drcuotasPrimary-text" />
                      </div>
                    </Link>
                  </>
                </div>
              </div>
            </div>
          </>
          <>
            <div className="lg:w-full h-screen lg:h-full  flex flex-col  lg:gap-2 lg:p-20 bg-drcuotasPrimary bg-opacity-30">
              <TitleElements
                primaryText="Panel de Control DrCuotas"
                secondaryText="Panel Administrativo"
                descriptionText="Control Cirugias Creadas y Generar Sorteos"
              />
              <Accordion
                type="single"
                collapsible
                className="flex flex-col gap-2 p-4 lg:p-0"
              >
                <>
                  <AccordionItem
                    value="item-1"
                    className="bg-white rounded-xl border px-4 "
                  >
                    <AccordionTrigger>
                      <div className="w-full flex flex-row gap-4 items-center">
                        <LucideFolder className="text-drcuotasPrimary" />
                        <span className="text-drcuotasPrimary-text font-black uppercase leading-tight tracking-tight">
                          Cirugias
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 w-full h-screen flex flex-col items-center  gap-10">
                      <>
                        <div className="w-full flex justify-center items-center">
                          <select
                            // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
                            onChange={(e) => {
                              setSelectedStatus(e.target.value as Status);
                            }}
                            value={selectedStatus}
                            className="w-full h-10 px-4 rounded-xl text-drcuotasSecondaryPrimaryColor leading-tight tracking-tight uppercase font-black border "
                          >
                            <option value="" disabled>
                              Selecciona Status...
                            </option>
                            {Object.values(Status).map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </div>
                      </>
                      <SurgeryByStatus status="Inactive" />
                    </AccordionContent>
                  </AccordionItem>
                </>
                <>
                  <AccordionItem
                    value="item-3"
                    className="bg-white rounded-xl border px-4 "
                  >
                    <AccordionTrigger>
                      <div className="w-full flex flex-row gap-4 items-center">
                        <LucideFolder className="text-drcuotasPrimary" />
                        <span className="text-drcuotasPrimary-text font-black uppercase leading-tight tracking-tight">
                          Total Cirugias
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 w-full h-full flex flex-col items-center  gap-10">
                      <>
                        <div className="w-full flex justify-center items-center">
                          <select
                            // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
                            onChange={(e) => {
                              setSelectedStatus(e.target.value as Status);
                            }}
                            value={selectedStatus}
                            className="w-full h-10 px-4 rounded-xl text-drcuotasSecondaryPrimaryColor leading-tight tracking-tight uppercase font-black border  "
                          >
                            <option value="" disabled>
                              Selecciona Status...
                            </option>
                            {Object.values(Status).map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </div>
                        <SurgeryByStatus status={selectedStatus} />
                      </>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center gap-4"></div>
                    </AccordionContent>
                  </AccordionItem>
                </>
                <>
                  <AccordionItem
                    value="item-2"
                    className="bg-white rounded-xl border px-4 "
                  >
                    <AccordionTrigger>
                      <div className="w-full flex flex-row gap-4 items-center">
                        <LucideFolder className="text-drcuotasPrimary" />
                        <span className="text-drcuotasPrimary-text font-black uppercase leading-tight tracking-tight">
                          Doctores
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 w-full h-screen flex flex-col items-center  gap-10">
                      <>
                        <div className="w-full flex justify-center items-center">
                          <select
                            // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
                            onChange={(e) => {
                              setSelectedStatus(e.target.value as Status);
                            }}
                            value={selectedStatus}
                            className="w-full h-10 px-4 rounded-xl text-drcuotasSecondaryPrimaryColor leading-tight tracking-tight uppercase font-black border "
                          >
                            <option value="" disabled>
                              Selecciona Status...
                            </option>
                            {Object.values(Status).map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </div>
                      </>
                      <DoctorByStatus status="Inactive" />
                    </AccordionContent>
                  </AccordionItem>
                </>

                <>
                  <AccordionItem
                    value="item-4"
                    className="bg-white rounded-xl border px-4 "
                  >
                    <AccordionTrigger>
                      <div className="w-full flex flex-row gap-4 items-center">
                        <LucideFolder className="text-drcuotasPrimary" />
                        <span className="text-drcuotasPrimary-text font-black uppercase leading-tight tracking-tight">
                          Total Doctores
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 w-full h-screen flex flex-col items-center  gap-10">
                      <>
                        <div className="w-full flex justify-center items-center">
                          <select
                            // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
                            onChange={(e) => {
                              setSelectedStatus(e.target.value as Status);
                            }}
                            value={selectedStatus}
                            className="w-full h-10 px-4 rounded-xl text-drcuotasSecondaryPrimaryColor leading-tight tracking-tight uppercase font-black border "
                          >
                            <option value="" disabled>
                              Selecciona Status...
                            </option>
                            {Object.values(Status).map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </div>
                        <DoctorByStatus status={selectedStatus} />
                      </>
                      <div className="flex flex-col lg:flex-row gap-8 items-center justify-center w-full p-20 lg:p-0"></div>
                    </AccordionContent>
                  </AccordionItem>
                </>
                <>
                  <AccordionItem
                    value="item-6"
                    className="bg-white rounded-xl border px-4 "
                  >
                    <AccordionTrigger>
                      <div className="w-full flex flex-row gap-4 items-center">
                        <LucideFolder className="text-drcuotasPrimary" />
                        <span className="text-drcuotasPrimary-text font-black uppercase leading-tight tracking-tight">
                          Sorteo
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="w-full h-screen flex flex-col items-center  gap-10">
                      <LotteryComponent />
                    </AccordionContent>
                  </AccordionItem>
                </>
                <>
                  <AccordionItem
                    value="item-7"
                    className="bg-white rounded-xl border px-4 "
                  >
                    <AccordionTrigger>
                      <div className="w-full flex flex-row gap-4 items-center">
                        <LucideFolder className="text-drcuotasPrimary" />
                        <span className="text-drcuotasPrimary-text font-black uppercase leading-tight tracking-tight">
                          Ad
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="w-full h-screen flex flex-col items-center  gap-10">
                      <AdComponent />
                    </AccordionContent>
                  </AccordionItem>
                </>
              </Accordion>
            </div>
          </>
          <>
            <div className="w-full h-full hidden lg:flex flex-col justify-center bg-drcuotasPrimary bg-opacity-30 items-center p-20 gap-2">
              <TitleElements
                primaryText="Registro de Ventas de Cirugias"
                secondaryText="Ingresos Mensuales"
                descriptionText="Registro de ventas completadas en el trascurso de los meses"
              />

              <RevenueChart />
            </div>
          </>
          <div className="w-full h-32 bg-drcuotasPrimary bg-opacity-30"></div>
        </div>
      </>
    </>
  );
}
