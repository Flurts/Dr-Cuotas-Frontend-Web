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
        <div className="hidden space-y-6 p-10 pb-16 md:block w-full max-w-screen-2xl">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">
              {t('common:account')}
            </h2>
            <p className="text-muted-foreground">
              {t('common:accountDescription')}
            </p>
          </div>
          <Separator className="my-6" />
          <FormikProvider value={formik}>
            <Form className="flex flex-col gap-6">
              <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <div className="flex flex-col w-full gap-7 lg:max-w-2xl">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex flex-row gap-2 w-full">
                      <div className="flex flex-col gap-2 w-1/2">
                        <span className="text-base font-semibold text-slate-800">
                          {t('form:firstName')}
                        </span>
                        <Field
                          type="text"
                          id="first_name"
                          name="first_name"
                          placeholder={t('form:firstName')}
                          className="bg-white border border-[#6636E2] rounded-md text-slate-800 w-full h-8 xl:h-[40px]  px-2 focus:outline-none focus:ring-2 focus:ring-[#6636E2] transition-all duration-300"
                        />
                        <ErrorMessage
                          name="first_name"
                          component="div"
                          render={(msg) => (
                            <div className="flex items-center text-red-500">
                              <MdError className="mr-1" />
                              <div className="text-sm lg:text-base">{msg}</div>
                            </div>
                          )}
                        />
                      </div>
                      <div className="flex flex-col gap-2 w-1/2">
                        <span className="text-base font-semibold text-slate-800">
                          {t('form:lastName')}
                        </span>
                        <Field
                          type="text"
                          id="first_name"
                          name="first_name"
                          placeholder={t('form:lastName')}
                          className="bg-white border border-[#6636E2] rounded-md text-slate-800 w-full h-8 xl:h-[40px]  px-2 focus:outline-none focus:ring-2 focus:ring-[#6636E2] transition-all duration-300"
                        />
                        <ErrorMessage
                          name="first_name"
                          component="div"
                          render={(msg) => (
                            <div className="flex items-center text-red-500">
                              <MdError className="mr-1" />
                              <div className="text-sm lg:text-base">{msg}</div>
                            </div>
                          )}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-light text-slate-500">
                      {t('form:namesDescription')}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <Field name="birth_Date" component={DatePickerField} />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <span className="text-base font-semibold text-slate-800">
                      {t('form:emailField')}
                    </span>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder={t('form:emailPlaceholder')}
                      className="bg-white border border-[#6636E2] rounded-md text-slate-800 w-full h-8 xl:h-[40px]  px-2 focus:outline-none focus:ring-2 focus:ring-[#6636E2] transition-all duration-300"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      render={(msg) => (
                        <div className="flex items-center text-red-500">
                          <MdError className="mr-1" />
                          <div className="text-sm lg:text-base">{msg}</div>
                        </div>
                      )}
                    />
                    <span className="text-sm font-light text-slate-500">
                      {t('form:emailFieldDescription')}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <span className="text-base font-semibold text-slate-800">
                      {t('form:phoneField')}
                    </span>
                    <Field
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder={t('form:phonePlaceholder')}
                      className="bg-white border border-[#6636E2] rounded-md text-slate-800 w-full h-8 xl:h-[40px]  px-2 focus:outline-none focus:ring-2 focus:ring-[#6636E2] transition-all duration-300"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      render={(msg) => (
                        <div className="flex items-center text-red-500">
                          <MdError className="mr-1" />
                          <div className="text-sm lg:text-base">{msg}</div>
                        </div>
                      )}
                    />
                    <span className="text-sm font-light text-slate-500">
                      {t('form:phoneFieldDescription')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <Button
                  type="submit"
                  className="bg-[#6636E2] w-[200px] text-base text-white py-1 px-3 rounded-md justify-center items-center  hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-[#B398F5]"
                >
                  {formik.isSubmitting ? (
                    <ImSpinner9 className="animate-spin h-6 text-white w-full" />
                  ) : (
                    t('common:saveChanges')
                  )}
                </Button>
              </div>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </>
  );
}
