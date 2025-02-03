import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { BsUpload } from 'react-icons/bs';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { useDispatch } from 'react-redux';

import CustomImageUploader from '@/components/common/Editable/UserImage';
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
      <div className="flex flex-col h-full w-screen md:w-1/3 lg:justify-normal justify-center items-center">
        {/* User Info finished */}
        <div className="flex flex-col gap-4 justify-center items-center pt-10 bg-[#7863f7] h-1/2 text-white w-80 xl:w-full px-20 py-10">
          {/* User Edit Info Buttons */}

          <CustomImageUploader
            width={150}
            height={150}
            style="white"
            imageUrl={user.profile_picture ?? undefined}
            onChange={handleChange}
          />
          <button
            className="border border-white flex items-center justify-between w-full h-[35px] px-4"
            onClick={cvHandler}
          >
            <span className="text-center w-full  text-xs">{t('uploadCv')}</span>
            <BsUpload className=" text-xl" />
          </button>

          <button
            className="border border-white flex items-center justify-between w-full h-[35px] px-4"
            onClick={editInfoHandler}
          >
            <span className="text-center w-full  text-xs">{t('editInfo')}</span>
            <HiOutlinePencilAlt className=" text-xl" />
          </button>

          <button
            className="border border-white flex items-center justify-between w-full h-[35px] px-4"
            onClick={imagesHandler}
          >
            <span className="text-center w-full  text-xs">
              {t('uploadPhotos')}
            </span>
            <BsUpload className=" text-xl" />
          </button>

          <button className="border border-white flex items-center justify-between w-full h-[35px] px-4">
            <span className="text-center w-full text-xs">
              {t('uploadVideos')}
            </span>
            <BsUpload className=" text-xl" />
          </button>
        </div>

        <div className="w-80 xl:w-full h-1/2 md:h-[415px] xl:h-[380px] flex flex-col gap-4 justify-center items-center bg-[#6636E2] text-white px-20 py-10">
          <div className="w-full">
            <div className="hidden flex-col w-full gap-4 justify-center">
              <span className="text-3xl font-normal">Cta. Corriente</span>
              <span className="text-base font-light">Al día de la fecha</span>
            </div>
          </div>

          <div className="w-full hidden">
            <div className="flex flex-col w-full gap-2 justify-center mt-10">
              <span className="px-2 font-light text-sm">13/03/2024</span>
              <div className="w-full h-[1px] border border-b-0 border-white" />
              <span className="px-4 font-bold text-3xl">
                ${(200000).toLocaleString()}
              </span>
              <div className="w-full h-[1px] border border-b-0 border-white" />
              <div className="flex w-full justify-end">
                <span className="px-1 font-light text-sm">
                  u$s {(200).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className=" hidden flex-row gap-4 w-full">
            <button className="border border-white flex items-center justify-between w-[250px] h-[35px] px-4">
              Transferir
            </button>
            <button className="border border-white flex items-center justify-between w-[250px] h-[35px] px-4">
              Retirar
            </button>
          </div>
        </div>
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
