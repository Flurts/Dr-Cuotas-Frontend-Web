import { format } from 'date-fns';
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { ImSpinner9 } from 'react-icons/im';
import { MdError } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { toast } from '@/components/ui/use-toast';
import { useRegisterUserMutation } from '@/graphql/generated';
import { chargeUser } from '@/store';

export default function RegisterModal() {
  const { t } = useTranslation(['form', 'common', 'errors']);
  const [dias, setDias] = useState([]);
  const [meses, setMeses] = useState([]);
  const [anios, setAnios] = useState([]);
  const [registerUserMutation] = useRegisterUserMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    const diasOptions = [];
    for (let i = 1; i <= 31; i++) {
      diasOptions.push(
        <option key={i} value={i}>
          {i}
        </option>,
      );
    }
    setDias(diasOptions as any);

    const mesesOptions = [];

    for (let i = 1; i <= 12; i++) {
      mesesOptions.push(
        <option key={i} value={i}>
          {format(new Date(2000, i - 1, 1), 'MMM')}
        </option>,
      );
    }
    setMeses(mesesOptions as any);

    const anioActual = new Date().getFullYear();
    const aniosOptions = [];
    for (let i = anioActual; i >= anioActual - 100; i--) {
      aniosOptions.push(
        <option key={i} value={i}>
          {i}
        </option>,
      );
    }
    setAnios(aniosOptions as any);
  }, []);

  const initialValues = {
    first_name: '',
    last_name: '',
    phone_email: '',
    password: '',
    date_birth: {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: 2000, // Set the default year to 2000
    },
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
    date_birth: Yup.object({
      day: Yup.number().required(t('errors:dayOfBirthIsRequired')),
      month: Yup.number().required(t('errors:monthOfBirthIsRequired')),
      year: Yup.number().required(t('errors:yearOfBirthIsRequired')),
    }).test(
      'is-18-or-older',
      t('errors:mustBe18OrOlder'),
      function (value: any) {
        const { day, month, year } = value;
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
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
          birthDate: new Date(
            values.date_birth.year,
            values.date_birth.month - 1,
            values.date_birth.day,
          ).toISOString(),

          gender: values.gender,
        },
      });

      if (response.errors) {
        response.errors.forEach((error: any) => {
          console.log(error.message);
        });
      } else {
        dispatch(
          chargeUser({
            // @ts-expect-error The user is not null here
            user: response.data!.registerUser.user,
            jwt: response.data!.registerUser.token,
          }),
        );

        toast({
          variant: 'success',
          title: '¡Registro exitoso!',
          description: '¡Bienvenido a la comunidad!',
        });
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
                  className="bg-white border rounded-md text-[#737373]  tracking-tight leading-tight w-full h-8 xl:h-[40px]  px-2 focus:outline-none focus:ring-2 focus:ring-[#6636E2] transition-all duration-300"
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
                  className="bg-white border rounded-md text-slate-800 w-full h-8 xl:h-[40px] px-2 focus:outline-none focus:ring-2 focus:ring-[#6636E2] transition-all duration-300"
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
                  className="bg-white border rounded-md text-[#737373]  tracking-tight leading-tight w-full h-8 xl:h-[40px] px-2 focus:outline-none focus:ring-2 focus:ring-[#6636E2] transition-all duration-300"
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
                  className="bg-white border rounded-md text-[#737373]  tracking-tight leading-tight w-full h-8 xl:h-[40px] px-2 focus:outline-none focus:ring-2 focus:ring-[#6636E2] transition-all duration-300"
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

            <div className="w-full flex flex-col justify-center">
              <p className="text-sm hidden">{t('form:dateOfBirth')}</p>
              <div className="flex flex-row gap-4 w-full">
                <Field
                  as="select"
                  id="date_birth.day"
                  name="date_birth.day"
                  className="w-full h-8 xl:h-[40px] px-2 bg-white border rounded-md text-[#737373]  tracking-tight leading-tight focus:outline-none focus:ring-2 focus:ring-[#6636E2] transition-all duration-300"
                >
                  {dias}
                </Field>

                <Field
                  as="select"
                  id="date_birth.month"
                  name="date_birth.month"
                  className="w-full h-8 xl:h-[40px] px-2 bg-white border rounded-md text-[#737373]  tracking-tight leading-tight focus:outline-none focus:ring-2 focus:ring-[#6636E2] transition-all duration-300"
                >
                  {meses}
                </Field>

                <Field
                  as="select"
                  id="date_birth.year"
                  name="date_birth.year"
                  className="w-full h-8 xl:h-[40px] px-2 bg-white border rounded-md text-[#737373]  tracking-tight leading-tight focus:outline-none focus:ring-2 focus:ring-[#6636E2] transition-all duration-300"
                >
                  {anios}
                </Field>
              </div>
              <ErrorMessage
                name="date_birth"
                component="div"
                render={(msg) => (
                  <div className="flex items-center text-red-500">
                    <MdError className="mr-1" />
                    <div className="text-[9px] lg:text-xs">{msg}</div>
                  </div>
                )}
              />
            </div>

            <div className="w-full flex flex-col justify-center">
              <p className="text-sm hidden">{t('form:gender')}</p>

              <div className="w-full flex justify-center items-center gap-4 ">
                <label className="w-full h-8 xl:h-[40px] bg-white border rounded-md text-[#737373] tracking-tight leading-tight text-xs p-2 flex justify-between items-center">
                  {t('constants:woman')}
                  <Field type="radio" name="gender" value="Female" />
                </label>

                <label className="w-full h-8 xl:h-[40px] bg-white border rounded-md text-[#737373] tracking-tight leading-tight text-xs p-2 flex justify-between items-center">
                  {t('constants:man')}
                  <Field type="radio" name="gender" value="Male" />
                </label>

                <label className="w-full h-8 hidden xl:h-[40px] bg-white border rounded-md text-[#737373] tracking-tight leading-tight text-xs p-2  justify-between items-center">
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
              className="bg-drcuotasPrimary-bg text-white  h-12 w-full rounded-md justify-center items-center leading-tight tracking-tight uppercase  hover:scale-100 transition-all duration-300 hover:shadow-2xl hover:shadow-[#B398F5]  hover:bg-white hover:border hover:text-[#6636E2] hover:border-[#6636E2]"
            >
              {formik.isSubmitting ? (
                <ImSpinner9 className="animate-spin h-6 text-white w-full" />
              ) : (
                t('Registrarse')
              )}
            </button>
          </Form>
        </FormikProvider>
          <div className="flex flex-col gap-6 w-full justify-center items-center">
            <span className="text-drcuotasTertiary-text text-xs w-full text-center leading-tight tracking-tight">
              o continuar con
            </span>
            <div className="flex flex-row items-center justify-center w-full gap-2">
              <button
                type="button"
                className=""
                onClick={async () => {
                  await signIn('google');
                }}
              >
                <FcGoogle className="w-7 h-7" />
              </button>
            </div>
          </div>
      </div>
    </>
  );
}
