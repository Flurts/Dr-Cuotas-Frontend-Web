import React, { useEffect, useState } from 'react';

import DoctorInfoCard from '@/components/common/Cards/DoctorInfoCard';
import SpecialtyCard from '@/components/common/Cards/SpecialtyCard';
import Earnings from '@/components/common/Tables/earnings';
import { Head } from '@/components/constants';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  useGetAllSurgeriesWithValuesQuery,
  useGetDoctorsByNameLazyQuery,
} from '@/types';
import { Status } from '@/utils/constants';

import { DoctorByStatus } from './doctorbyStatus';
import LotteryComponent from './Lottery';
import { SurgeryByStatus } from './surgeryByStatus';

interface DoctorList {
  id: string;
  profession: string;
  user: {
    first_name: string;
    last_name: string;
    profile_picture: string;
    social_media: Array<{
      link: string;
      status: string;
      type: string;
    }>;
  };
}

interface Surgery {
  id: string;
  name: string;
  description?: string;
  rating: number;
  amount: number;
  file_banner?: {
    file_link: string;
  };
}

export default function AdminView() {
  const [selectedStatus, setSelectedStatus] = useState<Status>(Status.Active);
  const [surgeriesList, setSurgeriesList] = useState<Surgery[]>([]);

  const [getDoctorsByName, { data: doctorsData, error: doctorsError }] =
    useGetDoctorsByNameLazyQuery();

  const { data: surgeriesData, error: surgeriesError } =
    useGetAllSurgeriesWithValuesQuery({
      variables: { limit: 10, offset: 0 },
    });

  const [doctorsList, setDoctorsList] = useState<DoctorList[]>([]);

  useEffect(() => {
    void getDoctorsByName({ variables: { offset: 0, limit: 6, name: '' } });
  }, [getDoctorsByName]);

  useEffect(() => {
    if (doctorsData && !doctorsError) {
      setDoctorsList(doctorsData.getDoctorsByName as DoctorList[]);
    } else if (doctorsError) {
      console.error(doctorsError);
      setDoctorsList([]);
    }
  }, [doctorsData, doctorsError]);

  console.log(selectedStatus);

  useEffect(() => {
    if (surgeriesData?.getAllSurgeriesWithValues && !surgeriesError) {
      setSurgeriesList(surgeriesData.getAllSurgeriesWithValues as Surgery[]);
    } else if (surgeriesError) {
      console.error(surgeriesError);
      setSurgeriesList([]);
    }
  }, [surgeriesData, surgeriesError]);

  return (
    <>
      <Head title="Dr.Cuotas" />
      <div
        className=" flex flex-col h-96 w-full bg-no-repeat justify-end items-end bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/banners/BannerHome.svg')",
          backgroundPosition: 'top',
          backgroundSize: '70% auto',
        }}
      >
        <div>
          <select
            // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
            onChange={(e) => setSelectedStatus(e.target.value as Status)}
            value={selectedStatus}
            className="border p-2 rounded-xl text-drcuotasSecondaryPrimaryColor w-[700px] m-5 border-gray-700 font-semibold bg-white"
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
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Activate Surgerys</AccordionTrigger>
          <AccordionContent>
            <SurgeryByStatus status="Inactive" />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Activate Doctors</AccordionTrigger>
          <AccordionContent>
            <DoctorByStatus status={selectedStatus} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Surgery By Status</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-16 lg:p-20 justify-center">
              {surgeriesList.length > 0 ? (
                surgeriesList.map((surgery) => (
                  <SpecialtyCard
                    key={surgery.id}
                    title={surgery.name}
                    description={
                      surgery.description ?? 'Descripción no disponible'
                    }
                    rating={surgery.rating}
                    price={surgery.amount}
                    imageUrl={
                      surgery.file_banner?.file_link ??
                      '/images/elements/specialty.svg'
                    }
                  />
                ))
              ) : (
                <span className="text-[#737373] text-center w-full text-xs">
                  No hay Cirugías
                </span>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Doctor By Status</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col lg:flex-row gap-8 items-center justify-center w-full p-20 lg:p-0">
              {doctorsList?.length ? (
                doctorsList?.map((doctor) => (
                  <DoctorInfoCard key={doctor.id} doctor={doctor} />
                ))
              ) : (
                <span className="text-[10px] sm:text-sm leading-tight tracking-wide text-[#737373]">
                  No hay profesionales disponibles
                </span>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Earnings</AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-10 justify-center items-center m-10">
              <Earnings />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>Sorteo</AccordionTrigger>
          <AccordionContent>
            <LotteryComponent />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
