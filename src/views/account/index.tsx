import { useFormik } from 'formik';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { LuCalendarClock } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import UserInfoImageEditable from '@/components/common/Account/UserInfoImageEditable';
import CardCirugia from '@/components/common/Cards/CardCirugia';
import CustomEditorImage from '@/components/common/Editable/UserImageEditor';
import { toast } from '@/components/ui/use-toast';
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

  const handleChange = (FileUpload: File) => {
    modalHandler();
    setFile(FileUpload);
  };

  const EditImageAndUpload = async (editorRef: any) => {
    if (editorRef) {
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

        dispatch(
          updateProfileImage({
            profileImage: createS3Url(
              presignedUrlUserImage.data.generatePresignedUrlUserImage.key,
            ),
          }),
        );

        await saveImageUserS3({
          variables: {
            profileImageKey:
              presignedUrlUserImage.data.generatePresignedUrlUserImage.key,
            profileImageLocation: createS3Url(
              presignedUrlUserImage.data.generatePresignedUrlUserImage.key,
            ),
          },
        });

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
    }
  };

  const initialValues = {
    email: '',
    phone_number: '',
    first_name: '',
    last_name: '',
    birth_date: null,
    identification_document: '',
    gender: Gender.PreferNotToSay,
    social_media: [],
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').max(50).required('Required'),
    phone_number: Yup.string().max(15).required('Required'),
    first_name: Yup.string().max(30).required('Required'),
    last_name: Yup.string().max(30).required('Required'),
    birth_date: Yup.date().nullable(),
    identification_document: Yup.string().nullable(),
    gender: Yup.mixed().oneOf(Object.values(Gender)).required('Required'),
    social_media: Yup.array()
      .of(
        Yup.object().shape({
          type: Yup.mixed()
            .oneOf(Object.values(SocialMedia))
            .required('Required'),
          link: Yup.string().max(100).required('Required'),
          status: Yup.mixed().oneOf(Object.values(Status)).required('Required'),
        }),
      )
      .nullable(),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    console.log(values);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="bg-[#f1f2f1] flex flex-col justify-center items-center w-full bg">
        <div className="flex flex-col justify-center w-full bg-drcuotasPrimary-bg relative py-2">
          <div className="absolute top-0 flex justify-center items-center text-center w-full h-full">
            <span className="md:text-7xl xl:text-8xl font-extrabold text-[#7863f7]">
              {t('bestLuck')}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center gap-1 p-3 h-auto z-10">
            <span className="text-white md:text-base xl:text-xl ml-5 md:ml-10">
              {t('nextDrawing')}
            </span>
            <div className="flex flex-row justify-center items-center gap-2">
              <LuCalendarClock className="text-3xl md:text-5xl xl:text-6xl text-white" />
              <span className="text-white font-bold text-xl md:text-3xl xl:text-4xl">
                10/12/2024
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-screen-2xl w-full flex flex-col items-center justify-center">
          <UserInfoImageEditable user={user} handleChange={handleChange} />
          <div className="flex flex-col w-full justify-center items-center gap-5 relative px-8 xl:px-20 mb-10">
            {adjudicatedLoading ? (
              <div>Loading...</div>
            ) : adjudicatedData &&
              adjudicatedData?.getMyAdjudicated?.length > 0 ? (
              adjudicatedData.getMyAdjudicated.map((adjudicated, index) => (
                <React.Fragment key={index}>
                  {/* @ts-expect-error Missing type definition for CardCirugia */}
                  <CardCirugia adjudicated={adjudicated} />
                </React.Fragment>
              ))
            ) : (
              <div className="p-20 flex flex-col gap-10 justify-center items-center w-full">
                <span className="text-[#7863f7] text-2xl font-bold text-center">
                  {t('noHaveSurgeries')}
                </span>
                <Link
                  href="/store"
                  className="w-96 h-12 bg-[#6636E2] rounded-full  hover:scale-105 transition-all duration-300 text-white text-xl font-bold flex justify-center items-center  hover:shadow-[#B398F5] hover:shadow-2xl hover:bg-white hover:border hover:text-[#6636E2] hover:border-[#6636E2]"
                >
                  {t('startSurgery')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {file ? (
        <CustomEditorImage
          toggleModal={toggleModal}
          modalHandler={modalHandler}
          handleChange={EditImageAndUpload}
          file={file}
        />
      ) : null}
    </>
  );
}
