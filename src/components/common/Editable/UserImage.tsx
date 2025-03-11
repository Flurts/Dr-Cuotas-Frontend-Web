import Image from 'next/image';
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
  const handleFileChange = (file: File) => {
    onChange(file);
  };

  const image =
    imageUrl !== undefined && imageUrl !== ''
      ? imageUrl
      : '/images/elements/girl_footer.svg';

  return (
    <>
      <div className=" w-full h-full justify-center items-center hidden md:flex">
        <FileUploader
          handleChange={handleFileChange}
          name="file"
          types={fileTypes}
          className=""
        >
            <Image
              src={image}
              alt="avatar"
              width={width}
              height={height}
              quality={80}
              className="w-full h-full rounded-full"
            />
            {/* <span
              className={`absolute bottom-0 ${style === 'color' ? 'bg-drcuotasPrimary-bg text-white' : 'bg-white text-drcuotasPrimary-text text-lg tracking-tight leading-tight uppercase font-black '} w-[80px] md:w-[60%] h-8 rounded-xl text-center`}
            >
              Editar
            </span> */}
        </FileUploader>
      </div>
      <Image
        src={image}
        alt="avatar"
        width={width}
        height={height}
        quality={80}
        className="rounded-xl shadow-2xl md:hidden"
      />
    </>
  );
};

export default CustomImageUploader;
