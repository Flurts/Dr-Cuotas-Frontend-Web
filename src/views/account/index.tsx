import { useFormik } from 'formik';
import {
  LucideCalendar,
  LucideMap,
  LucideMapPinned,
  LucideMessagesSquare,
  LucidePartyPopper,
  LucideShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { IoSettings } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import CardCirugia from '@/components/common/Cards/CardCirugia';
import CustomImageUploader from '@/components/common/Editable/UserImage';
import CustomEditorImage from '@/components/common/Editable/UserImageEditor';
import EvidenceCard from '@/components/common/ViewElements/cardEvidence';
import OurServices from '@/components/common/ViewElements/OurServices';
import { toast } from '@/components/ui/use-toast';
import settings from '@/settings';
import { getCurrentUser, updateProfileImage } from '@/store';
import {
  Gender,
  SocialMedia,
  Status,
  useGeneratePresignedUrlUserImageMutation,
  useGetMyAdjudicatedQuery,
  useSaveImageUserS3Mutation,
} from '@/types';
import { createS3Url, refFileImage } from '@/utils/refFileImage';

export default function AccountView() {
  const { t } = useTranslation('common');
  const user = useSelector(getCurrentUser);
  const [userData, setUserData] = useState<{
    first_name: string;
    last_name: string;
  } | null>(null);

  // -----> Ajusta la obtención de datos según tu estructura de usuario/doctores
  const doctorName = user?.first_name ?? 'Desconocido';
  const specialty = user?.doctor?.specialty ?? 'Especialidad no especificada';
  const router = useRouter();
  const defaultImage = '/images/elements/doctor.svg';
  const [profilePicture, setProfilePicture] = useState(
    user?.profile_image && user.profile_image !== ''
      ? user.profile_image
      : defaultImage,
  );

  const [generatePresignedUrlUserImage] =
    useGeneratePresignedUrlUserImageMutation();

  const { data: adjudicatedData, loading: adjudicatedLoading } =
    useGetMyAdjudicatedQuery();
  const [saveImageUserS3] = useSaveImageUserS3Mutation();
  const [toggleModal, setToggleModal] = useState(false);
  const dispatch = useDispatch();

  const modalHandler = () => {
    setToggleModal(!toggleModal);
  };

  const [file, setFile] = useState<File | null>(null);

  const handleChange = (fileUpload: File) => {
    modalHandler();
    setFile(fileUpload);
  };

  const EditImageAndUpload = async (editorRef: any) => {
    if (!editorRef) return;

    // Obtener el canvas de la imagen editada
    const selectedFile = await refFileImage(editorRef);

    try {
      const presignedUrlUserImage = await generatePresignedUrlUserImage({
        variables: {
          fileType: selectedFile.type,
        },
      });

      if (!presignedUrlUserImage.data?.generatePresignedUrlUserImage.status) {
        toast({
          variant: 'destructive',
          title: 'No se pudo cambiar la imagen de perfil',
          description: '¡Algo salió mal! Por favor, inténtalo de nuevo.',
        });
        return;
      }

      const fetchResponse = await fetch(
        presignedUrlUserImage.data.generatePresignedUrlUserImage.url,
        {
          method: 'PUT',
          body: selectedFile,
        },
      );

      if (!fetchResponse.ok) {
        toast({
          variant: 'destructive',
          title: 'No se pudo cambiar la imagen de perfil',
          description: '¡Algo salió mal! Por favor, inténtalo de nuevo.',
        });
        return;
      }

      // Actualizar en Redux la nueva imagen de perfil
      dispatch(
        updateProfileImage({
          profileImage: createS3Url(
            presignedUrlUserImage.data.generatePresignedUrlUserImage.key,
          ),
        }),
      );

      // Guardar en backend (S3)
      await saveImageUserS3({
        variables: {
          profileImageKey:
            presignedUrlUserImage.data.generatePresignedUrlUserImage.key,
          profileImageLocation: createS3Url(
            presignedUrlUserImage.data.generatePresignedUrlUserImage.key,
          ),
        },
      });

      // Actualizar la vista con la nueva imagen
      setProfilePicture(
        createS3Url(
          presignedUrlUserImage.data.generatePresignedUrlUserImage.key,
        ),
      );

      toast({
        variant: 'success',
        title: 'Imagen de perfil cambiada',
        description: '¡Tu imagen de perfil ha sido cambiada con éxito!',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'No se pudo cambiar la imagen de perfil',
        description: '¡Algo salió mal! Por favor, inténtalo de nuevo.',
      });
    }
  };

  // -------- FORMULARIO EJEMPLO (PUEDES AJUSTARLO O ELIMINARLO) -----------
  const initialValues = {
    email: '',
    phone_number: '',
    first_name: '',
    last_name: '',
    birth_date: null,
    identification_document: '',
    gender: Gender.PreferNotToSay,
    social_media: [] as Array<{
      type: SocialMedia;
      link: string;
      status: Status;
    }>,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').max(50).required('Requerido'),
    phone_number: Yup.string().max(15).required('Requerido'),
    first_name: Yup.string().max(30).required('Requerido'),
    last_name: Yup.string().max(30).required('Requerido'),
    birth_date: Yup.date().nullable(),
    identification_document: Yup.string().nullable(),
    gender: Yup.mixed().oneOf(Object.values(Gender)).required('Requerido'),
    social_media: Yup.array()
      .of(
        Yup.object().shape({
          type: Yup.mixed()
            .oneOf(Object.values(SocialMedia))
            .required('Requerido'),
          link: Yup.string().max(100).required('Requerido'),
          status: Yup.mixed()
            .oneOf(Object.values(Status))
            .required('Requerido'),
        }),
      )
      .nullable(),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    console.log(values);
    // Aquí iría la lógica para enviar el formulario
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  // -----------------------------------------------------------------------

  const getUserData = async () => {
    const query = `
      query GetUserData {
        getUserData {
          user {
            first_name
            last_name
          }
        }
      }
    `;

    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await fetch(`${settings.API_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      const data = await response.json();
      if (data.errors)
        throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);

      console.log('Datos del usuario:', data.data.getUserData.user);
      return data.data.getUserData.user;
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      router.push('/login');

      return null;
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      if (data) {
        setUserData(data);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div className="w-full h-full overflow-hidden">
        {/* Banner con degradado gris */}
        <div className="h-72  bg-gradient-to-b from-white to-drcuotasPrimary-bg" />

        {/* Contenedor Principal */}

        <div className="px-6 pb-6 flex flex-col  justify-center gap-4">
          {/* Profile header */}
          <>
            <div className="flex flex-col md:flex-row gap-4 -mt-16 items-center">
              {/* Imagen del Doctor */}
              <div className="h-32 w-32 border-4 border-white bg-gray-200 rounded-full overflow-hidden shadow-md">
                <CustomImageUploader
                  width={120}
                  height={120}
                  imageUrl={user.profile_picture ?? undefined}
                  onChange={handleChange}
                />
              </div>

              {/* Información del Doctor */}
              <div className="w-full flex-1 text-center md:text-left">
                <h1 className="text-2xl lg:text-4xl font-black uppercase leading-tight tracking-tight text-drcuotasPrimary-text sm:text-white lg:-mt-4  flex flex-row gap-2 items-center justify-center sm:justify-start">
                  {userData
                    ? `${userData.first_name} ${userData.last_name}`
                    : 'Cargando...'}
                  <LucideShieldCheck className="w-4 lg:w-6 h-4 lg:h-6" />
                </h1>
                <p className="text-base uppercase font-bold leading-tight tracking-tight text-drcuotasPrimary-text">
                  {/* {specialty} */}
                  Usuario Registrado
                </p>
              </div>

              {/* Botones */}
              <div className="flex gap-2">
                <Link
                  href="/account/settings"
                  className="w-40 h-14 flex flex-row justify-center items-center gap-2 bg-white border border-drcuotasPrimary-bg text-drcuotasPrimary-text rounded-xl"
                >
                  <IoSettings className="text-2xl" />
                  Perfil
                </Link>
                <button className="w-40 h-14 flex flex-row justify-center items-center gap-2 bg-drcuotasPrimary-bg border border-white text-white rounded-xl">
                  <LucideMessagesSquare className="text-2xl" />
                  Mensaje
                </button>
              </div>
            </div>
          </>
          <>
            <div className="w-full h-full flex flex-col lg:flex-row justify-center  gap-2 p-4">
              {/* Información extra (Opcional) */}
              <>
                <div className="w-full h-full flex flex-col justify-start gap-4 ">
                  {/* Sección de sobre mi */}
                  <>
                    <div className="w-full h-80 border rounded-xl p-10 border-drcuotasPrimary-bg text-center md:text-left hidden sm:flex flex-col justify-between items-start">
                      <>
                        <div>
                          <p className="text-base font-bold text-drcuotasPrimary-text uppercase leading-tight tracking-tight">
                            Bienvenido
                          </p>
                          {/* etiquetas de tipos de cirugias  */}
                          <>
                            <span className="text-sm leading-tight tracking-tight text-drcuotasTertiary-text">
                              ¡Bienvenido,{' '}
                              {userData
                                ? `${userData.first_name} ${userData.last_name}`
                                : 'Cargando...'}
                              , a Dr. Cuotas! 🎉 Aquí encontrarás los mejores
                              tratamientos y cirugías estéticas a precios
                              accesibles. Transforma tu imagen con opciones
                              flexibles y la mejor calidad. ¡Tu bienestar y
                              belleza están en las mejores manos! ✨
                            </span>
                          </>
                        </div>
                      </>
                      <>
                        <div>
                          <div className="w-full flex flex-row items-center gap-8 p-4">
                            <>
                              <button className="w-auto h-auto flex flex-row justify-center items-center gap-2">
                                <LucideMap className="w-4 h-4 text-drcuotasTertiary-text" />
                                <span className="text-sm leading-tight tracking-tight text-drcuotasTertiary-text">
                                  Argentina
                                </span>
                              </button>
                            </>
                            <>
                              <button className="w-auto h-auto flex flex-row justify-center items-center gap-2">
                                <LucideMapPinned className="w-4 h-4 text-drcuotasTertiary-text" />
                                <span className="text-sm leading-tight tracking-tight text-drcuotasTertiary-text">
                                  Corrientes - Goya
                                </span>
                              </button>
                            </>
                            <>
                              <button className="w-auto h-auto flex flex-row justify-center items-center gap-2">
                                <LucideCalendar className="w-4 h-4 text-drcuotasTertiary-text" />
                                <span className="text-sm leading-tight tracking-tight text-drcuotasTertiary-text">
                                  Se unió en Marzo 2022
                                </span>
                              </button>
                            </>
                          </div>

                          {/* etiquetas de tipos de cirugias  */}
                          <>
                            <div className="w-full h-8 flex flex-row  items-center gap-2">
                              <>
                                <button className="w-40 h-8 bg-drcuotasPrimary-bg border border-white text-white rounded-xl text-sm">
                                  Cirugía General
                                </button>
                              </>
                              <>
                                <button className="w-40 h-8 bg-drcuotasPrimary-bg border border-white text-white rounded-xl text-sm">
                                  Plastica / Estetica
                                </button>
                              </>
                              <>
                                <button className="w-40 h-8 bg-drcuotasPrimary-bg border border-white text-white rounded-xl text-sm">
                                  Ortopedica
                                </button>
                              </>
                            </div>
                          </>
                        </div>
                      </>
                    </div>
                  </>
                </div>
              </>

              {/* Información extra (Opcional) */}
              <>
                <div className="w-full lg:w-[40vw] h-full flex flex-col justify-start gap-2">
                  {/* Sección de conexiones */}
                  <>
                    <div className="w-full border rounded-xl p-10 border-drcuotasPrimary-bg text-center md:text-left">
                      <p className="text-base font-bold text-drcuotasPrimary-text uppercase leading-tight tracking-tight mb-2">
                        Conexiones
                      </p>
                      <p className="text-sm text-drcuotasTertiary-text leading-tight tracking-tight mb-2 flex flex-row items-center justify-center sm:justify-start gap-2">
                        <LucidePartyPopper className="w-4 h-4" /> 245 Cirugias
                        Compradas
                      </p>
                    </div>
                  </>

                  {/* Actividad reciente */}
                  <></>
                </div>
              </>
            </div>
          </>
        </div>
      </div>

      {/* <UserInfoImageEditable user={user} handleChange={handleChange} /> */}

      {/* Sección inferior (Ejemplo con UserInfoImageEditable y CardCirugia) */}
      <div className="flex-col w-full h-full items-center p-10 ">
        {adjudicatedLoading ? (
          <div>Loading...</div>
        ) : adjudicatedData?.getMyAdjudicated?.length > 0 ? (
          adjudicatedData.getMyAdjudicated.map((adjudicated, index) => (
            <React.Fragment key={index}>
              {/* Ajusta el tipo si tu componente CardCirugia lo requiere */}
              <CardCirugia adjudicated={adjudicated} />
            </React.Fragment>
          ))
        ) : (
          <div className="w-full h-full p-10 flex flex-col items-center justify-center gap-4">
            <OurServices />
          </div>
        )}
      </div>

      {/* Modal de edición de imagen */}
      {file && (
        <CustomEditorImage
          toggleModal={toggleModal}
          modalHandler={modalHandler}
          handleChange={EditImageAndUpload}
          file={file}
        />
      )}


    </>
  );
}
