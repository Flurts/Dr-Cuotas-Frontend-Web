import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { MdError, MdKeyboardArrowLeft } from 'react-icons/md';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import { toast } from '@/components/ui/use-toast';
import { getCurrentUser } from '@/store';
import { Surgery, useSubscribeSurgerieMutation } from '@/types';
import currencyFormatter from '@/utils/currencyFormatter';

function SlugProductView({
  item,
  isLogged,
}: {
  isLogged: boolean;
  item: Surgery;
}) {
  const user = useSelector(getCurrentUser);
  // Lista de provincias y localidades (ejemplo)
  const provinces = ['Buenos Aires', 'Córdoba', 'Santa Fe'];
  const localities = {
    'Buenos Aires': ['La Plata', 'Mar del Plata', 'Bahía Blanca'],
    Córdoba: ['Córdoba Capital', 'Villa María', 'Río Cuarto'],
    'Santa Fe': ['Rosario', 'Santa Fe Capital', 'Venado Tuerto'],
  };
  const [subscribeSurgerie] = useSubscribeSurgerieMutation();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    firstName: user.first_name ?? '',
    lastName: user.last_name ?? '',
    dni_document: user.identification_document ?? '',
    province: '',
    localitie: '',
    email: user.email ?? '',
    phone: user.phone_number ?? '',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    dni_document: Yup.string().required('DNI is required'),
    province: Yup.string().required('Province is required'),
    localidad: Yup.string().required('Locality is required'),
    email: Yup.string()
      .email('Email must be a valid email')
      .required('Email is required'),
    phone: Yup.string().required('Phone is required'),
  });

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      await subscribeSurgerie({
        variables: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          documentIdentification: values.dni_document,
          coments: values.description,
          surgerieId: item.id,
        },
      });

      toast({
        variant: 'success',
        title: 'Success',
        description: 'You have been subscribed to the surgery',
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An error occurred, please try again later',
      });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });
  const { t } = useTranslation('common');

  return (
    <>
      <div className="bg-gray-100  w-full h-96"></div>

      <div className="flex flex-col md:flex-row  justify-center w-full h-full -mt-80">
        <>
          <div className="flex flex-col justify-center  items-center w-full  lg:w-1/4 h-full gap-2">
            <div className="md:hidden flex w-full -mt-12 mb-16">
              <Link
                href="/store"
                className=" flex md:hidden flex-row items-center w-full"
              >
                <MdKeyboardArrowLeft className="text-4xl text-[#6636E2] ml-1" />
                <span className=" text-sm text-gray-500">
                  {t('surgeriesProducts.backToList')}
                </span>
              </Link>
            </div>

            <span className="text-[#6636E2] text-4xl text-center w-screen block md:hidden font-bold mb-16">
              {item.name}
            </span>
            <div className="w-3/3 flex items-center">
              <Image
                src={
                  item.file_banner?.file_link ??
                  '/images/surgerys/chest_body.svg'
                }
                alt="surgery"
                width={400}
                height={500}
                className="w-[300px] h-[400px]  lg:w-[500px] lg:h-[600px] object-cover"
              />
            </div>

            <div className="flex md:hidden flex-col items-center gap-4  my-8">
              <div className=" w-96  flex flex-col  items-center gap-0">
                <p className="text-2xl text-center text-[#9665FF] font-bold">
                  10 Cuotas de {currencyFormatter(item.amount / 10 ?? 0)}
                </p>
                {/* <p className="text-gray-500 font-normal">(u$s 200)</p> */}
              </div>

              <div className="w-96 flex flex-col items-center gap-0">
                <p className="text-xl text-[#9665FF]">
                  Valor Total: {currencyFormatter(item.amount ?? 0)}
                </p>
                {/* <p className="text-gray-500 font-normal">(u$s 2000)</p> */}
              </div>
            </div>

            <div className="flex flex-col w-3/4 lg:w-full  items-center">
              {item.description && (
                <span className="text-justify  sm:text-sm md:text-xs xl:text-sm   text-leading-[1.1] text-gray-500">
                  {item.description}
                </span>
              )}

              <span className="flex justify-end text-end w-full font-normal my-2 text-[10px] md:text-[12px] lg:text-sm text-[#6636E2] ">
                {t('surgeriesProducts.seeGeneralConditions')}
              </span>
            </div>
          </div>
        </>

        <div className="flex flex-col justify-center md:mt-0 w-full md:w-full lg:w-1/3  lg:px-8 h-full md:gap-8">
          <Link
            href="/store"
            className="hidden md:flex flex-row items-center w-auto"
          >
            <MdKeyboardArrowLeft className="text-4xl text-[#6636E2] -ml-1" />
            <span className=" text-sm text-gray-500">
              {t('surgeriesProducts.backToList')}
            </span>
          </Link>

          <div className="flex flex-col px-[60px] gap-10">
            <span className="text-[#6636E2] hidden   md:block text-4xl font-bold">
              {item.name}
            </span>

            <div className="hidden md:flex flex-col items-center gap-8 xl:gap-1 ">
              <div className=" w-full flex md:flex-col xl:flex-row items-start gap-0 lg:gap-1 xl:gap-4">
                <p className="xl:text-2xl text-2xl  text-[#9665FF] font-bold">
                  {t('surgeriesProducts.10InstallmentsOf')}{' '}
                  {currencyFormatter(item.amount / 10 ?? 0)}
                </p>
                {/* <p className="lg:text-base text-xs text-gray-500 font-normal">
                (u$s 200)
              </p> */}
              </div>

              <div className="w-96 md:w-full  flex md:flex-col xl:flex-row   items-start gap-1  lg:gap-1 xl:gap-4">
                <p className="lg:text-2xl text-sm text-[#9665FF]">
                  {t('surgeriesProducts.totalValue')}{' '}
                  {currencyFormatter(item.amount ?? 0)}
                </p>
                {/* <p className="lg:text-base text-xs text-gray-500 font-normal">
                (u$s 2000)
              </p> */}
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="w-auto flex justify-center items-center md:p-6 md:mt-5">
            <div className="mt-2 md:mt-5 flex md:flex flex-col w-auto justify-center items-center">
              {isLogged && (
                <>
                  <div className="w-80 md:w-full flex">
                    <span className="font-semibold text-center text-2xl md:text-base">
                      {t('surgeriesProducts.prescriptionForm')}
                    </span>
                  </div>

                  <FormikProvider value={formik}>
                    <Form className="flex flex-col w-full justify-center mt-6 gap-3">
                      <div className="flex flex-row gap-2">
                        <div className="w-full relative">
                          <Field
                            name="firstName"
                            type="text"
                            placeholder={t('surgeriesForm.firstName')}
                            className="w-full p-2 rounded-md border"
                          />
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            render={(msg) => (
                              <div className="flex items-center text-red-500">
                                <MdError className="mr-1" />
                                <div>{msg}</div>
                              </div>
                            )}
                          />
                        </div>
                        <div className="w-full relative">
                          <Field
                            name="lastName"
                            type="text"
                            placeholder={t('surgeriesForm.lastName')}
                            className="w-full p-2 rounded-md border"
                          />
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            render={(msg) => (
                              <div className="flex items-center text-red-500">
                                <MdError className="mr-1" />
                                <div>{msg}</div>
                              </div>
                            )}
                          />
                        </div>
                      </div>
                      <div className="flex flex-row gap-2">
                        <div className="w-full relative">
                          <Field
                            name="dni_document"
                            type="text"
                            placeholder="DNI*"
                            className="w-full p-2 rounded-md border"
                          />
                          <ErrorMessage
                            name="dni_document"
                            component="div"
                            render={(msg) => (
                              <div className="flex items-center text-red-500">
                                <MdError className="mr-1" />
                                <div>{msg}</div>
                              </div>
                            )}
                          />
                        </div>
                        <div className="w-full relative">
                          <Field
                            name="phone"
                            type="text"
                            placeholder={t('surgeriesForm.phoneNumber')}
                            className="w-full p-2 rounded-md border"
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            render={(msg) => (
                              <div className="flex items-center text-red-500">
                                <MdError className="mr-1" />
                                <div>{msg}</div>
                              </div>
                            )}
                          />
                        </div>
                      </div>
                      <div className="flex flex-row w-full gap-2">
                        <div className="flex flex-col w-full">
                          <Field
                            as="select"
                            name="province"
                            placeholder="Provincia *"
                            className="w-full p-2 rounded-md border text-gray-500"
                          >
                            <option value="">
                              {t('surgeriesForm.province')}
                            </option>
                            {provinces.map((province) => (
                              <option key={province} value={province}>
                                {province}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="province"
                            component="div"
                            render={(msg) => (
                              <div className="flex items-center text-red-500">
                                <MdError className="mr-1" />
                                <div>{msg}</div>
                              </div>
                            )}
                          />
                        </div>
                        <div className="flex flex-col w-full ">
                          <Field
                            as="select"
                            name="localidad"
                            placeholder="Localidad *"
                            className="w-full p-2 rounded-md border text-gray-500"
                          >
                            <option value="">
                              {t('surgeriesForm.locality')}
                            </option>
                            {localities[
                              formik.values.province as keyof typeof localities
                            ]?.map((locality) => (
                              <option key={locality} value={locality}>
                                {locality}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="localidad"
                            component="div"
                            render={(msg) => (
                              <div className="flex items-center text-red-500">
                                <MdError className="mr-1" />
                                <div>{msg}</div>
                              </div>
                            )}
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <Field
                          name="email"
                          type="text"
                          placeholder="Email *"
                          className="w-full p-2 rounded-md border"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          render={(msg) => (
                            <div className="flex items-center text-red-500">
                              <MdError className="mr-1" />
                              <div>{msg}</div>
                            </div>
                          )}
                        />
                      </div>
                      <div className="relative w-full">
                        <Field
                          name="description"
                          type="text"
                          placeholder={t('surgeriesForm.comment')}
                          as="textarea"
                          className="w-full h-[100px] min-h-[100px] max-h-[500px] p-2 rounded-md border"
                        />
                      </div>
                      <div className="flex w-full items-center justify-center mt-2">
                        <button
                          disabled={isLoading}
                          type="submit"
                          className="w-[200px] p-2 bg-[#6636E2] text-white text-xl font-semibold rounded-full"
                        >
                          {t('surgeriesProducts.PresubscribeMe')}
                        </button>
                      </div>
                    </Form>
                  </FormikProvider>
                </>
              )}

              {!isLogged && (
                <div className="flex flex-col items-center gap-4 mt-8">
                  <span className="text-[#6636E2] text-lg text-center">
                    {t('surgeriesProducts.subscribe')}
                  </span>
                  <Link href="/login">
                    <div className="rounded-full border-[#6636E2] bg-[#6636E2] text-white text-lg flex justify-center items-center gap-2 group w-[150px] h-[40px] hover:bg-[#6636E9] hover:border-[#6636E9] hover:text-white transition-all duration-300 hover:scale-105">
                      <span className="font-semibold">{t('login')}</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SlugProductView;
