import React from 'react';

interface ActivateSurgeryCardProps {
  firstName: string;
  lastName: string;
  status: string;
}

export default function ActivateSurgeryCard({
  firstName,
  lastName,
  status,
}: ActivateSurgeryCardProps) {
  return (
    <div className="flex bg-dr shadow-2xl w-[900px] tracking-tight leading-tight justify-center p-4 items-center gap-10 rounded-xl">
      <div className="flex flex-col justify-center items-center ml-10 gap-2">
        <img
          src="/images/elements/doctor.svg"
          alt="doctor"
          className="rounded-xl"
        />
        <span className="text-nowrap text-drcuotasPrimary font-light">
          {firstName}
        </span>
        <span>{status}</span>
      </div>

      <div className="flex flex-col justify-center items-center gap-4">
        <div className="bg-violet-500 h-32 w-[650px] flex rounded-xl justify-center items-center">
          {lastName}
        </div>
        <div className="flex justify-center gap-10 text-drcuotasPrimary">
          <button className="border border-violet-500 p-2 tracking-tight w-32 leading-tight rounded-xl hover:scale-105 hover:bg-drcuotasPrimary hover:text-white transition-all duration-300">
            Activar
          </button>
          <button className="border border-violet-500 tracking-tight w-32 leading-tight rounded-xl hover:scale-105 hover:bg-red-500 hover:text-white transition-all duration-300">
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
}
