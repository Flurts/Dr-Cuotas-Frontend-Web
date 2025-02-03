import React from 'react';
import { IoIosAdd, IoMdArrowDropdown } from 'react-icons/io';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Payment_Status } from '@/utils/constants';

// Define the messages object with the same keys as the Payment_Status enum
const messages = {
  [Payment_Status.Paid]: 'Payment has been made.',
  [Payment_Status.Pending]: 'Payment is pending.',
  Default: 'Default payment status.',
  [Payment_Status.Proximity]: 'Payment is in proximity.',
  [Payment_Status.Rejected]: 'Payment has been rejected.', // Ensure all statuses are covered
  [Payment_Status.Canceled]: 'Payment has been canceled.',
};

function Cuotes({
  cuotas,
}: {
  cuotas: Array<{ number: number; id: number; status: Payment_Status }>;
}) {
  const totalCuotas = cuotas.length;
  const circleSize = 32; // Tamaño del círculo (w-8 h-8)
  const gapSize = 86; // Tamaño del margen entre círculos (mr-4)
  const barWidth = (totalCuotas - 1) * (circleSize + gapSize);

  const getMessage = (status: Payment_Status) => {
    return messages[status] || messages.Default;
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen lg:w-full mt-5">
        <div className="w-screen lg:w-full flex justify-center items-center overflow-x-auto">
          <div className="flex flex-row items-center justify-center gap-24 relative">
            {/* Contenedor de las cuotas y círculos */}
            <div
              className="flex items-center w-screen lg:w-full" // Contenedor de cuotas
              style={{ minWidth: '100%' }} // Asegurar que el contenido no se desborde
            >
              {cuotas.map((cuota, index) => (
                <Popover key={cuota.id}>
                  <PopoverTrigger asChild>
                    <div
                      className={`flex flex-col items-center justify-center ${
                        index === totalCuotas - 1 ? '' : 'mr-4' // Agrega margen derecho a todas las cuotas excepto la última
                      }`}
                      style={{ minWidth: '100px' }} // Ancho mínimo de cada cuota
                    >
                      <span>{cuota.number}</span>
                      <div
                        className={`w-8 h-8 rounded-full border flex items-center justify-center ${
                          cuota.status === Payment_Status.Paid
                            ? 'bg-[#25d366]'
                            : cuota.status === Payment_Status.Pending
                              ? 'bg-[#FFD700]'
                              : cuota.status === Payment_Status.Proximity
                                ? 'bg-[#FFA500]'
                                : cuota.status === Payment_Status.Rejected
                                  ? 'bg-[#FF0000]'
                                  : cuota.status === Payment_Status.Canceled
                                    ? 'bg-[#FF0000]'
                                    : 'bg-[#25d366]'
                        }`}
                      >
                        {cuota.status === Payment_Status.Pending && (
                          <IoIosAdd className="text-white text-2xl" />
                        )}
                      </div>
                      {cuota.status === Payment_Status.Pending ? (
                        <IoMdArrowDropdown className="text-[#9665FF] text-2xl" />
                      ) : (
                        <div className="h-[20px]" />
                      )}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    <span>{getMessage(cuota.status)}</span>
                  </PopoverContent>
                </Popover>
              ))}
            </div>
          </div>
        </div>

        <div
          className="bg-gray-200 shadow-2xl h-1 flex justify-center -mt-10 mb-20"
          style={{ width: `${barWidth}px` }}
        ></div>
      </div>
    </>
  );
}

export default Cuotes;
