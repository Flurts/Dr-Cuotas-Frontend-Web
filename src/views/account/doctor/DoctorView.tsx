'use client';
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { ImSpinner9 } from 'react-icons/im';
import { IoCloseCircleSharp, IoSettings, IoSettingsOutline } from 'react-icons/io5';
import { MdError } from 'react-icons/md';
import { RiUploadLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import DoctorInfo from '@/components/common/Account/Doctor/DoctorInfo';
import { SurgeryTable } from '@/components/common/Tables/SurgeryTable';
import { useToast } from '@/components/ui/use-toast';
import { chargeDoctor, getCurrentUser, getJwt } from '@/store';
import {
  Doctor,
  File_Type,
  Status,
  Surgery,
  SurgeryCategories,
  SurgeryTypes,
  useCreateNewSurgerieMutation,
  useGeneratePresignedUrlCurriculumDoctorMutation,
  useGeneratePresignedUrlSurgeryImageMutation,
  useGetCvFileMutation,
  useGetDoctorQuery,
  useGetSurgerieByIdQuery,
  useSaveCurriculumVitaeDataBaseMutation,
  useUpdateInfoDoctorMutation,
  useUpdateSurgerieMutation,
} from '@/types';
import { base64ToFile, createS3Url } from '@/utils/refFileImage';
import { LucideCalendar, LucideHardDriveDownload, LucideMap, LucideMapPinned, LucideMessagesSquare, LucideShare, LucideShieldCheck } from 'lucide-react';
import Link from 'next/link';
import CustomImageUploader from '@/components/common/Editable/UserImage';

export default function DoctorView() {
  const { t } = useTranslation(['common', 'surgeries']);
  const user = useSelector(getCurrentUser);
  const [toggleModal, setToggleModal] = useState(false);
  const [cvUpload, setCvUpload] = useState(false);
  const [imagesUpload, setImagesUpload] = useState(false);
  const [surgeryImageUpload, setSurgeryImageUpload] = useState(false);
  const [editInfo, setEditInfo] = useState(false);
  const [editUpdateSurgery, setEditUpdateSurgery] = useState(false);
  const [surgerieData, setSurgerieData] = useState<Surgery | null>(null);
  const [getSurgerie, setGetSurgerie] = useState(false);
  const [surgerieImage, setSurgerieImage] = useState<string>('' as string);
  const [updateInfoDoctor] = useUpdateInfoDoctorMutation();
  const [generatePresignedUrlImageSurgery] =
    useGeneratePresignedUrlSurgeryImageMutation();
  const [generatePresignedUrlCurriculum] =
    useGeneratePresignedUrlCurriculumDoctorMutation();

  const [saveCurriculumVitaeDataBase] =
    useSaveCurriculumVitaeDataBaseMutation();
  const [createSurgery] = useCreateNewSurgerieMutation();
  const [updateSurgery] = useUpdateSurgerieMutation();
  const [GetCvFile] = useGetCvFileMutation();
  const [isLoading, setIsLoading] = useState(false);
  const jwt = useSelector(getJwt);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const router = useRouter();
  const { slug } = router.query;
  const { data: doctorData, loading: doctorLoading } = useGetDoctorQuery({
    variables: { doctorId: slug as string },
  });

  const [doctor, setDoctor] = useState<Doctor | null>(null);

  const editInfoHandler = () => {
    if (doctorData?.getDoctor) {
      // @ts-expect-error - Type error
      setDoctor(doctorData?.getDoctor);
    }

    setEditInfo(!editInfo);
    modalHandler();
  };

  const {
    data: getSurgerieData,
    error: errorGetSurgerie,
    refetch,
  } = useGetSurgerieByIdQuery({
    variables: { getSurgerieByIdId: surgerieData?.id ?? '' },
    context: {
      headers: {
        Authorization: jwt,
      },
    },
    skip: !getSurgerie,
  });

  useEffect(() => {
    if (getSurgerie) {
      const fetchData = async () => {
        try {
          await refetch();

          if (errorGetSurgerie ?? !getSurgerieData?.getSurgerieById) {
            toast({
              variant: 'destructive',
              title: 'Error al obtener la cirugía',
              description: 'Error al obtener la cirugía',
            });
            modalHandler();
            return;
          }

          // @ts-expect-error - Type error
          setSurgerieData(getSurgerieData.getSurgerieById);
        } catch (error) {
          toast({
            variant: 'destructive',
            title: 'Error al obtener la cirugía',
            description: 'Error al obtener la cirugía',
          });
          modalHandler();
        } finally {
          setGetSurgerie(false); // Reset getSurgerie to avoid infinite loop
        }
      };

      void fetchData();
    }
  }, [getSurgerie, getSurgerieData, errorGetSurgerie, refetch, toast]);

  const editUpdateSurgeryHandler = (surgery?: Surgery, newSurgerie = false) => {
    setEditUpdateSurgery(!editUpdateSurgery);
    setSurgerieData(null);
    setSurgerieImage('');
    formikSurgery.resetForm();

    if (surgery && !newSurgerie) {
      setSurgerieData(surgery);
      setGetSurgerie(true); // Trigger useEffect to fetch surgery data
    }

    modalHandler();
  };

  const handleSubmitEditInfo = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await updateInfoDoctor({
        variables: {
          description: values.description,
          profession: values.profession,
          status: values.status,
        },
        context: {
          headers: {
            Authorization: jwt,
          },
        },
      });

      if (response.errors ?? !response.data?.updateInfoDoctor.status) {
        setIsLoading(false);
        toast({
          variant: 'destructive',
          title: 'Error al actualizar la información',
          description: 'Error al actualizar la información',
        });
        modalHandler();
        return;
      }

      dispatch(
        chargeDoctor({
          // @ts-expect-error - Type error
          doctor: response.data.updateInfoDoctor,
        }),
      );

      toast({
        variant: 'success',
        title: 'Información actualizada',
        description: 'Información actualizada correctamente',
      });

      formikDoctorProfile.resetForm();
      setIsLoading(false);
      modalHandler();
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: 'destructive',
        title: 'Error al actualizar la información',
        description: 'Error al actualizar la información',
      });
      modalHandler();
    }
  };

  const initialValuesDoctorProfile = {
    profession: doctor?.profession ?? '',
    description: doctor?.description ?? '',
    status: doctor?.status ?? Status.Inactive,
    created_at: doctor?.created_at
      ? new Date(doctor?.created_at).toLocaleDateString()
      : '',
    updated_at: doctor?.updated_at
      ? new Date(doctor?.updated_at).toLocaleDateString()
      : '',
  };

  const validationSchemaDoctorProfile = Yup.object().shape({
    profession: Yup.string().required('Profesión es requerida'),
    status: Yup.string().required('Estado es requerido'),
  });

  const formikDoctorProfile = useFormik({
    initialValues: initialValuesDoctorProfile,
    validationSchema: validationSchemaDoctorProfile,
    onSubmit: handleSubmitEditInfo,
    enableReinitialize: true,
  });

  const handleSubmitCreateOrUpdateSurgery = async (values: any) => {
    try {
      setIsLoading(true);

      let presignedUrlImage: any;

      if (surgeryImageUpload) {
        const selectedFile = await base64ToFile(
          values.surgeryImage,
          'surgery.png',
          'image/png',
        );

        presignedUrlImage = await generatePresignedUrlImageSurgery({
          variables: {
            fileType: selectedFile.type,
          },
        });

        if (!presignedUrlImage.data?.generatePresignedUrlSurgeryImage.status) {
          toast({
            variant: 'destructive',
            title: 'Error al subir la imagen',
            description: 'Error al subir la imagen',
          });
          return;
        }

        const fetchResponse = await fetch(
          presignedUrlImage.data.generatePresignedUrlSurgeryImage.url,
          {
            method: 'PUT',
            body: selectedFile,
          },
        );

        if (!fetchResponse.ok) {
          toast({
            variant: 'destructive',
            title: 'Error al subir la imagen',
            description: 'Error al subir la imagen',
          });
          return;
        }
      }

      if (values.id) {
        const surgeryImageKey =
          presignedUrlImage?.data?.generatePresignedUrlSurgeryImage.key ??
          undefined;
        const surgeryImageLocation = surgeryImageKey
          ? createS3Url(surgeryImageKey)
          : undefined;

        console.log(surgeryImageKey);
        console.log(surgeryImageLocation);

        const response = await updateSurgery({
          variables: {
            surgery: {
              id: values.id,
              name: values.name,
              description: values.description,
              amount: values.amount,
              status: values.status,
              type: values.surgeryType,
              category: values.surgeryCategory,
              surgeryImageKey,
              surgeryImageLocation,
            },
          },
        });

        if (!response.data?.updateSurgerie) {
          setIsLoading(false);
          toast({
            variant: 'destructive',
            title: 'Error al actualizar la cirugía',
            description: 'Error al actualizar la cirugía',
          });
          modalHandler();
          return;
        }

        toast({
          variant: 'success',
          title: 'Cirugía actualizada',
          description: 'Cirugía actualizada correctamente',
        });
      } else {
        const response = await createSurgery({
          variables: {
            surgery: {
              name: values.name,
              description: values.description,
              amount: values.amount,
              status: values.status,
              type: values.surgeryType,
              category: values.surgeryCategory,
              surgeryImageKey:
                presignedUrlImage.data.generatePresignedUrlSurgeryImage.key,
              surgeryImageLocation: createS3Url(
                presignedUrlImage.data.generatePresignedUrlSurgeryImage.key,
              ),
            },
          },
        });

        if (response.errors ?? !response.data?.createNewSurgerie) {
          setIsLoading(false);
          toast({
            variant: 'destructive',
            title: 'Error al crear la cirugía',
            description: 'Error al crear la cirugía',
          });
          modalHandler();
          return;
        }

        toast({
          variant: 'success',
          title: 'Cirugía creada',
          description: 'Cirugía creada correctamente',
        });
      }

      formikSurgery.resetForm();
      setIsLoading(false);
      modalHandler();
      onSurgeryCreated();
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: 'destructive',
        title: 'Error al crear la cirugía',
        description: 'Error al crear la cirugía',
      });
      modalHandler();
    }
  };

  const onSurgeryCreated = () => {
    // Función vacía que será sobrescrita en SurgeryTable
  };

  const initialValuesSurgery = {
    id: surgerieData?.id ?? null,
    name: surgerieData?.name ?? '',
    description: surgerieData?.description ?? '',
    amount: surgerieData?.amount ?? 0,
    status: surgerieData?.status ?? Status.Inactive,
    surgeryType: surgerieData?.type ?? SurgeryTypes.Rhinoplasty,
    surgeryCategory:
      surgerieData?.category ?? SurgeryCategories.GeneralSurgeries,
    surgeryImage: surgerieData?.file_banner?.file_link ?? '',
  };

  const validationSchemaSurgery = Yup.object().shape({
    name: Yup.string().required('Nombre es requerido'),
    amount: Yup.number().required('Monto es requerido'),
    status: Yup.string().required('Estado es requerido'),
    surgeryType: Yup.string().required('Tipo de cirugía es requerido'),
    surgeryCategory: Yup.string().required('Categoria de cirugía es requerida'),
    surgeryImage: Yup.string().required('Imagen de cirugía es requerida'),
  });

  const formikSurgery = useFormik({
    initialValues: initialValuesSurgery,
    validationSchema: validationSchemaSurgery,
    onSubmit: handleSubmitCreateOrUpdateSurgery,
    enableReinitialize: true,
  });

  const imagesHandler = () => {
    setImagesUpload(!imagesUpload);
    modalHandler();
  };

  const cvHandler = () => {
    setCvUpload(!cvUpload);
    modalHandler();
  };

  const cvUploadHandler = async (file: File) => {
    setIsLoading(true);

    try {
      const presignedUrlPdf = await generatePresignedUrlCurriculum({
        variables: {
          fileType: file.type,
        },
      });

      if (!presignedUrlPdf.data?.generatePresignedUrlCurriculumDoctor.status) {
        toast({
          variant: 'destructive',
          title: 'Error al subir el archivo',
          description: 'Error al subir el archivo',
        });
        return;
      }

      const fetchResponse = await fetch(
        presignedUrlPdf.data.generatePresignedUrlCurriculumDoctor.url,
        {
          method: 'PUT',
          body: file,
        },
      );

      if (!fetchResponse.ok) {
        toast({
          variant: 'destructive',
          title: 'Error al subir el archivo',
          description: 'Error al subir el archivo',
        });
        return;
      }

      const response = await saveCurriculumVitaeDataBase({
        variables: {
          curriculumKey:
            presignedUrlPdf.data.generatePresignedUrlCurriculumDoctor.key,
          curriculumLocation: createS3Url(
            presignedUrlPdf.data.generatePresignedUrlCurriculumDoctor.key,
          ),
          fileType: File_Type.CurriculumVitae,
        },
      });

      if (!response.data?.saveCurriculumVitaeDataBase) {
        toast({
          variant: 'destructive',
          title: 'Error al subir el archivo',
          description: 'Error al subir el archivo',
        });
      }

      toast({
        variant: 'success',
        title: 'Archivo subido',
        description: 'Archivo subido correctamente',
      });

      setIsLoading(false);
      modalHandler();
    } catch (error) {
      setIsLoading(false);
      modalHandler();
      toast({
        variant: 'destructive',
        title: 'Error al subir el archivo',
        description: 'Error al subir el archivo',
      });
    }
  };

  const cvGetterHandler = async () => {
    try {
      setIsLoading(true);
      const response = await GetCvFile({
        variables: {
          userId: user.id,
        },
      });

      setIsLoading(false);
      modalHandler();
      if (!response.data?.getCvFile.status) {
        console.log(response.errors);
        toast({
          variant: 'destructive',
          title: 'Error al descargar el archivo',
          description: 'Archivo no encontrado o error al descargarlo',
        });
        return;
      }

      const link = document.createElement('a');
      link.href = response.data.getCvFile.cv!;
      link.target = '_blank';
      link.click();
    } catch (error) {
      setIsLoading(false);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Error al descargar el archivo',
      });
    }
  };

  const modalHandler = () => {
    if (toggleModal) {
      setImagesUpload(false);
      setCvUpload(false);
      setEditInfo(false);
      setEditUpdateSurgery(false);
    }
    setToggleModal(!toggleModal);
  };

  return (
    <>
      <div className="w-full min-h-screen">
        {/* Banner con degradado */}
        <div className="h-72 bg-gradient-to-b from-white to-drcuotasPrimary-bg" />

        {/* Contenedor Principal */}
        <div className="px-6 pb-6 flex flex-col justify-center gap-4">
          {/* Profile header */}
          <div className="flex flex-col md:flex-row gap-4 -mt-16 items-center">
            {/* Imagen del Doctor */}
            <div className="h-32 w-32 border-4 border-white bg-gray-200 rounded-full overflow-hidden shadow-md">
              {/* <Image
                src={profilePicture}
                alt={`Foto de ${doctorName}`}
                width={128}
                height={128}
                className="object-cover w-full h-full"
                onError={() => {
                  setProfilePicture(defaultImage);
                }}
              /> */}
                <CustomImageUploader
            width={120}
            height={120}
            imageUrl={user.profile_picture ?? undefined}
            // onChange={handleChange}
          />
            </div>

            {/* Información del Doctor */}
            <div className="w-full flex-1 text-center md:text-left">
            <h1 className="text-4xl font-black uppercase leading-tight tracking-tight text-white -mt-4 flex flex-row gap-2 items-center">  
              {user.first_name + ' ' + user.last_name} <LucideShieldCheck className='w-6 h-6'/>
              </h1>
              <p className="text-base uppercase font-bold leading-tight tracking-tight text-drcuotasPrimary-text">
              Doctor Registrado 
              </p>
            </div>

            {/* Botones */}
            <div className="flex gap-2">
              <Link href='/account/settings' className="w-40 h-14 flex flex-row justify-center items-center gap-2 bg-white border border-drcuotasPrimary-bg text-drcuotasPrimary-text rounded-xl">
                <IoSettings className="text-2xl" />
                Perfil
              </Link>
              <button className="w-40 h-14 flex flex-row justify-center items-center gap-2 bg-drcuotasPrimary-bg border border-white text-white rounded-xl">
              <IoSettingsOutline className="text-2xl" />
                Doctor
              </button>
              <button className="w-40 h-14 flex flex-row justify-center items-center gap-2 bg-drcuotasPrimary-bg border border-white text-white rounded-xl">
              <LucideShare  className="text-2xl" />
                
                CV
              </button>
             
            </div>
          </div>
          <>
          <div className='w-full h-full p-4'>
            <SurgeryTable
              editUpdateSurgeryHandler={editUpdateSurgeryHandler}
              onSurgeryCreated={onSurgeryCreated}
            />
          </div>

          </>
        
        </div>
      </div>

      <div className="w-full h-full  flex-col gap-4 justify-center items-center p-10  bg-white">
     
        {/* <>
          <DoctorInfo
            user={user}
            editInfoHandler={editInfoHandler}
            cvHandler={cvHandler}
            imagesHandler={imagesHandler}
          />
        </> */}
      </div>

      {/* Modal */}
      <div
        onClick={modalHandler}
        className={`z-50 fixed flex inset-0 backdrop-blur-sm bg-drcuotasSecondary-bg bg-opacity-60 justify-center  items-center transition-opacity duration-100 ${
          toggleModal ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ visibility: toggleModal ? 'visible' : 'hidden' }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`relative bg-white ${cvUpload ? 'w-[300px] h-80' : ''} rounded-lg flex flex-col gap-5  transition-all duration-100 shadow-2xl shadow-drcuotasPrimary-bg justify-center items-center ${
            toggleModal ? 'scale-100' : 'scale-0'
          }`}
        >
          <button className="absolute right-1 top-1">
            <IoCloseCircleSharp
              onClick={modalHandler}
              className="text-2xl m-3 text-gray-500"
            />
          </button>

          {/** Edit Info */}
          {editInfo && (
            <div className="relative flex flex-col gap-4 items-center w-full h-full mt-8">
              <span className="text-xl text-[#7863f7] font-semibold">
                Editar Información Personal
              </span>

              {doctorLoading ? (
                <ImSpinner9 className="animate-spin h-6 text-[#7863f7]" />
              ) : (
                <FormikProvider value={formikDoctorProfile}>
                  <Form className="w-full flex flex-col items-center gap-3">
                    <div className="flex flex-row gap-3 w-full">
                      <div className="w-full">
                        <span className="text-[#7863f7] font-semibold">
                          Profesión
                        </span>
                        <Field
                          name="profession"
                          type="text"
                          placeholder="Profesión"
                          className="p-2 focus:outline-none focus:ring-2 w-full focus:ring-[#6636E2] transition-all duration-300 rounded-md border text-slate-800"
                        />
                        <ErrorMessage
                          name="profession"
                          component="div"
                          render={(msg) => (
                            <div className="flex items-center text-red-500">
                              <MdError className="mr-1" />
                              <div className="text-sm lg:text-base">{msg}</div>
                            </div>
                          )}
                        />
                      </div>
                      <div className="">
                        <span className="text-[#7863f7] font-semibold">
                          Estado
                        </span>
                        <Field
                          name="status"
                          as="select"
                          placeholder="Estado"
                          className="p-2 focus:outline-none w-full focus:ring-2 focus:ring-[#6636E2] transition-all duration-300 rounded-md border text-slate-800"
                        >
                          {Object.values(Status).map((status) => (
                            <option key={status} value={status}>
                              {t(`common:${status}`)}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="status"
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
                    <div className="relative w-full flex-col">
                      <span className="text-[#7863f7] font-semibold">
                        Resumen Profesional
                      </span>
                      <Field
                        name="description"
                        type="text"
                        placeholder="Descripción"
                        as="textarea"
                        className="w-full h-[100px] min-h-[100px] max-h-[500px] p-2 rounded-md border  focus:outline-none focus:ring-2 focus:ring-[#6636E2] transition-all duration-300"
                      />
                    </div>
                    <div className="relative flex flex-row gap-3">
                      <div className="flex flex-col gap-2">
                        <span className="text-[#7863f7] font-semibold">
                          Fecha de Registro
                        </span>
                        <Field
                          name="created_at"
                          type="text"
                          placeholder="Fecha de Creación"
                          className="text-center p-2 focus:outline-none focus:ring-2 focus:ring-[#6636E2] transition-all duration-300 rounded-md border text-slate-800"
                          readOnly
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[#7863f7] font-semibold">
                          Ultimo Cambio
                        </span>
                        <Field
                          name="updated_at"
                          type="text"
                          placeholder="Fecha de Actualización"
                          className="text-center p-2 focus:outline-none focus:ring-2 focus:ring-[#6636E2] transition-all duration-300 rounded-md border text-slate-800"
                          readOnly
                        />
                      </div>
                    </div>
                  </Form>
                </FormikProvider>
              )}

              <div className="flex flex-row gap-3">
                <div className="flex flex-col gap-2 justify-center items-center">
                  <span className="text-[#7863f7] font-semibold">
                    Curriculum Profesional
                  </span>
                  <button
                    className="rounded-full bg-[#7863f7] text-white p-2 px-5 w-auto"
                    onClick={cvGetterHandler}
                  >
                    {isLoading ? (
                      <ImSpinner9 className="animate-spin h-6 text-white w-full" />
                    ) : (
                      'Descargar Existente'
                    )}
                  </button>
                </div>
                <div className="flex flex-col gap-2 justify-center items-center">
                  <span className="text-[#7863f7] font-semibold">Guardar</span>
                  <button
                    className="rounded-full bg-[#7863f7] text-white p-2 px-5 w-auto"
                    onClick={formikDoctorProfile.submitForm}
                  >
                    {isLoading ? (
                      <ImSpinner9 className="animate-spin h-6 text-white w-full" />
                    ) : (
                      'Guardar cambios'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {editUpdateSurgery && (
            <div className="w-full flex flex-col gap-4 items-center p-10">
              <h2 className="text-2xl font-black uppercase tracking-tight text-drcuotasPrimary-text">
                Crear Nueva Cirugía
              </h2>

              {doctorLoading ? (
                <ImSpinner9 className="animate-spin h-6 text-[#7863f7]" />
              ) : (
                <FormikProvider value={formikSurgery}>
                  <Form className="w-full flex flex-col lg:flex-row gap-8">
                    {/* Sección de imagen */}
                    <div className="flex flex-col items-center gap-4">
                      <FileUploader
                        handleChange={async (file: File) => {
                          const reader = new FileReader();
                          reader.onload = () => {
                            setSurgerieImage(reader.result as string);
                            void formikSurgery.setFieldValue(
                              'surgeryImage',
                              reader.result as string,
                            );
                          };
                          reader.readAsDataURL(file);
                          setSurgeryImageUpload(true);
                          await Promise.resolve();
                        }}
                        name="file"
                        types={['JPG', 'PNG', 'GIF']}
                      >
                        <div className="flex justify-center items-center w-[250px] h-[400px] border border-gray-300 rounded-md cursor-pointer hover:shadow-lg transition-shadow">
                          {!formikSurgery.values.surgeryImage ? (
                            <RiUploadLine className="h-14 w-14 text-gray-500" />
                          ) : (
                            <Image
                              src={formikSurgery.values.surgeryImage ?? surgerieImage}
                              alt="surgery"
                              className="w-full h-full object-cover rounded-md"
                              width={250}
                              height={400}
                            />
                          )}
                        </div>
                      </FileUploader>
                    </div>
                    {/* Sección de campos */}
                    <div className="flex flex-col gap-6 flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="block text-sm font-semibold text-drcuotasPrimary-text  uppercase leading-tight tracking-tight">
                            Nombre
                          </span>
                          <Field
                            name="name"
                            type="text"
                            placeholder="Nombre de la Cirugía"
                            className="w-full p-2 border rounded-md text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#6636E2] transition"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            render={(msg) => (
                              <div className="flex items-center text-red-500 text-sm mt-1">
                                <MdError className="mr-1" />
                                {msg}
                              </div>
                            )}
                          />
                        </div>
                        <div>
                          <span className="block text-sm font-semibold text-drcuotasPrimary-text uppercase leading-tight tracking-tight">
                            Estado
                          </span>
                          <Field
                            name="status"
                            as="select"
                            className="w-full p-2 border rounded-md text-drcuotasTertiary-text focus:outline-none focus:ring-2 focus:ring-[#6636E2] leading-tight tracking-tight"
                          >
                            {Object.values(Status).map((status) => (
                              <option key={status} value={status}>
                                {t(`common:${status}`)}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="status"
                            component="div"
                            render={(msg) => (
                              <div className="flex items-center text-red-500 text-sm mt-1">
                                <MdError className="mr-1" />
                                {msg}
                              </div>
                            )}
                          />
                        </div>
                      </div>
                      <div>
                        <span className="block text-sm font-semibold text-drcuotasPrimary-text uppercase leading-tight tracking-tight">
                          Monto
                        </span>
                        <Field
                          name="amount"
                          type="number"
                          placeholder="Monto"
                          className="w-full p-2 border rounded-md text-drcuotasTertiary-text focus:outline-none focus:ring-2 focus:ring-[#6636E2] leading-tight tracking-tight"
                        />
                        <ErrorMessage
                          name="amount"
                          component="div"
                          render={(msg) => (
                            <div className="flex items-center text-red-500 text-sm mt-1">
                              <MdError className="mr-1" />
                              {msg}
                            </div>
                          )}
                        />
                      </div>
                      <div>
                        <span className="block text-sm font-semibold text-drcuotasPrimary-text uppercase leading-tight tracking-tight">
                          Descripción
                        </span>
                        <Field
                          name="description"
                          as="textarea"
                          placeholder="Descripción"
                          className="w-full h-[100px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6636E2] leading-tight tracking-tight"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="block text-sm font-semibold text-drcuotasPrimary-text uppercase leading-tight tracking-tight">
                            Tipo de Cirugía
                          </span>
                          <Field
                            name="surgeryType"
                            as="select"
                            className="w-full p-2 border rounded-md text-drcuotasTertiary-text focus:outline-none focus:ring-2 focus:ring-[#6636E2] leading-tight tracking-tight"
                          >
                            {Object.values(SurgeryTypes).map((status) => (
                              <option key={status} value={status}>
                                {t(`surgeries:${status}`)}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="surgeryType"
                            component="div"
                            render={(msg) => (
                              <div className="flex items-center text-red-500 text-sm mt-1">
                                <MdError className="mr-1" />
                                {msg}
                              </div>
                            )}
                          />
                        </div>
                        <div>
                          <span className="block text-sm font-semibold text-drcuotasPrimary-text uppercase leading-tight tracking-tight">
                            Categoría de la Cirugía
                          </span>
                          <Field
                            name="surgeryCategory"
                            as="select"
                            className="w-full p-2 border rounded-md text-drcuotasTertiary-text focus:outline-none focus:ring-2 focus:ring-[#6636E2]  leading-tight tracking-tight"
                          >
                            {Object.values(SurgeryCategories).map((status) => (
                              <option key={status} value={status}>
                                {t(`surgeries:${status}`)}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="surgeryCategory"
                            component="div"
                            render={(msg) => (
                              <div className="flex items-center text-red-500 text-sm mt-1">
                                <MdError className="mr-1" />
                                {msg}
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </Form>
                </FormikProvider>
              )}

              <div className="w-full h-auto flex flex-row justify-center gap-4">
                <button
                  className="rounded-xl bg-[#7863f7] w-full h-16 text-white font-bold  uppercase leading-tight tracking-tight text-xl"
                  onClick={formikSurgery.submitForm}
                >
                  {isLoading ? (
                    <ImSpinner9 className="animate-spin h-6 w-full text-white" />
                  ) : (
                    'Crear Cirugia'
                  )}
                </button>
              </div>
            </div>
          )}

          {/** Cv file Upload */}
          {cvUpload && (
            <div className="flex flex-col gap-2 items-center w-full h-full mt-8 ">
              <span className="text-xl text-[#7863f7] font-semibold">
                Curriculum Profesional
              </span>

              <button
                className="rounded-full bg-[#7863f7] text-white p-2 px-5 w-60"
                onClick={cvGetterHandler}
              >
                {isLoading ? (
                  <ImSpinner9 className="animate-spin h-6 text-white w-full" />
                ) : (
                  ' Descargar Existente'
                )}
              </button>
              <FileUploader
                handleChange={cvUploadHandler}
                name="file"
                types={['PDF']}
              >
                <button className="rounded-full bg-[#7863f7] text-white p-2 px-5 w-60 cursor-pointer justify-center items-center">
                  {isLoading ? (
                    <ImSpinner9 className="animate-spin h-6 text-white w-full" />
                  ) : (
                    'Guardar Curriculum'
                  )}
                </button>
              </FileUploader>
            </div>
          )}

          {/** Images Upload */}
          {imagesUpload && (
            <div className="flex flex-col gap-4 justify-center items-center w-full h-full mt-8">
              <span className="text-2xl text-[#7863f7] font-bold">Images</span>
              <input type="file" />
              <button className="border border-[#7863f7] text-[#7863f7] p-2 w-64">
                Subir
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
