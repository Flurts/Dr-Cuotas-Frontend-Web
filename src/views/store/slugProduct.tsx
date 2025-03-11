import { useState } from 'react';
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';
import Image from 'next/image';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
 

export default function ProductPage() {
  // Array de imágenes de ejemplo; reemplázalas por tus URLs reales
  const images = [
    '/images/surgerys/girl_chest.svg',
    '/images/elements/girl_footer.svg',
    '/images/surgerys/chest_body.svg',
    '/images/surgerys/girl_sculpture.svg',
  ];

  // Imagen seleccionada inicialmente (la primera del array)
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <>
      <div className="w-full h-full flex flex-col p-4 mb-40">
        {/* Volver para atras */}
        <div className="w-full h-10 flex justify-start items-center p-4">
          <Link href="/account" className="w-auto h-auto flex flex-row justify-center items-center gap-2">
            <FiChevronLeft className="text-drcuotasTertiary-text" />
            <span className="text-sm text-drcuotasTertiary-text uppercase leading-tight tracking-tight">Volver a mi cuenta</span>
          </Link>
        </div>

        {/* Información del Producto */}
        <div className="w-full h-full  flex flex-row justify-start  gap-4 p-4">
          {/* Área principal de imagen del producto */}
          <div className="bg-white border-2 w-full h-full flex justify-center items-center">
            <Image
              src={selectedImage}
              alt="Imagen del Producto"
              width={500}
              height={500}
              className="object-cover h-[30vw]"
            />
          </div>
          {/* Información del Producto */}
          <div className="bg-white border-2  w-[40vw] h-96 flex flex-col justify-start items-center gap-4 p-4">
            {/* Título del Producto */}
            <div className="w-full h-auto flex flex-col">
              <span className="text-2xl text-drcuotasPrimary-text uppercase leading-tight tracking-tight font-black">
                Otoplastia
              </span>
              <span className="text-sm text-drcuotasTertiary-text leading-tight tracking-tight">
                Cirugía General
              </span>
            </div>
            {/* Precio del Producto */}
            <div className="w-full h-auto flex flex-row justify-start items-center gap-4">
              <span className="text-2xl text-drcuotasTertiary-text leading-tight tracking-tight">
                Cuotas de $200
              </span>
              <span className="text-xs text-drcuotasTertiary-text leading-tight tracking-tight">
                ( Valor Total $4000 )
              </span>
            </div>
            {/* Separador */}
            <div className="w-full h-1 bg-drcuotasPrimary-bg"></div>
            {/* Términos y Condiciones */}
            <div className="w-full h-40 flex flex-col justify-start gap-2">
              <span className="text-lg text-drcuotasTertiary-text uppercase leading-tight tracking-tight">
                Términos y Condiciones
              </span>
              <span className="text-xs text-drcuotasTertiary-text leading-tight tracking-tight">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe facere eos inventore quasi tenetur obcaecati sed libero esse quam soluta similique debitis perferendis tempore praesentium, facilis minus incidunt ab error.
              </span>
            </div>
            {/* Botones para pagar */}
            <div className="w-full h-40 flex flex-row justify-center items-center gap-2">
              <button className="border border-drcuotasPrimary-bg w-40 h-10">
                <span className="text-sm text-drcuotasPrimary-text uppercase leading-tight tracking-tight font-bold">
                  Pagar Cuota
                </span>
              </button>
              <button className="bg-drcuotasPrimary-bg w-48 h-10">
                <span className="text-sm text-white uppercase leading-tight tracking-tight font-bold">
                  Completar Cuotas
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Galería de miniaturas */}
          <div className="w-full h-auto flex flex-row gap-2 justify-start items-center p-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`w-20 h-20 border cursor-pointer ${
                  selectedImage === img ? 'border-drcuotasPrimary-bg ' : 'border-transparent'
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={img}
                  alt={`Producto ${idx + 1}`}
                  width={192}
                  height={160}
                  className="object-cover w-full h-full border"
                />
              </div>
            ))}
          </div>
      </div>
    </>
  );
}
