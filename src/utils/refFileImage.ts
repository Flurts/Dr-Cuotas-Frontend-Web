import settings from '@/settings';

export const refFileImage = async (editorRef: any) => {
  // Obtener el canvas de la imagen editada
  const canvas = editorRef.getImageScaledToCanvas();

  // Convertir el canvas a Blob
  const blob = await new Promise<Blob>((resolve) => {
    canvas.toBlob((blobImage: Blob) => {
      if (blobImage) {
        resolve(blobImage);
      }
    });
  });

  // Crear un archivo a partir del Blob
  const fileImage = new File([blob], 'edited-image.png', {
    type: blob.type,
  });

  return fileImage;
};

export const createS3Url = (keyImage: string) => {
  return `https://${settings.AWS_BUCKET_NAME}.s3.amazonaws.com/${keyImage}`;
};

// Función para convertir Base64 a Blob
export const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteString = atob(base64.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeType });
};

// Función para convertir Blob a File
export const blobToFile = (blob: Blob, fileName: string): File => {
  return new File([blob], fileName, { type: blob.type });
};

// Función para convertir Base64 a File
export const base64ToFile = (
  base64: string,
  fileName: string,
  mimeType: string,
): File => {
  const blob = base64ToBlob(base64, mimeType);
  return blobToFile(blob, fileName);
};
