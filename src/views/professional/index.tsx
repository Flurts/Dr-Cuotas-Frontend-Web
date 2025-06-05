'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaListUl, FaThLarge } from 'react-icons/fa';

import { Doctor, useGetDoctorsByNameLazyQuery } from '@/types';

const ProfessionalView = () => {
  const [getDoctorsByName, { data, error }] = useGetDoctorsByNameLazyQuery();
  const [doctorsList, setDoctorsList] = useState<Doctor[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        await getDoctorsByName({
          variables: { offset: 0, limit: 20, name: searchTerm },
        });
      } catch (e) {
        console.error(e);
        setDoctorsList([]);
      }
    };

    void fetchDoctors();
  }, [getDoctorsByName, searchTerm]);

  useEffect(() => {
    if (data) {
      setDoctorsList(data.getDoctorsByName as Doctor[]);
    } else if (error) {
      console.error(error);
      setDoctorsList([]);
    }
  }, [data, error]);

  return (
    <div className="w-full h-full flex flex-col gap-4 p-10 mb-[30vw]">
      {/* Toggle vista cuadrícula / lista */}
      <div className="flex items-center gap-1">
        {/* Filtro por nombre */}
        <input
          type="text"
          placeholder="Buscar doctor..."
          className="w-full border  px-3 py-2  text-drcuotasTertiary-text leading-tight tracking-tight"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />

        <button
          className={`border  px-3 py-2 text-sm  transition text-drcuotasTertiary-text ${viewMode === 'grid' ? 'bg-drcuotasPrimary-bg text-white' : 'bg-white'}`}
          onClick={() => {
            setViewMode('grid');
          }}
        >
          <FaThLarge />
        </button>
        <button
          className={`border px-3 py-2 text-sm  transition text-drcuotasTertiary-text ${viewMode === 'list' ? 'bg-drcuotasPrimary-bg text-white' : 'bg-white'}`}
          onClick={() => {
            setViewMode('list');
          }}
        >
          <FaListUl />
        </button>
      </div>

      {/* Lista de doctores */}
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'
            : 'flex flex-col gap-4'
        }
      >
        {doctorsList.length > 0 ? (
          doctorsList.map((doctor) => (
            <Link
              key={doctor.id}
              href={`/view-account/doctor/${doctor.id}`}
              className="w-full h-auto border  overflow-hidden bg-white flex cursor-pointer hover:shadow-lg transition duration-300 "
            >
              <div className="w-40 h-40 flex items-center justify-center bg-gray-200">
                <Image
                  src={
                    doctor.user!.profile_picture &&
                    doctor.user!.profile_picture.trim() !== ''
                      ? doctor.user!.profile_picture
                      : '/images/elements/doctor.svg'
                  }
                  alt={doctor.user!.first_name}
                  className="w-full h-full object-cover "
                  width={160}
                  height={160}
                />
              </div>
              <div className="p-4 flex flex-col justify-center">
                <h3 className="text-drcuotasTertiary-text text-xs lg:text-base font-bold uppercase leading-tight tracking-tight">
                  {doctor.user!.first_name} {doctor.user!.last_name}
                </h3>
                <p className="hidden lg:block text-xs text-drcuotasTertiary-text">
                  Cirujano
                </p>
              </div>
            </Link>
          ))
        ) : (
          <span className="text-drcuotasTertiary-text text-sm">
            No hay profesionales disponibles
          </span>
        )}
      </div>
    </div>
  );
};

export default ProfessionalView;
