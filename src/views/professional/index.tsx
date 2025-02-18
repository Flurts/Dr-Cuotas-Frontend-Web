import React from 'react';

import OurProfessionals from '@/components/common/ViewElements/OurProfessionals';
import TitleElements from '@/components/common/ViewElements/TitleElements';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProfessionalView() {
  return (
    <>
      <OurProfessionals />

      {/* <Tabs
          defaultValue="Nuestros profesionales"
          className="w-full h-auto flex flex-col justify-center items-center"
        >
            <TabsList className="w-96 h-full bg-[#E5F9F7]">
              <TabsTrigger value="Nuestros profesionales">
              <span className="text-xs leading-tight tracking-tight">
                Nuestros profesionales
              </span>
              </TabsTrigger>
              <TabsTrigger value="Inscripciones">
              <span className="text-xs leading-tight tracking-tight">
                Inscripciones
              </span>
              </TabsTrigger>
            </TabsList>

          <TabsContent value="Nuestros profesionales">
          <OurProfessionals />
          </TabsContent>

          <TabsContent value="Inscripciones">
            <div className="flex flex-col items-center justify-center w-full h-full lg:h-auto">
              <TitleElements
                primaryText="Inscribete para trabajar con nosotros"
                secondaryText="Unete a Nuestro Equipo"
                descriptionText=""
              />

              <div className="w-[60vh] flex flex-col justify-center items-center gap-4">
                <div className="w-full  flex flex-row justify-center gap-4">
                  <>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="Nombre" className='leading-tight tracking-tight uppercase'>Nombre</Label>
                      <Input type="text" id="Nombre" placeholder="Nombre" />
                    </div>
                  </>
                  <>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="Apellido" className='leading-tight tracking-tight uppercase'>Apellido</Label>
                      <Input type="text" id="Apellido" placeholder="Apellido" />
                    </div>
                  </>
                </div>

                <>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="email" className='leading-tight tracking-tight uppercase'>Email</Label>
                    <Input type="email" id="email" placeholder="Email" />
                  </div>
                </>

                <div className="w-full  flex flex-row justify-center gap-4">
                  <>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="Matricula" className='leading-tight tracking-tight uppercase'>Matricula N°</Label>
                      <Input type="number" id="number" placeholder="N°" />
                    </div>
                  </>
                  <>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="Especialidad" className='leading-tight tracking-tight uppercase'>Especialidad</Label>
                      <Input
                        type="text"
                        id="Especialidad"
                        placeholder="Especialidad"
                      />
                    </div>
                  </>
                </div>

                <Button type="submit" className="bg-[#8576FF] h-12 w-full leading-tight tracking-tight uppercase">
                  Enviar solicitud
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs> */}
    </>
  );
}
