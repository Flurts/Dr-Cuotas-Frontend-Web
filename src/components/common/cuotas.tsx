import React from 'react';

import TitleElements from './ViewElements/TitleElements';

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
    <div className="hidden lg:flex flex-col items-center justify-center w-full h-screen mb-40 bg-white p-8">
      <TitleElements
        primaryText="FINANCIA TU CIRUGÍA Y LLEVA EL CONTROL DE TUS PAGOS"
        secondaryText="TU PLAN DE FINANCIAMIENTO"
        descriptionText=""
      />

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-2">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`w-80 h-96 p-4 rounded-xl border flex flex-col gap-4 
              ${plan.highlight ? 'bg-drcuotasPrimary-bg bg-opacity-20 text-white' : 'bg-white'}`}
          >
            <h3 className="text-2xl text-drcuotasPrimary-text font-black uppercase leading-tight tracking-tight">{plan.title}</h3>
            <p className="text-md text-drcuotasTertiary-text leading-tight tracking-tight">{plan.subtitle}</p>
            <p className="text-2xl text-drcuotasTertiary-text leading-tight tracking-tight">
              {plan.percentage}
              <span className="text-2xl text-drcuotasTertiary-text leading-tight tracking-tight">/cuota</span>
            </p>

            <ul className="space-y-2">
              {plan.details.map((detail, i) => (
                <li key={i} className="flex items-center text-xs text-drcuotasTertiary-text leading-tight tracking-tight">
                  ✅ {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </div>
  );
}
