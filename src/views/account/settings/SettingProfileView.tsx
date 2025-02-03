import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  FormikProvider,
  useFormik,
} from 'formik';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { ImSpinner9 } from 'react-icons/im';
import { MdError } from 'react-icons/md';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { getCurrentUser } from '@/store';
import { Gender, SocialMedia, useUpdateProfileSettingsMutation } from '@/types';
import { socialMediaIcons } from '@/utils/social-media-icos';

export default function SettingsProfileView() {
  const { t } = useTranslation(['common', 'form']);
  const user = useSelector(getCurrentUser);
  const [UpdateProfileSettings] = useUpdateProfileSettingsMutation();

  const initialValues = {
    identification_document: user.identification_document ?? '',
    gender: user.gender ?? '',
    socialMedia: (user.social_media ?? []) as Array<{
      type: string;
      link: string;
    }>,
  };

  const validationSchema = Yup.object().shape({
    identification_document: Yup.string().required('Document is required'),
    gender: Yup.mixed<Gender>()
      .oneOf(Object.values(Gender), 'Invalid gender')
      .required('Gender is required'),
    socialMedia: Yup.array().of(
      Yup.object().shape({
        type: Yup.string().required('Social media type is required'),
        link: Yup.string().url('Invalid URL').required('Link is required'),
      }),
    ),
  });
  const handleSubmitEditInfo = async (values: typeof initialValues) => {
    try {
      await UpdateProfileSettings({
        variables: {
          identificationDocument: values.identification_document,
          gender: values.gender,
          socialMedia: values.socialMedia.map((social) => ({
            type: social.type as SocialMedia,
            link: social.link,
          })),
        },
      });

      // Show success message
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
              {t('common:profile')}
            </h2>
            <p className="text-muted-foreground">
              {t('common:profileDescription')}
            </p>
          </div>
          <Separator className="my-6" />
          <FormikProvider value={formik}>
            <Form className="flex flex-col gap-6">
              <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <div className="flex flex-col w-full gap-7 lg:max-w-2xl">
                  <div className="flex flex-col gap-2 w-full">
                    <span className="text-base font-semibold text-slate-800">
                      {t('form:documentField')}
                    </span>
                    <Field
                      name="identification_document"
                      placeholder={t('form:documentPlaceholder')}
                      className="bg-white border border-[#6636E2] rounded-md text-slate-800 w-full h-8 xl:h-[40px] px-2 focus:outline-none focus:ring-2 focus:ring-[#6636E2] transition-all duration-300"
                    />
                    <ErrorMessage
                      name="identification_document"
                      component="div"
                      render={(msg) => (
                        <div className="flex items-center text-red-500">
                          <MdError className="mr-1" />
                          <div className="text-sm lg:text-base">{msg}</div>
                        </div>
                      )}
                    />
                    <span className="text-sm font-light text-slate-500">
                      {t('form:documentFieldDescription')}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <span className="text-base font-semibold text-slate-800">
                      {t('form:genderField')}
                    </span>
                    <Field
                      as="select"
                      name="gender"
                      className="bg-white border border-[#6636E2] rounded-md text-slate-800 w-full h-8 xl:h-[40px] px-2 focus:outline-none focus:ring-2 focus:ring-[#6636E2] transition-all duration-300"
                    >
                      {Object.values(Gender).map((gender) => (
                        <option
                          key={gender}
                          value={gender}
                          label={t(`form:genderFields.${gender}`)}
                        />
                      ))}
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      render={(msg) => (
                        <div className="flex items-center text-red-500">
                          <MdError className="mr-1" />
                          <div className="text-sm lg:text-base">{msg}</div>
                        </div>
                      )}
                    />
                    <span className="text-sm font-light text-slate-500">
                      {t('form:genderFieldDescription')}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <span className="text-base font-semibold text-slate-800">
                      {t('form:socialMediaField')}
                    </span>
                    <span className="text-sm font-light text-slate-500">
                      {t('form:socialMediaFieldDescription')}
                    </span>
                    <FieldArray name="socialMedia">
                      {({ insert, remove, push }) => {
                        // Obtiene los tipos de redes sociales ya seleccionados
                        const selectedSocialMedia =
                          formik.values.socialMedia.map(
                            (social) => social.type,
                          );

                        return (
                          <>
                            {formik.values.socialMedia.length > 0 &&
                              formik.values.socialMedia.map((social, index) => {
                                const Icon =
                                  socialMediaIcons[social.type as SocialMedia];

                                return (
                                  <div
                                    className="flex flex-col gap-2 w-full"
                                    key={index}
                                  >
                                    <div className="flex flex-row gap-2 w-full items-center">
                                      {Icon && (
                                        <Icon className="text-3xl text-[#6636E2]" />
                                      )}{' '}
                                      {/* Muestra el icono */}
                                      <Field
                                        as="select"
                                        name={`socialMedia.${index}.type`}
                                        className="bg-white border border-[#6636E2] rounded-md text-slate-800 w-1/3 h-8 xl:h-[40px] px-2 focus:outline-none focus:ring-2 focus:ring-[#6636E2] transition-all duration-300"
                                      >
                                        {Object.values(SocialMedia).map(
                                          (media) =>
                                            !selectedSocialMedia.includes(
                                              media,
                                            ) || media === social.type ? (
                                              <option
                                                key={media}
                                                value={media}
                                                label={media}
                                              />
                                            ) : null,
                                        )}
                                      </Field>
                                      <Field
                                        name={`socialMedia.${index}.link`}
                                        placeholder={t(
                                          'form:socialMediaLinkPlaceholder',
                                        )}
                                        className="bg-white border border-[#6636E2] rounded-md text-slate-800 w-1/2 h-8 xl:h-[40px] px-2 focus:outline-none focus:ring-2 focus:ring-[#6636E2] transition-all duration-300"
                                      />
                                      <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                      >
                                        {t('form:remove')}
                                      </Button>
                                    </div>
                                    <ErrorMessage
                                      name={`socialMedia.${index}.type`}
                                      component="div"
                                      className="text-red-500"
                                    />
                                    <ErrorMessage
                                      name={`socialMedia.${index}.link`}
                                      component="div"
                                      className="text-red-500"
                                    />
                                  </div>
                                );
                              })}
                            <div className="flex flex-col gap-2 w-full justify-center items-center">
                              <Button
                                type="button"
                                onClick={() => {
                                  push({
                                    type:
                                      selectedSocialMedia.length > 0
                                        ? Object.values(SocialMedia).find(
                                            (media) =>
                                              !selectedSocialMedia.includes(
                                                media,
                                              ),
                                          )
                                        : Object.values(SocialMedia)[0],
                                    link: '',
                                  });
                                }}
                                className="bg-[#6636E2] text-white py-1 px-3 rounded-md w-8/12"
                              >
                                {t('form:addSocialMedia')}
                              </Button>
                            </div>
                          </>
                        );
                      }}
                    </FieldArray>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <Button
                  type="submit"
                  className="bg-[#6636E2] w-[200px] text-base text-white py-1 px-3 rounded-md justify-center items-center hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-[#B398F5]"
                >
                  {formik.isSubmitting ? (
                    <ImSpinner9 className="animate-spin h-6 text-white w-full" />
                  ) : (
                    t('form:saveChanges')
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
