import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { ImSpinner9 } from 'react-icons/im';
import { MdError } from 'react-icons/md';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import { DatePickerField } from '@/components/common/Account/DataPickerField';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { getCurrentUser } from '@/store';
import { useUpdateAccountSettingsMutation } from '@/types';

export default function AccountSettingsView() {
  const { t } = useTranslation(['common', 'form']);
  const user = useSelector(getCurrentUser);
  const [UpdateAccountSettings] = useUpdateAccountSettingsMutation();

  const initialValues = {
    first_name: user?.first_name ?? '',
    last_name: user?.last_name ?? '',
    email: user?.email ?? '',
    phone: user?.phone_number ?? '',
    birth_Date: user?.birth_date ?? null,
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().max(255).required('First name is required'),
    last_name: Yup.string().max(255).required('Last name is required'),
    email: Yup.string().email().max(255).required('Email is required'),
    phone: Yup.string().max(255).required('Phone number is required'),
    birth_Date: Yup.date().nullable(),
  });

  const handleSubmitEditInfo = async (values: typeof initialValues) => {
    try {
      await UpdateAccountSettings({
        variables: {
          firstName: values.first_name,
          lastName: values.last_name,
          email: values.email,
          phone: values.phone,
          birthDate: values.birth_Date,
        },
      });

      // Show success messaged
      toast({
        variant: 'success',
        title: t('form:success'),
        description: t('form:successDescription'),
      });
    } catch (error) {
      // Show error message
      toast({
        variant: 'destructive',
        title: t('form:error'),
        description: t('form:errorDescription'),
      });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmitEditInfo,
    enableReinitialize: true,
  });

  return (
    <>
      <div className="flex flex-col justify-center w-full">
        <Separator className="my-4" />
        <>
          <div className="w-full border rounded-xl p-10 ">
            <>
              <div className="mb-10">
                <h2 className="text-base font-semibold text-drcuotasTertiary-text leading-tight tracking-tight">
                  {t('common:account')}
                </h2>
                <p className="text-sm  text-drcuotasTertiary-text leading-tight tracking-tight">
                  {t('common:accountDescription')}
                </p>
              </div>
            </>
            <>
              <FormikProvider value={formik}>
                <Form className="flex flex-col gap-4">
                  <div className="w-full h-full justify-center items-center flex flex-col gap-10">
                    <>
                      <div className="flex flex-col w-full gap-10">
                        <>
                          <div className="flex flex-col w-full">
                            <div className="flex flex-row gap-2 w-full">
                              {/* Nombre  */}
                              <>
                                <div className="flex flex-col gap-2 w-1/2">
                                  <span className="text-base font-semibold text-drcuotasTertiary-text leading-tight tracking-tight">
                                    {t('form:firstName')}
                                  </span>
                                  <Field
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    placeholder={t('form:firstName')}
                                    className="bg-white border border-drcuotasPrimary-bg rounded-xl  text-drcuotasTertiary-text leading-tight tracking-tight w-full h-14 p-2 focus:outline-none focus:ring-2 focus:ring-drcuotasPrimary-bg transition-all duration-300"
                                  />
                                  <ErrorMessage
                                    name="first_name"
                                    component="div"
                                    render={(msg) => (
                                      <div className="flex items-center text-red-500">
                                        <MdError className="mr-1" />
                                        <div className="text-sm lg:text-base">
                                          {msg}
                                        </div>
                                      </div>
                                    )}
                                  />
                                </div>
                              </>
                              {/* Apellido  */}
                              <>
                                <div className="flex flex-col gap-2 w-1/2">
                                  <span className="text-base font-semibold text-drcuotasTertiary-text leading-tight tracking-tight">
                                    {t('form:lastName')}
                                  </span>
                                  <Field
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    placeholder={t('form:lastName')}
                                    className="bg-white border border-drcuotasPrimary-bg rounded-xl  text-drcuotasTertiary-text leading-tight tracking-tight w-full h-14 p-2 focus:outline-none focus:ring-2 focus:ring-drcuotasPrimary-bg transition-all duration-300"
                                  />
                                  <ErrorMessage
                                    name="last_name"
                                    component="div"
                                    render={(msg) => (
                                      <div className="flex items-center text-red-500">
                                        <MdError className="mr-1" />
                                        <div className="text-sm lg:text-base">
                                          {msg}
                                        </div>
                                      </div>
                                    )}
                                  />
                                </div>
                              </>
                            </div>
                          </div>
                        </>
                        <>
                          <div className="flex flex-col w-full">
                            <Field
                              name="birth_Date"
                              component={DatePickerField}
                            />
                          </div>
                        </>
                        <>
                          <div className="flex flex-col w-full">
                            <span className="text-base font-semibold text-drcuotasTertiary-text leading-tight tracking-tight">
                              {t('form:emailField')}
                            </span>
                            <span className="text-sm  text-drcuotasTertiary-text leading-tight tracking-tight mb-4">
                              {t('form:emailFieldDescription')}
                            </span>
                            <Field
                              type="email"
                              id="email"
                              name="email"
                              placeholder={t('form:emailPlaceholder')}
                              className="bg-white border border-drcuotasPrimary-bg rounded-xl  text-drcuotasTertiary-text leading-tight tracking-tight w-full h-14 p-2 focus:outline-none focus:ring-2 focus:ring-drcuotasPrimary-bg transition-all duration-300"
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              render={(msg) => (
                                <div className="flex items-center text-red-500">
                                  <MdError className="mr-1" />
                                  <div className="text-sm lg:text-base">
                                    {msg}
                                  </div>
                                </div>
                              )}
                            />
                          </div>
                        </>
                        <>
                          <div className="flex flex-col gap-2 w-full mb-10">
                            <span className="text-base font-semibold text-drcuotasTertiary-text leading-tight tracking-tight">
                              {t('form:phoneField')}
                            </span>
                            <span className="text-sm  text-drcuotasTertiary-text leading-tight tracking-tight">
                              {t('form:phoneFieldDescription')}
                            </span>
                            <Field
                              type="text"
                              id="phone"
                              name="phone"
                              placeholder={t('form:phonePlaceholder')}
                              className="bg-white border border-drcuotasPrimary-bg rounded-xl text-drcuotasTertiary-text leading-tight tracking-tight w-full h-14 p-2 focus:outline-none focus:ring-2 focus:ring-drcuotasPrimary-bg transition-all duration-300"
                            />
                            <ErrorMessage
                              name="phone"
                              component="div"
                              render={(msg) => (
                                <div className="flex items-center text-red-500">
                                  <MdError className="mr-1" />
                                  <div className="text-sm lg:text-base">
                                    {msg}
                                  </div>
                                </div>
                              )}
                            />
                          </div>
                        </>
                      </div>
                    </>
                  </div>
                  {/* Guardar Cambios  */}
                  <>
                    <div className="flex flex-col">
                      <Button
                        type="submit"
                        className="bg-drcuotasPrimary-bg w-full h-14 text-base text-white  rounded-xl justify-center items-center    uppercase leading-tight tracking-tight"
                      >
                        {formik.isSubmitting ? (
                          <ImSpinner9 className="animate-spin h-6 text-white w-full" />
                        ) : (
                          t('common:saveChanges')
                        )}
                      </Button>
                    </div>
                  </>
                </Form>
              </FormikProvider>
            </>
          </div>
        </>
      </div>
    </>
  );
}
