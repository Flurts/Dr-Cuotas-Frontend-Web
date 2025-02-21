import React, { useEffect, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { ImSpinner9 } from 'react-icons/im';
import { IoCloseCircleSharp } from 'react-icons/io5';

const CustomEditorImage: React.FC<any> = ({
  toggleModal,
  modalHandler,
  handleChange,
  file,
}) => {
  const [editorScale, setEditorScale] = useState(1); // Estado para la escala del editor
  const [editorRef, setEditorRef] = useState<any>(null); // Referencia al componente AvatarEditor
  const [loading, setLoading] = useState(false); // Estado para mostrar un spinner mientras se guarda la imagen

  const handleSave = async () => {
    if (editorRef) {
      setLoading(true);
      await handleChange(editorRef);
      setLoading(false);
      modalHandler();
    }
  };

  const handleWheel = (event: WheelEvent) => {
    // Ajustar la escala del editor según el desplazamiento vertical del scroll
    const newScale = editorScale - event.deltaY * 0.01;
    // Limitar el rango de escala entre 1 y 3
    const clampedScale = Math.min(Math.max(newScale, 1), 3);
    setEditorScale(clampedScale);
  };

  useEffect(() => {
    if (!toggleModal) {
      setEditorScale(1);
      setEditorRef(null);
    }
  }, [toggleModal]);

  return (
    <>
      {/* MODAL */}
      <div
        onClick={modalHandler}
        className={`z-50 fixed flex inset-0 bg-black bg-opacity-45 justify-center items-center transition-opacity duration-100 ${
          toggleModal ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ visibility: toggleModal ? 'visible' : 'hidden' }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          onWheel={(event: React.WheelEvent<HTMLDivElement>) => {
            handleWheel(event.nativeEvent);
          }}
          className={`relative bg-white w-[500px] h-[600px] rounded-lg flex flex-col gap-5 transition-all duration-100 p-10 justify-center items-center ${
            toggleModal ? 'scale-100' : 'scale-90'
          }`}
        >
          <button className="absolute right-1 top-1">
            <IoCloseCircleSharp
              onClick={modalHandler}
              className="text-2xl m-3 text-gray-500"
            />
          </button>

          {file && ( // Renderizar AvatarEditor solo si hay un archivo seleccionado
            <AvatarEditor
              ref={(ref) => {
                setEditorRef(ref);
              }}
              image={file}
              width={250}
              height={250}
              border={50}
              borderRadius={200}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={editorScale}
              rotate={0}
              className="border-[#8565ff] border border-dashed"
            />
          )}

          {/* Botones para ajustar la escala y guardar la imagen editada */}
          {file && (
            <div className="flex flex-col justify-center items-center gap-6">
              <div>
                <span className="text-[#8565ff] w-full uppercase font-black text-center leading-tight tracking-tight">
                  Zoom
                </span>{' '}
                {/* Texto para indicar el propósito del input range */}
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={editorScale}
                  onChange={(e) => {
                    setEditorScale(parseFloat(e.target.value));
                  }}
                  className="w-[400px]"
                />
              </div>
              <button
                className="bg-drcuotasPrimary-bg text-white font-semibold px-4 py-2 rounded-xl text-center leading-tight tracking-tight hover:scale-110 transition"
                onClick={handleSave}
                disabled={loading}
              >
                {
                  // Mostrar un spinner mientras se guarda la imagen
                  loading ? (
                    <ImSpinner9 className="animate-spin h-6 w-6 text-white" />
                  ) : (
                    'Guardar imagen'
                  )
                }
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomEditorImage;
