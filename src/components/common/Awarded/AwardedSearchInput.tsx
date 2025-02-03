import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import * as Yup from 'yup';

interface AwardedSearchInputProps {
  onFilter: (values: { month: string; year: string }) => void;
}

const monthsAndYears = {
  months: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  years: ['2024'],
};

const AwardedSearchInput: React.FC<AwardedSearchInputProps> = ({
  onFilter,
}) => {
  const { t } = useTranslation('common');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formData, setFormData] = useState({ month: '', year: '' });

  const validationSchema = Yup.object().shape({
    month: Yup.string().required('Por favor, seleccione un mes'),
    year: Yup.string().required('Por favor, seleccione un año'),
  });

  return (
    <Formik
      initialValues={{
        month: '',
        year: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setFormData({ month: values.month, year: values.year });

        if (onFilter) {
          onFilter({ month: values.month, year: values.year });
        }
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form className="flex w-full justify-center items-center">
          <div className="w-full max-w-screen-2xl flex flex-col md:flex-row justify-center items-center gap-4 ">
            <>
              <div className="w-40 flex flex-col">
                <p className="text-gray-500 text-sm m-2">{t('month')}</p>

                <Field
                  as="select"
                  id="monthInput"
                  className="w-full xl:w-80 h-10 rounded-xl  border-[1.5px] border-[#9665FF] text-[#9665FF] text-sm p-2"
                  name="month"
                >
                  <option value="" disabled>
                    Mes
                  </option>
                  {monthsAndYears.months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="month"
                  component="div"
                  className="text-red-500 text-xs w-full"
                />
              </div>
            </>

            <div className="w-40 flex flex-col ">
              <p className="text-gray-500 text-sm m-2">{t('year')}</p>
              <Field
                as="select"
                id="yearInput"
                className="w-full xl:w-80 h-10 rounded-xl border-[1.5px] border-[#9665FF] text-[#9665FF] text-sm p-2"
                name="year"
              >
                <option value="" disabled>
                  Año
                </option>
                {monthsAndYears.years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="year"
                component="div"
                className="text-red-500 text-xs "
              />
            </div>
            <>
              <div className="flex mt-4 md:mt-auto justify-center items-center">
                <button
                  type="submit"
                  className="h-10 w-40 rounded-xl bg-[#6636E2] text-white text-sm  hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-[#a287e4]"
                >
                  {t('filter')}
                </button>
              </div>
            </>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AwardedSearchInput;
