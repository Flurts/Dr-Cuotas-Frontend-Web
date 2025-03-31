import React from 'react';
import TitleElements from './ViewElements/TitleElements';
import Link from 'next/link';

const plans = [
  {
    title: '4 Cuotas',
    subtitle: 'Plan básico de financiamiento',
    percentage: '25%',
    details: [
      'Pago inicial del 25% del valor total',
      'Sin intereses adicionales',
      'Proceso de aprobación rápido',
      'Ideal para compras pequeñas y medianas',
    ],
  },
  {
    title: '8 Cuotas',
    subtitle: 'Nuestro plan más popular',
    percentage: '12.5%',
    details: [
      'Pago inicial del 12.5% del valor total',
      'Interés preferencial',
      'Flexibilidad en fechas de pago',
      'Ideal para compras de valor medio',
      'Documentación simplificada',
    ],
    highlight: true, // Resalta esta tarjeta con un fondo oscuro
  },
  {
    title: '16 Cuotas',
    subtitle: 'Plan extendido de financiamiento',
    percentage: '6.25%',
    details: [
      'Pago inicial del 6.25% del valor total',
      'Mayor plazo para completar el pago',
      'Cuotas más pequeñas y manejables',
      'Ideal para compras de alto valor',
      'Posibilidad de pago anticipado sin penalización',
    ],
  },
];

export default function Cuotas({ className }: { className?: string }) {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center w-full min-h-screen bg-white p-8">
      <TitleElements
        primaryText="FINANCIA TU CIRUGÍA Y LLEVA EL CONTROL DE TUS PAGOS"
        secondaryText="TU PLAN DE FINANCIAMIENTO"
        descriptionText=""
      />
      
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl border transition-all duration-300 flex flex-col gap-4 
              ${plan.highlight ? 'bg-black text-white' : 'bg-white border-gray-300'}`}
          >
            <h3 className="text-xl font-bold">{plan.title}</h3>
            <p className="text-sm opacity-70">{plan.subtitle}</p>
            <p className="text-3xl font-bold">{plan.percentage}<span className="text-lg">/cuota</span></p>
            
            <ul className="space-y-2">
              {plan.details.map((detail, i) => (
                <li key={i} className="flex items-center text-sm">
                  ✅ {detail}
                </li>
              ))}
            </ul>

            <button className={`w-full py-2 rounded-md font-semibold mt-auto ${
              plan.highlight ? 'bg-white text-black' : 'bg-black text-white'
            }`}>
              Seleccionar Plan
            </button>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500 text-center mt-6">
        Todos nuestros planes de financiamiento están sujetos a aprobación de crédito. 
        Para más información, contacta con nuestro equipo de atención al cliente.
      </p>
    </div>
  );
}
