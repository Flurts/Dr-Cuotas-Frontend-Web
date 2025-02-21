import { useFormik } from 'formik';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
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
      <div className="w-full h-96 lg:h-96  flex flex-col justify-center items-center p-20">
        <UserInfoImageEditable user={user} handleChange={handleChange} />
        <div className="flex flex-col w-full justify-center items-center gap-4 ">
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
            <div className="hidden flex-col gap-10 justify-center items-center w-full">
              <Link
                href="/store"
                className="w-80 lg:w-96 h-12 bg-drcuotasPrimary rounded-xl  hover:scale-105 transition-all duration-300 text-white text-xl font-bold flex justify-center items-center  hover:shadow-drcuotasPrimary hover:shadow-2xl hover:bg-white hover:border hover:text-drcuotasPrimary-text hover:border-drcuotasPrimary"
              >
                {t('startSurgery')}
              </Link>
            </div>
          )}
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
