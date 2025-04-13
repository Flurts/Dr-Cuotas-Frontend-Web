import { Check, Clock, search, User, X } from 'lucide-react';
import React from 'react';

interface ActivateSurgeryCardProps {
  id: string;
  firstName: string;
  lastName?: string;
  status: string;
  descripción?: string;
  type?: string;
  onUpdateStatus: (id: string, status: string) => void;
}

export default function ActivateSurgeryCard({
  id,
  firstName,
  lastName,
  status,
  descripción,
  type,
  onUpdateStatus,
}: ActivateSurgeryCardProps) {
  const getStatusInfo = () => {
    switch ((status || '').toLowerCase()) {
      case 'active':
        return {
          color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
          bgColor: 'bg-emerald-50',
          iconColor: 'text-emerald-500',
          icon: <Check size={16} className="text-emerald-500" />,
          label: 'Activo',
        };
      case 'pending':
        return {
          color: 'bg-amber-50 text-amber-700 border-amber-200',
          bgColor: 'bg-amber-50',
          iconColor: 'text-amber-500',
          icon: <Clock size={16} className="text-amber-500" />,
          label: 'Pendiente',
        };
      case 'blocked':
        return {
          color: 'bg-rose-50 text-rose-700 border-rose-200',
          bgColor: 'bg-rose-50',
          iconColor: 'text-rose-500',
          icon: <X size={16} className="text-rose-500" />,
          label: 'Bloqueado',
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-700 border-gray-200',
          bgColor: 'bg-gray-50',
          iconColor: 'text-gray-500',
          icon: <Clock size={16} className="text-gray-500" />,
          label: status || 'Desconocido',
        };
    }
  };

  const statusInfo = getStatusInfo();
  const fullName = `${firstName} ${lastName ?? ''}`.trim();

  const onVisitProfile = () => {
    if (type === 'doctor') {
      window.location.href = `/view-account/doctor/${id}`;
    } else if (type === 'surgery') {
      window.location.href = `/store/${id}`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg w-full transform hover:-translate-y-1">
      <div className="flex flex-col md:flex-row">
        {/* Left section with gradient background */}
        <div className="bg-drcuotasSecondaryPrimaryColor bg-opacity-70 p-6 flex items-center justify-center md:justify-start md:w-1/3 w-full">
          <div className="flex flex-col items-center md:items-start w-full">
            <div className="bg-white rounded-full p-3 shadow-md border border-sky-100 mb-4 transform transition-transform duration-300 hover:scale-110">
              <User size={30} className="text-sky-600" />
            </div>

            <div className="space-y-3 text-center md:text-left w-full">
              <h3 className="text-lg font-bold text-gray-800 break-words">
                {fullName}
              </h3>

              <div
                className={`inline-flex items-center px-3 py-1.5 rounded-full border ${statusInfo.color} text-xs font-medium gap-1.5 shadow-sm`}
              >
                {statusInfo.icon}
                {statusInfo.label}
              </div>
            </div>
          </div>
        </div>

        {/* Right section with improved spacing */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between gap-5 bg-gray-50 bg-opacity-30">
          <div
            className={`rounded-lg p-4 border border-gray-200 shadow-sm ${statusInfo.bgColor} bg-opacity-30`}
          >
            <h4 className="text-sm uppercase tracking-wider text-gray-600 font-semibold mb-2 flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${statusInfo.iconColor}`}
              ></div>
              Descripción
            </h4>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              {descripción ?? 'Información del procedimiento no disponible'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-2 w-full">
            <button
              onClick={() => {
                onVisitProfile();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg border-2 border-sky-500 text-sky-600 hover:bg-sky-50 transition-all duration-200 font-medium text-sm flex items-center justify-center gap-2 hover:shadow-md"
            >
              Inspeccionar
            </button>
            <button
              onClick={() => {
                onUpdateStatus(id, 'Blocked');
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg border-2 border-rose-500 text-rose-600 hover:bg-rose-50 transition-all duration-200 font-medium text-sm flex items-center justify-center gap-2 hover:shadow-md"
            >
              <X size={16} />
              Rechazar
            </button>
            <button
              onClick={() => {
                onUpdateStatus(id, 'Active');
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-drcuotasPrimary-bg text-white hover:from-sky-600 hover:to-blue-700 transition-all duration-200 font-medium text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <Check size={16} />
              Activar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
