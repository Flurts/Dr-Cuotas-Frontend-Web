import React from 'react';

import TitleElements from '@/components/common/ViewElements/TitleElements';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FaqView() {
  const faqs = [
    {
      question: 'Preguntas Frecuentes',
      answer: [
        '¿Qué es Dr. Cuotas? Dr. Cuotas es la primera plataforma que permite una financiación accesible y de calidad para servicios de cirugía estética.',
        '¿Cómo funciona el proceso de financiación? Ofrecemos planes de capitalización aprobados por los I.G.J.N. Res. 01010 y sus modificatorias. Los detalles específicos sobre cómo acceder a estos planes se pueden encontrar en nuestro sitio web.',
        '¿Qué servicios de cirugía estética están disponibles? Actualmente, ofrecemos financiamiento para varios procedimientos estéticos como aumento de mamas, escultura corporal, y rejuvenecimiento facial.',
        '¿Qué sucede si soy adjudicado en un sorteo? Si eres adjudicado, no tendrás que pagar más por el financiamiento de tu cirugía estética.',
        '¿Cómo puedo registrarme en la plataforma? Puedes registrarte directamente en nuestro sitio web siguiendo las instrucciones en la sección de registro.',
        '¿Qué métodos de pago aceptan? Aceptamos varios métodos de pago. Para más detalles, por favor visita nuestra sección de medios de pago en el sitio web.',
        '¿Cómo puedo contactar a Dr. Cuotas? Puedes contactarnos a través del correo electrónico contacto@drcuotas.com.',
        '¿Tienen una aplicación móvil? Sí, nuestra aplicación estará disponible próximamente en App Store y Google Play.',
      ],
    },
    {
      question: 'Preguntas Frecuentes para Pacientes',
      answer: [
        '¿Qué tipos de cirugías puedo financiar con DrCuotas? Puedes financiar una variedad de procedimientos estéticos, incluyendo aumento de mamas, escultura corporal, y rejuvenecimiento facial.',
        '¿Cómo se realiza la adjudicación de los sorteos? La adjudicación se realiza mediante sorteos mensuales, garantizando una oportunidad justa para todos los participantes.',
        '¿Qué sucede si no soy adjudicado en un sorteo? Si no eres adjudicado, puedes seguir participando en los sorteos mensuales sin costo adicional.',
        '¿Qué documentos necesito para solicitar financiamiento? Necesitarás presentar documentos de identidad y comprobantes de ingresos para evaluar tu capacidad de pago.',
        '¿Cuánto tiempo toma el proceso de aprobación? El proceso de aprobación puede variar, pero generalmente toma entre 1 a 2 semanas.',
      ],
    },
    {
      question: 'Preguntas Frecuentes para Doctores',
      answer: [
        '¿Cómo puedo afiliarme a DrCuotas como proveedor de servicios? Puedes afiliarte a través de nuestro sitio web llenando un formulario de solicitud y proporcionando la documentación requerida.',
        '¿Qué beneficios ofrece DrCuotas a los doctores afiliados?  Ofrecemos acceso a una amplia base de pacientes potenciales y la posibilidad de recibir pagos seguros a través de nuestra plataforma.',
        '¿Cómo se gestiona el pago a los doctores por los procedimientos financiados? Los pagos se gestionan a través de la plataforma DrCuotas, asegurando una transacción segura y oportuna.',
        '¿Qué requisitos deben cumplir los doctores para afiliarse? Los doctores deben tener licencia vigente y cumplir con los estándares de calidad establecidos por DrCuotas.',
        '¿Cómo puedo contactar con DrCuotas para resolver dudas sobre la afiliación? Puedes contactarnos a través del correo electrónico contacto@drcuotas.com o llamarnos al número proporcionado en nuestra página de contacto.',
      ],
    },
    {
      question: 'Preguntas Frecuentes sobre Cirugías',
      answer: [
        '¿Cómo debo prepararme para la cirugía? Es importante seguir las indicaciones del médico, que pueden incluir ayuno previo, evitar ciertos medicamentos, y realizarse los exámenes prequirúrgicos necesarios.',
        '¿Cuánto tiempo dura la cirugía? La duración depende del tipo de procedimiento, pero generalmente varía entre 1 a 4 horas.',
        '¿Qué exámenes prequirúrgicos necesito? Los exámenes comunes incluyen análisis de sangre, electrocardiograma, y, en algunos casos, estudios de imagen como radiografías.',
        '¿Cuál es el tiempo de recuperación postoperatoria? El tiempo de recuperación varía según el procedimiento, pero puede oscilar entre una semana y varios meses.',
        '¿Qué cuidados debo tener después de la cirugía? Es crucial seguir las instrucciones postoperatorias del médico, que pueden incluir reposo, evitar esfuerzos físicos, y tomar medicamentos prescritos.',
        '¿Puedo comer o beber antes de la cirugía? Generalmente, se recomienda ayuno de 8 horas antes de la cirugía, pero tu médico te dará instrucciones específicas.',
        '¿Es dolorosa la recuperación? Puede haber molestias postoperatorias que se manejan con analgésicos recetados por el médico.',
        '¿Cuándo podré retomar mis actividades normales? Depende del tipo de cirugía y tu recuperación personal, pero tu médico te indicará cuándo es seguro hacerlo.',
      ],
    },
    {
      question: 'Preguntas Frecuentes sobre Confianza y Seguridad',
      answer: [
        '¿Cómo puedo estar seguro de que el profesional es calificado? Todos los médicos afiliados a DrCuotas tienen licencias vigentes y cumplen con los estándares de calidad establecidos. Además, puedes revisar sus credenciales y experiencia en nuestro sitio web.',
        '¿Qué medidas de seguridad se toman durante la cirugía? Los procedimientos se realizan en clínicas y hospitales certificados que siguen estrictos protocolos de seguridad y esterilización.',
        '¿Cómo puedo verificar las opiniones de otros pacientes? En nuestra plataforma, encontrarás reseñas y testimonios de pacientes anteriores que han utilizado los servicios de nuestros profesionales.',
        '¿Qué hago si tengo dudas sobre el procedimiento? Puedes programar una consulta prequirúrgica con tu médico para discutir todas tus inquietudes ',
        '¿Qué sucede si hay complicaciones durante la recuperación? Nuestro equipo de soporte y tu médico están disponibles para brindarte asistencia y guiarte en caso de cualquier complicación postoperatoria.',
        '¿Los profesionales siguen actualizaciones médicas y de seguridad? Sí, nuestros médicos se mantienen actualizados con las últimas prácticas y protocolos de seguridad en cirugía estética.',
      ],
    },
  ];

  return (
    <>
      <div className="w-full h-[40vh] flex justify-center items-center ">
        <TitleElements
          primaryText="Preguntas Frecuentes"
          secondaryText="Preguntas Frecuentes"
          descriptionText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center ">
        <div className="w-[160vh] h-screen flex flex-col justify-start ">
          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col justify-center"
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger className="text-drcuotasSecondary-text font-bold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-drcuotasSecondary-text text-xs">
                  {Array.isArray(faq.answer) ? (
                    <ul className="list-disc list-inside">
                      {faq.answer.map((answer, idx) => (
                        <li key={idx}>{answer}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{faq.answer}</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
}
