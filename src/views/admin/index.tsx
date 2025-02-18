import { useState } from 'react';

import ActivateSurgeryCard from '@/components/common/Cards/ActivateSurgeryCard';
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

export default function AdminView() {
  const [ganador, setGanador] = useState('');
  const [premio, setPremio] = useState('');
  const [loading, setLoading] = useState(false);
  const nombres = ['Juan', 'María', 'Pedro', 'Ana', 'Luis', 'Carla'];

  const handleSortear = () => {
    if (!premio.trim()) {
      alert('Por favor, ingrese un premio antes de sortear.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const nombreAleatorio =
        nombres[Math.floor(Math.random() * nombres.length)];
      setGanador(nombreAleatorio);
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <Head title="Dr.Cuotas" />
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Activate Surgerys</AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-10 justify-center items-center">
              <ActivateSurgeryCard />
              <ActivateSurgeryCard />
            </div>
            <div className="flex gap-10 justify-center items-center">
              <ActivateSurgeryCard />
              <ActivateSurgeryCard />
            </div>
            <div className="flex gap-10 justify-center items-center">
              <ActivateSurgeryCard />
              <ActivateSurgeryCard />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Activate Doctors</AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-10 justify-center items-center">
              <ActivateSurgeryCard />
              <ActivateSurgeryCard />
            </div>
            <div className="flex gap-10 justify-center items-center">
              <ActivateSurgeryCard />
              <ActivateSurgeryCard />
            </div>
            <div className="flex gap-10 justify-center items-center">
              <ActivateSurgeryCard />
              <ActivateSurgeryCard />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Surgery By Status</AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-10 justify-center items-center m-10">
              <SpecialtyCard
                title="hola"
                description="Descripción no disponible"
                rating={5}
                price={2000}
                imageUrl={'/images/surgerys/chest_body.svg'}
              />
              <SpecialtyCard
                title="hola"
                price={2000}
                description="Descripción no disponible"
                rating={5}
                imageUrl={'/images/surgerys/chest_body.svg'}
              />
              <SpecialtyCard
                title="hola"
                price={2000}
                description="Descripción no disponible"
                rating={5}
                imageUrl={'/images/surgerys/chest_body.svg'}
              />
              <SpecialtyCard
                title="hola"
                price={2000}
                description="Descripción no disponible"
                rating={5}
                imageUrl={'/images/surgerys/chest_body.svg'}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Doctor By Status</AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-10 justify-center items-center m-10">
              <DoctorInfoCard
                doctor={{
                  id: '1',
                  profession: 'Doctor',
                  user: {
                    first_name: 'Brayan',
                    last_name: 'Suarez',
                    profile_picture: '/images/surgerys/chest_body.svg',
                    social_media: [], // Array vacío para evitar errores
                  },
                }}
              />
              <DoctorInfoCard
                doctor={{
                  id: '1',
                  profession: 'Doctor',
                  user: {
                    first_name: 'Brayan',
                    last_name: 'Suarez',
                    profile_picture: '/images/surgerys/chest_body.svg',
                    social_media: [], // Array vacío para evitar errores
                  },
                }}
              />
              <DoctorInfoCard
                doctor={{
                  id: '1',
                  profession: 'Doctor',
                  user: {
                    first_name: 'Brayan',
                    last_name: 'Suarez',
                    profile_picture: '/images/surgerys/chest_body.svg',
                    social_media: [], // Array vacío para evitar errores
                  },
                }}
              />
              <DoctorInfoCard
                doctor={{
                  id: '1',
                  profession: 'Doctor',
                  user: {
                    first_name: 'Brayan',
                    last_name: 'Suarez',
                    profile_picture: '/images/surgerys/chest_body.svg',
                    social_media: [], // Array vacío para evitar errores
                  },
                }}
              />
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
            <div className="flex flex-col items-center gap-5 p-5 bg-gray-100 rounded-lg">
              <span className="text-lg font-semibold">
                Sorteo entre adjudicados con más de 4 cuotas
              </span>

              <input
                type="text"
                placeholder="Ingrese el premio"
                className="border p-2 rounded-lg"
                value={premio}
                // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
                onChange={(e) => setPremio(e.target.value)}
              />

              <button
                onClick={handleSortear}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                disabled={loading}
              >
                {loading ? 'Sorteando...' : 'Sortear'}
              </button>

              {loading && <div className="mt-2 text-gray-500">Cargando...</div>}

              {ganador && !loading && (
                <div className="mt-5 bg-white p-4 rounded-lg shadow-md w-80">
                  <table className="w-full text-center">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2">Ganador</th>
                        <th className="p-2">Premio</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 font-semibold">{ganador}</td>
                        <td className="p-2 text-green-600">{premio}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
