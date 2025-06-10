/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

interface ImageUploaderProps {
  width: number;
  height: number;
  imageUrl: string | undefined;
  style?: 'white' | 'color';
  onChange: (file: File) => void;
}

const fileTypes = ['JPG', 'PNG', 'GIF'];

const CustomImageUploader: React.FC<ImageUploaderProps> = ({
  width,
  height,
  imageUrl,
  style = 'color',
  onChange,
}) => {
  const [imageUrl2, setImageUrl2] = useState('/images/default_profile.svg');
  const handleFileChange = (file: File) => {
    onChange(file);
  };
  useEffect(() => {
    // Este bloque solo corre en el cliente
    const savedProfilePicture = localStorage.getItem('profile_picture');
    if (savedProfilePicture) {
      setImageUrl2(savedProfilePicture);
    }
  }, []);

  const image =
    imageUrl !== undefined && imageUrl !== '' ? imageUrl : imageUrl2;

  return (
    <>
      <div className=" w-full h-full justify-center items-center hidden md:flex">
        <FileUploader
          handleChange={handleFileChange}
          name="file"
          types={fileTypes}
          className=""
        >
          <img
            src={image}
            alt="avatar"
            width={width}
            height={height}
            className="w-full h-full "
          />
          {/* <span
              className={`absolute bottom-0 ${style === 'color' ? 'bg-drcuotasPrimary-bg text-white' : 'bg-white text-drcuotasPrimary-text text-lg tracking-tight leading-tight uppercase font-black '} w-[80px] md:w-[60%] h-8 rounded-xl text-center`}
            >
              Editar
            </span> */}
        </FileUploader>
      </div>
      <img
        src={image}
        alt="avatar"
        width={width}
        height={height}
        className="rounded-xl shadow-2xl md:hidden"
      />
    </>
  );
};

export default CustomImageUploader;
