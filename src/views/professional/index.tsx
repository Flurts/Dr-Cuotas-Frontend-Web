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
      <div>
        <Tabs
          defaultValue="Nuestros profesionales"
          className="w-full h-screen flex flex-col  items-center"
        >
          <div className="w-full  flex justify-center items-center">
            <TabsList className="grid w-96 h-full grid-cols-2 bg-[#E5F9F7]">
              <TabsTrigger value="Nuestros profesionales">
                Nuestros profesionales
              </TabsTrigger>
              <TabsTrigger value="Inscripciones">Inscripciones</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="Nuestros profesionales">
            <OurProfessionals />
          </TabsContent>

          <TabsContent value="Inscripciones">
            <div className="flex flex-col items-center justify-center w-full gap-2 h-60 lg:h-screen">
              <TitleElements
                primaryText="Inscribete para trabajar con nosotros"
                secondaryText="Unete a Nuestro Equipo"
                descriptionText=""
              />

              <div className="w-[60vh] flex flex-col justify-center items-center gap-6">
                <div className="w-full  flex flex-row justify-center gap-2">
                  <>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="Nombre">Nombre</Label>
                      <Input type="text" id="Nombre" placeholder="Nombre" />
                    </div>
                  </>
                  <>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="Apellido">Apellido</Label>
                      <Input type="text" id="Apellido" placeholder="Apellido" />
                    </div>
                  </>
                </div>

                <>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="Email" />
                  </div>
                </>

                <div className="w-full  flex flex-row justify-center gap-2">
                  <>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="Matricula">Matricula N°</Label>
                      <Input type="number" id="number" placeholder="N°" />
                    </div>
                  </>
                  <>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="Especialidad">Especialidad</Label>
                      <Input
                        type="text"
                        id="Especialidad"
                        placeholder="Especialidad"
                      />
                    </div>
                  </>
                </div>

                <Button type="submit" className="bg-[#8576FF] h-12 w-48">
                  Enviar solicitud
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
