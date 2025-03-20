import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  FormikProvider,
  useFormik,
} from 'formik';
import { LucideUserRoundPlus } from 'lucide-react';
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
      <div className="w-full h-full">
        <>
          <Separator className="my-4" />
          <FormikProvider value={formik}>
            <Form className="flex flex-col gap-2">
              <>
                <div className="w-full border rounded-xl p-10">
                  <>
                    <div className="w-full h-full justify-center items-center flex flex-col gap-10">
                      {/* Documento de Identidad  */}
                      <>
                        <div className="flex flex-col  w-full h-full">
                          <span className="text-base font-semibold text-drcuotasTertiary-text leading-tight tracking-tight">
                            {t('form:documentField')}
                          </span>
                          <span className="text-sm font-light text-drcuotasTertiary-text leading-tight tracking-tight mb-4">
                            {t('form:documentFieldDescription')}
                          </span>
                          <Field
                            name="identification_document"
                            placeholder={t('form:documentPlaceholder')}
                            className="bg-white border border-drcuotasPrimary-bg rounded-xl text-base text-drcuotasTertiary-text w-full h-14 p-2 focus:outline-none focus:ring-2 focus:ring-drcuotasPrimary-bg transition-all duration-300"
                          />
                          <ErrorMessage
                            name="identification_document"
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
                      {/* Genero  */}
                      <>
                        <div className="flex flex-col  w-full h-full">
                          <span className="text-base font-semibold text-drcuotasTertiary-text leading-tight tracking-tight">
                            {t('form:genderField')}
                          </span>
                          <span className="text-sm font-light text-drcuotasTertiary-text leading-tight tracking-tight mb-4">
                            {t('form:genderFieldDescription')}
                          </span>
                          <Field
                            as="select"
                            name="gender"
                            className="bg-white border border-drcuotasPrimary-bg rounded-xl text-drcuotasTertiary-text w-full h-14 p-2 focus:outline-none focus:ring-2 focus:ring-drcuotasPrimary-bg transition-all duration-300"
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
                                <div className="text-sm lg:text-base">
                                  {msg}
                                </div>
                              </div>
                            )}
                          />
                        </div>
                      </>
                      {/* Redes Sociales  */}
                      <>
                        <div className="flex flex-col justify-center w-full h-auto">
                          <span className="text-base font-semibold text-drcuotasTertiary-text leading-tight tracking-tight">
                            {t('form:socialMediaField')}
                          </span>
                          <span className="text-sm font-light text-drcuotasTertiary-text leading-tight tracking-tight mb-4">
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
                                    formik.values.socialMedia.map(
                                      (social, index) => {
                                        const Icon =
                                          socialMediaIcons[
                                            social.type as SocialMedia
                                          ];

                                        return (
                                          <div
                                            className="w-full h-full flex flex-col justify-center items-center gap-4 p-10 mb-4"
                                            key={index}
                                          >
                                            <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
                                              {Icon && (
                                                <Icon className="hidden text-3xl text-drcuotasPrimary-text" />
                                              )}{' '}
                                              {/* Muestra el icono */}
                                              <Field
                                                as="select"
                                                name={`socialMedia.${index}.type`}
                                                className="bg-white border border-drcuotasPrimary-bg rounded-xl text-drcuotasPrimary-text leading-tight tracking-tight w-full h-8 xl:h-[40px] p-2 focus:outline-none focus:ring-2 focus:ring-drcuotasPrimary-bg transition-all duration-300"
                                              >
                                                {Object.values(SocialMedia).map(
                                                  (media) =>
                                                    !selectedSocialMedia.includes(
                                                      media,
                                                    ) ||
                                                    media === social.type ? (
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
                                                className="bg-white border border-drcuotasPrimary-bg rounded-xl text-drcuotasPrimary-text w-full h-8 xl:h-[40px] p-2 focus:outline-none focus:ring-2 focus:ring-drcuotasPrimary-bg transition-all duration-300"
                                              />
                                              <Button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="w-full rounded-xl h-8 xl:h-[40px] bg-drcuotasTertiary"
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
                                      },
                                    )}
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
                                      className="w-full h-14 bg-white border border-drcuotasPrimary-bg text-drcuotasPrimary-text rounded-xl flex justify-center items-center"
                                    >
                                      <LucideUserRoundPlus />
                                      <span className="text-base font-light text-drcuotasPrimary-text leading-tight tracking-tight">
                                        Agregar
                                      </span>
                                    </Button>
                                  </div>
                                </>
                              );
                            }}
                          </FieldArray>
                        </div>
                      </>
                    </div>
                  </>
                </div>
              </>
              <>
                <div className="w-full h-auto flex flex-row justify-start">
                  <Button
                    type="submit"
                    className="w-full h-14 bg-drcuotasPrimary-bg text-base text-white  rounded-xl justify-center items-center    uppercase leading-tight tracking-tight"
                  >
                    {formik.isSubmitting ? (
                      <ImSpinner9 className="animate-spin h-6 text-white w-full" />
                    ) : (
                      t('form:saveChanges')
                    )}
                  </Button>
                </div>
              </>
            </Form>
          </FormikProvider>
        </>
      </div>
    </>
  );
}
