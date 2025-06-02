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
    highlight: true,
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
        primaryText=""
        secondaryText="TU PLAN DE FINANCIAMIENTO"
        descriptionText=""
      />

      <div className="w-full flex flex-row justify-center items-center gap-4">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`w-full max-w-[400px]  h-[500px] relative overflow-hidden shadow-2xl border-2 ${
              plan.highlight
                ? 'border-white bg-gradient-to-b from-purple-400 to-blue-500'
                : 'border bg-white'
            }`}
          >
            {/* Contenido de la tarjeta */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-between p-6">
              {/* Header */}
              <div className="text-center">
                <h2
                  className={`text-2xl font-black uppercase leading-tight tracking-tight ${
                    plan.highlight ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {plan.title}
                </h2>
                <p
                  className={`text-sm mb-4 ${
                    plan.highlight ? 'text-blue-100' : 'text-gray-600'
                  }`}
                >
                  {plan.subtitle}
                </p>

                {/* Porcentaje destacado */}
                <div
                  className={`text-4xl font-bold mb-6 ${
                    plan.highlight ? 'text-white' : 'text-blue-600'
                  }`}
                >
                  {plan.percentage}
                </div>
              </div>

              {/* Detalles */}
              <div className="flex-1 w-full">
                <ul className="space-y-3">
                  {plan.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <span
                        className={`mr-2 ${
                          plan.highlight ? 'text-blue-200' : 'text-blue-500'
                        }`}
                      >
                        ✓
                      </span>
                      <span
                        className={`text-sm ${
                          plan.highlight ? 'text-white' : 'text-gray-700'
                        }`}
                      >
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Badge para plan popular */}
            {plan.highlight && (
              <div className="absolute top-4 right-4 bg-yellow-400 px-3 py-1  text-xs font-bold">
                POPULAR
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
