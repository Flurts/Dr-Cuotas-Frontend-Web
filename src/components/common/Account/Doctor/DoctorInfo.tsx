/* eslint-disable @typescript-eslint/no-unused-vars */
import { LucideFile, LucideFilePen } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { BsUpload } from 'react-icons/bs';
import { IoSettings } from 'react-icons/io5';
import { useDispatch } from 'react-redux';

import CustomEditorImage from '@/components/common/Editable/UserImageEditor';
import { toast } from '@/components/ui/use-toast';
import { updateProfileImage } from '@/store';
import {
  useGeneratePresignedUrlUserImageMutation,
  User,
  useSaveImageUserS3Mutation,
} from '@/types';
import { createS3Url, refFileImage } from '@/utils/refFileImage';

export default function DoctorInfo({
  user,
  editInfoHandler,
  cvHandler,
  imagesHandler,
}: {
  user: User;
  editInfoHandler: () => void;
  cvHandler: () => void;
  imagesHandler: () => void;
}) {
  const [file] = useState<File | null>(null);
  const [toggleModal, setToggleModal] = useState(false);
  const dispatch = useDispatch();
  const [generatePresignedUrlUserImage] =
    useGeneratePresignedUrlUserImageMutation();

  const [saveImageUserS3] = useSaveImageUserS3Mutation();

  const modalHandler = () => {
    setToggleModal(!toggleModal);
  };

  const EditImageAndUpload = async (editorRef: any) => {
    if (editorRef) {
      // Obtener el canvas de la imagen editada
      const selectedFile = await refFileImage(editorRef);

      try {
        // Supongamos que dataImg64base contiene la imagen en base64 que quieres enviar
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
        }

        const fetchResponse = await fetch(
          presignedUrlUserImage.data!.generatePresignedUrlUserImage.url, // Add null check for response.data
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
        }

        dispatch(
          updateProfileImage({
            profileImage: createS3Url(
              presignedUrlUserImage.data!.generatePresignedUrlUserImage.key,
            ),
          }),
        );

        await saveImageUserS3({
          variables: {
            profileImageKey:
              presignedUrlUserImage.data!.generatePresignedUrlUserImage.key,
            profileImageLocation: createS3Url(
              presignedUrlUserImage.data!.generatePresignedUrlUserImage.key,
            ),
          },
        });

        toast({
          variant: 'success',
          title: 'Imagen de perfil cambiada',
          description: '¡Tu imagen de perfil ha sido cambiada con éxito!',
        });
      } catch (error) {
        // Manejar errores en caso de que la solicitud falle
        toast({
          variant: 'destructive',
          title: 'No se pudo cambiar la imagen de perfil',
          description: '¡Algo salió mal! Por favor, inténtalo de nuevo.',
        });
      }
    }
  };

  const { t } = useTranslation('common');

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center gap-4 rounded-xl">
        {/* User Info finished */}
        {/* <CustomImageUploader
          width={150}
          height={150}
          style="white"
          imageUrl={user.profile_picture ?? undefined}
          onChange={handleChange}
        /> */}

        <>
          <div className="w-80 lg:w-full h-auto flex flex-col sm:flex-row gap-2 justify-center items-center p-4 sm:p-0">
            <Link
              href="/account/settings"
              className="w-full sm:w-32 lg:w-40 h-14 flex flex-row justify-center items-center gap-2 bg-white border border-drcuotasPrimary-bg text-drcuotasPrimary-text rounded-xl"
            >
              <IoSettings className="text-2xl" />
              <span className="leading-tight tracking-tight">
                {/* {t('uploadCv')} */}
                Perfil
              </span>
            </Link>

            <button
              className="w-full sm:w-32 lg:w-40 h-14 hidden flex-row justify-center items-center gap-2 bg-white border border-drcuotasPrimary-bg text-drcuotasPrimary-text rounded-xl"
              onClick={cvHandler}
            >
              <LucideFile className="text-sm lg:text-2xl" />
              <span className="leading-tight tracking-tight">
                {/* {t('uploadCv')} */}
                Doctor
              </span>
            </button>

            <button
              className="w-full sm:w-32 lg:w-40 h-14 hidden  flex-row justify-center items-center gap-2 bg-white border border-drcuotasPrimary-bg text-drcuotasPrimary-text rounded-xl"
              onClick={editInfoHandler}
            >
              <LucideFilePen className="text-sm lg:text-2xl" />
              <span className="leading-tight tracking-tight">
                {/* {t('editInfo')} */}
                Doctor
              </span>
            </button>

            <button
              className="w-40 h-14 hidden flex-row justify-center items-center gap-2 bg-white border border-drcuotasPrimary-bg text-drcuotasPrimary-text rounded-xl"
              onClick={imagesHandler}
            >
              <span className="tracking-tight leading-tight">
                {/* {t('uploadPhotos')} */}
                Fotos
              </span>
              <BsUpload className="text-xl" />
            </button>

            <button className="w-40 h-14 hidden flex-row justify-center items-center gap-2 bg-white border border-drcuotasPrimary-bg text-drcuotasPrimary-text rounded-xl">
              <span className="tracking-tight leading-tight ">
                {/* {t('uploadVideos')} */}
                Videos
              </span>
              <BsUpload className="text-xl" />
            </button>
          </div>
        </>
      </div>

      {/* MODAL */}
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
