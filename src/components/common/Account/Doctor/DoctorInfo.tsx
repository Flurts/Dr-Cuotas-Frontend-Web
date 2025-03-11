import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { BsUpload } from 'react-icons/bs';
import { HiOutlinePencilAlt } from 'react-icons/hi';
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

import CustomImageUploader from '../../Editable/UserImage';

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
  const [file, setFile] = useState<File | null>(null);
  const [toggleModal, setToggleModal] = useState(false);
  const dispatch = useDispatch();
  const [generatePresignedUrlUserImage] =
    useGeneratePresignedUrlUserImageMutation();

  const [saveImageUserS3] = useSaveImageUserS3Mutation();

  const handleChange = (FileUpload: File) => {
    modalHandler();
    setFile(FileUpload);
  };

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
      <div className="w-full h-full flex flex-col justify-center items-center border gap-4 p-20 rounded-xl">
        {/* User Info finished */}
        <CustomImageUploader
          width={150}
          height={150}
          style="white"
          imageUrl={user.profile_picture ?? undefined}
          onChange={handleChange}
        />

        <>
          <div className="w-full h-auto flex flex-row gap-4 justify-center items-center ">
            <button
              className="border border-drcuotasTertiary-bg text-drcuotasTertiary-text rounded-xl flex items-center justify-center gap-4 w-40 h-20"
              onClick={cvHandler}
            >
              <span className="tracking-tight leading-tight">
                {/* {t('uploadCv')} */}
                CV
              </span>
              <BsUpload className="text-xl" />
            </button>

            <button
              className="border border-drcuotasTertiary-bg text-drcuotasTertiary-text rounded-xl flex items-center justify-center gap-4 w-40 h-20"
              onClick={editInfoHandler}
            >
              <span className="tracking-tight leading-tight ">
                {/* {t('editInfo')} */}
                Informacion
              </span>
              <HiOutlinePencilAlt className="text-xl" />
            </button>

            <button
              className="border border-drcuotasTertiary-bg text-drcuotasTertiary-text rounded-xl flex items-center justify-center gap-4 w-40 h-20"
              onClick={imagesHandler}
            >
              <span className="tracking-tight leading-tight">
                {/* {t('uploadPhotos')} */}
                Fotos
              </span>
              <BsUpload className="text-xl" />
            </button>

            <button className="border border-drcuotasTertiary-bg text-drcuotasTertiary-text rounded-xl flex items-center justify-center gap-4 w-40 h-20">
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
