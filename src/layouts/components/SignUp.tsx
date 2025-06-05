import 'react-datepicker/dist/react-datepicker.css'; // ¡IMPORTANTE: Asegúrate de importar los estilos!

import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ImSpinner9 } from 'react-icons/im';
import { MdError } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { toast } from '@/components/ui/use-toast';
import { useRegisterUserMutation } from '@/graphql/generated';
import { chargeUser } from '@/store';

export default function SignUp() {
  const { t } = useTranslation(['form', 'common', 'errors']);
  const [registerUserMutation] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [startDate, setStartDate] = useState<Date | null>(null);

  const initialValues = {
    first_name: '',
    last_name: '',
    phone_email: '',
    password: '',
    date_birth: null as Date | null, // Cambiado a null inicialmente
    gender: '',
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required(t('errors:firstNameIsRequired')),
    last_name: Yup.string().required(t('errors:lastNameIsRequired')),
    phone_email: Yup.string()
      .required(t('errors:emailOrPhoneIsRequired'))
      .test(
        'phoneOrEmail',
        t('errors:emailOrPhoneIsRequired'),
        (value: any) => {
          if (!value) return false;
          const isPhoneNumber = /^\d{10}$/.test(value.replace(/[-()\s]/g, ''));
          const isEmailAddress = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          return isPhoneNumber || isEmailAddress;
        },
      ),
    password: Yup.string()
      .required(t('errors:passwordIsRequired'))
      .min(8, t('errors:passwordMustBeAtLeast8Characters')),
    date_birth: Yup.date()
      .required(t('errors:dateOfBirthIsRequired'))
      .nullable()
      .test(
        'is-18-or-older',
        t('errors:mustBe18OrOlder'),
        function (value: Date | null) {
          if (!value) return false;
          const today = new Date();
          const birthDate = new Date(value);
          let age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          return age >= 18;
        },
      ),
    gender: Yup.string().required(t('errors:genderIsRequired')),
  });

  const handleSubmit = async (values: any) => {
    try {
      const response = await registerUserMutation({
        variables: {
          firstName: values.first_name,
          lastName: values.last_name,
          phoneEmail: values.phone_email,
          password: values.password,
          birthDate: values.date_birth?.toISOString(),
          gender: values.gender,
        },
      });

      if (response.errors) {
        response.errors.forEach((error: any) => {
          console.log(error.message);
        });
      } else {
        const user = response.data!.registerUser.user;
        const token = response.data!.registerUser.token;

        localStorage.setItem('accessToken', token);
        localStorage.setItem('role', user.role);

        dispatch(
          chargeUser({
            user: { ...response.data!.registerUser.user, password: '' },
            jwt: response.data!.registerUser.token,
          }),
        );

        toast({
          variant: 'success',
          title: '¡Registro exitoso!',
          description: '¡Bienvenido a la comunidad!',
        });

        const Id = localStorage.getItem('surgeryId');
        const destination =
          localStorage.getItem('isRegister') === '1'
            ? `/store/${Id}`
            : localStorage.getItem('isRegister') === ''
              ? '/'
              : '/';

        localStorage.removeItem('isRegister');
        await router.push(destination);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error al registrarse',
        description: '¡Algo salió mal! Por favor, inténtalo de nuevo.',
      });
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <div className="w-80 lg:w-[40vw] flex flex-col  justify-center items-center gap-4">
        <span className="text-drcuotasPrimary-text text-2xl font-black uppercase leading-tight tracking-tight">
          Registrate
        </span>
        <FormikProvider value={formik}>
          <Form className="w-full flex flex-col items-center justify-center gap-4 ">
            <div className="w-full flex flex-col lg:flex-row gap-4">
              <div className="w-full flex flex-col ">
                <Field
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder={t('form:firstName')}
                  className="bg-white border border-black  tracking-tight leading-tight w-full h-8 xl:h-[40px]  px-2 focus:outline-none focus:ring-2 focus:ring-[#6636E2] transition-all duration-300"
                />
                <ErrorMessage
                  name="first_name"
                  component="div"
                  render={(msg) => (
                    <div className="flex items-center text-red-500">
                      <MdError className="mr-1" />
                      <div className="text-[9px] lg:text-xs">{msg}</div>
                    </div>
                  )}
                />
              </div>

              <div className="w-full flex flex-col">
                <Field
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder={t('form:lastName')}
                  className="bg-white border border-black w-full h-8 xl:h-[40px] px-2 focus:outline-none focus:ring-2 focus:ring-[#6636E2] transition-all duration-300"
                />
                <ErrorMessage
                  name="last_name"
                  component="div"
                  render={(msg) => (
                    <div className="flex items-center text-red-500">
                      <MdError className="mr-1" />
                      <div className="text-[9px] lg:text-xs">{msg}</div>
                    </div>
                  )}
                />
              </div>
            </div>

            <div className="w-full flex justify-center items-center ">
              <div className="w-full flex flex-col gap-2">
                <Field
                  type="text"
                  id="phone_email"
                  name="phone_email"
                  placeholder={t('form:emailOrPhone')}
                  className="bg-white border border-black tracking-tight leading-tight w-full h-8 xl:h-[40px] px-2 focus:outline-none focus:ring-2 focus:ring-[#6636E2] transition-all duration-300"
                />
                <ErrorMessage
                  name="phone_email"
                  component="div"
                  render={(msg) => (
                    <div className="flex items-center text-red-500">
                      <MdError className="mr-1" />
                      <div className="text-[9px] lg:text-xs">{msg}</div>
                    </div>
                  )}
                />
              </div>
            </div>

            <div className="w-full flex justify-center items-center">
              <div className="w-full flex flex-col gap-2">
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder={t('form:newPassword')}
                  className="bg-white border border-black tracking-tight leading-tight w-full h-8 xl:h-[40px] px-2 focus:outline-none focus:ring-2 focus:ring-[#6636E2] transition-all duration-300"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  render={(msg) => (
                    <div className="flex items-center text-red-500">
                      <MdError className="mr-1" />
                      <div className="text-[9px] lg:text-xs">{msg}</div>
                    </div>
                  )}
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 flex items-center justify-center bg-gradient-to-r from-[#6636E2] to-[#B398F5] rounded-full">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-gray-700 tracking-tight">
                  Fecha de nacimiento
                </span>
              </div>

              {/* Container del DatePicker con efectos visuales */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#6636E2] to-[#B398F5] rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative">
                  <DatePicker
                    selected={formik.values.date_birth}
                    onChange={(date: Date | null) => {
                      void formik.setFieldValue(
                        'date_birth',
                        date ?? new Date(2000, 0, 1),
                      );
                      setStartDate(date);
                    }}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="DD/MM/AAAA"
                    className="w-[770px] h-12 xl:h-[48px] pl-12 pr-4 bg-white border-2 border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 tracking-tight leading-tight focus:outline-none focus:ring-0 focus:border-[#6636E2] transition-all duration-300 hover:border-[#B398F5] hover:shadow-md cursor-pointer"
                    maxDate={new Date()}
                    minDate={new Date(1900, 0, 1)}
                    showPopperArrow={false}
                    popperClassName="react-datepicker-popper z-50"
                    calendarClassName="shadow-xl border-0 rounded-xl"
                    dayClassName={(date: Date) =>
                      'hover:bg-[#6636E2] hover:text-white rounded-full transition-colors duration-200 cursor-pointer'
                    }
                    weekDayClassName={() => 'text-gray-600 font-medium'}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    yearDropdownItemNumber={100}
                    scrollableYearDropdown
                    autoComplete="off"
                    isClearable={false}
                    shouldCloseOnSelect={true}
                    todayButton="Hoy"
                    onBlur={async () =>
                      await formik.setFieldTouched('date_birth', true)
                    }
                    onFocus={async () =>
                      await formik.setFieldTouched('date_birth', true)
                    }
                  />

                  {/* Icono de calendario dentro del input */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-[#6636E2] transition-colors duration-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Error message mejorado */}
              <ErrorMessage
                name="date_birth"
                component="div"
                render={(msg) => (
                  <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex-shrink-0">
                      <MdError className="w-4 h-4 text-red-500" />
                    </div>
                    <div className="text-xs text-red-600 font-medium">
                      {msg}
                    </div>
                  </div>
                )}
              />
            </div>
            <span className="w-full text-xs text-black ">Genero</span>

            <div className="w-full flex flex-col justify-center">
              <p className="text-sm hidden">{t('form:gender')}</p>

              <div className="w-full flex justify-center items-center gap-4 ">
                <label className="w-full h-8 xl:h-[40px] bg-white border border-black tracking-tight leading-tight text-xs p-2 flex justify-between items-center">
                  {t('constants:woman')}
                  <Field type="radio" name="gender" value="Female" />
                </label>

                <label className="w-full h-8 xl:h-[40px] bg-white border border-black tracking-tight leading-tight text-xs p-2 flex justify-between items-center">
                  {t('constants:man')}
                  <Field type="radio" name="gender" value="Male" />
                </label>

                <label className="w-full h-8 hidden xl:h-[40px] bg-white border border-black tracking-tight leading-tight text-xs p-2  justify-between items-center">
                  {t('constants:preferNotSay')}
                  <Field type="radio" name="gender" value="PreferNotToSay" />
                </label>
              </div>
              <ErrorMessage
                name="gender"
                component="div"
                render={(msg) => (
                  <div className="flex items-center text-red-500">
                    <MdError className="mr-1" />
                    <div className="text-[9px] lg:text-xs">{msg}</div>
                  </div>
                )}
              />
            </div>

            <p className="w-full text-justify text-xs text-gray-500 hidden">
              {t('common:registerDescription')}
            </p>

            <button
              type="submit"
              className="bg-drcuotasPrimary-bg text-white h-12 w-full  flex justify-center items-center leading-tight tracking-tight uppercase hover:scale-100 transition-all duration-300 hover:shadow-2xl hover:shadow-[#B398F5] hover:bg-white hover:border hover:text-[#6636E2] hover:border-[#6636E2]"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <ImSpinner9 className="animate-spin h-6 text-white" />
              ) : (
                t('Registrarse')
              )}
            </button>
          </Form>
        </FormikProvider>
      </div>
    </>
  );
}
