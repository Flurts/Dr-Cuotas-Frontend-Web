import { useTranslation } from 'next-i18next';
import React from 'react';

export default function TermView() {
  const { t } = useTranslation('constants');

  const termsAndConditions = [
    'El contenido de las páginas de este sitio web es para tu información general y uso únicamente. Está sujeto a cambios sin previo aviso.',
    'Ni nosotros ni ningún tercero proporcionamos ninguna garantía en cuanto a la exactitud, puntualidad, rendimiento, integridad o idoneidad de la información y los materiales encontrados u ofrecidos en este sitio web para cualquier propósito particular. Aceptas que dicha información y materiales pueden contener inexactitudes o errores y que excluimos expresamente la responsabilidad por cualquier inexactitud o error en la máxima medida permitida por la ley.',
    'Tu uso de cualquier información o material en este sitio web es bajo tu propio riesgo, y no seremos responsables. Es tu responsabilidad asegurarte de que cualquier producto, servicio o información disponible a través de este sitio web cumpla con tus requisitos específicos.',
    'Este sitio web contiene material que es propiedad nuestra o licenciado a nosotros. Este material incluye, pero no se limita a, el diseño, el diseño, la apariencia, los gráficos y la reproducción. Queda prohibida la reproducción excepto de acuerdo con el aviso de copyright, que forma parte de estos términos y condiciones.',
    'Todas las marcas registradas reproducidas en este sitio web, que no son propiedad del operador, son reconocidas en el sitio web.',
    'El uso no autorizado de este sitio web puede dar lugar a una reclamación por daños y/o ser un delito.',
    'De vez en cuando, este sitio web también puede incluir enlaces a otros sitios web. Estos enlaces se proporcionan para tu conveniencia para proporcionar más información. No significan que respaldemos el sitio(s). No tenemos responsabilidad por el contenido del sitio(s) vinculado(s).',
    'Tu uso de este sitio web y cualquier disputa que surja de dicho uso del sitio web está sujeto a las leyes de [tu país o región].',
  ];
  return (
    <div className="w-full lg:h-screen flex justify-center items-center bg-black bg-opacity-5 p-4 lg:p-20">
      <div className="max-w-screen-lg flex flex-col justify-center gap-4 p-4 text-[#9665FF] bg-white border rounded-xl shadow-2xl shadow-[#B398F5]">
        <h1 className="text-lg text-justify md:text-3xl font-bold">
          {t('termsAndConditions')}
        </h1>
        <ul className="list-disc list-inside flex flex-col gap-4">
          {termsAndConditions.map((term, index) => (
            <li key={index} className="text-left text-xs leading-snug">
              {term}
            </li>
          ))}
        </ul>
        <p className="text-justify  text-xs  font-bold">
          Los Términos y Condiciones Generales están sujetos a cambios en
          cualquier momento sin previo aviso. Es tu responsabilidad revisar
          periódicamente estos términos para asegurarte de que estás de acuerdo
          con ellos.
        </p>
      </div>
    </div>
  );
}
