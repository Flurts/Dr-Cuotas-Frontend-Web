import Image from 'next/image';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface HomeSpecialtieCardProps {
  imageUrl: string;
  rating: number;
  title: string;
  description: string;
  price: number;
}

const SpecialtyCard: React.FC<HomeSpecialtieCardProps> = ({
  imageUrl,
  rating,
  title,
  description,
  price,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') ?? '[]');
    const newItem = { imageUrl, rating, title, description, price };
    localStorage.setItem('cart', JSON.stringify([...cart, newItem]));
  };

  return (
    <>
      <div
        className="flex flex-col w-60 lg:w-80 h-full rounded-xl shadow-lg bg-white  cursor-pointer"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <>
          <div className="flex justify-center items-center">
            <Image
              src={imageUrl ?? '/images/elements/specialty.svg'}
              alt=""
              className="w-full h-full object-cover border-white border-2"
              width={238}
              height={224}
            />
          </div>
        </>

        <>
          <div className="flex flex-col gap-4 items-center justify-center p-8 flex-grow">
            <div className="hidden flex-row w-[60px] items-center justify-center bg-[#26335D] gap-2 rounded-3xl p-1">
              <FaStar className="text-yellow-400 text-sm" />
              <span className="text-white text-xs">{rating ?? 0}</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 w-full">
              <span className="uppercase leading-tight tracking-tight font-black text-xl text-drcuotasPrimary-text truncate">
                {title}
              </span>
              <span className="text-drcuotasPrimary text-xs line-clamp-3 uppercase leading-tight tracking-tight">
                {description.length > 0
                  ? description
                  : 'Descripción no disponible'}
              </span>
            </div>
          </div>
        </>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          onClick={() => {
            setIsOpen(false);
          }}
          className="fixed inset-0 w-full h-full backdrop-blur-xl bg-drcuotasSecondary-bg bg-opacity-50 flex  justify-center items-center z-50"
        >
          <>
            <Tabs
              defaultValue="account"
              className="w-full h-full flex flex-col justify-center items-center p-20"
            >
              <div>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="account">
                    <span className="text-drcuotasPrimary-text font-black uppercase leading-tight tracking-tight">
                      Comprar
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="password">
                    <span className="text-drcuotasPrimary-text font-black uppercase leading-tight tracking-tight">
                      Informacion
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="cerrar"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <span className="text-drcuotasPrimary-text font-black uppercase leading-tight tracking-tight">
                      x
                    </span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <>
                <TabsContent value="account" className="h-full">
                  <Card>
                    <>
                      <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>
                          Make changes to your account here. Click save when
                          you're done.
                        </CardDescription>
                      </CardHeader>
                    </>
                    <>
                      <CardContent className="space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="username">Username</Label>
                          <Input id="username" defaultValue="@peduarte" />
                        </div>
                      </CardContent>
                    </>
                    <>
                      <CardFooter>
                        <Button>Save changes</Button>
                      </CardFooter>
                    </>
                  </Card>
                </TabsContent>
              </>
              <>
                <TabsContent value="password" className="h-full">
                  <Card>
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>
                        Change your password here. After saving, you'll be
                        logged out.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Label htmlFor="current">Current password</Label>
                        <Input id="current" type="password" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="new">New password</Label>
                        <Input id="new" type="password" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save password</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </>
            </Tabs>
          </>
        </div>
      )}
    </>
  );
};

export default SpecialtyCard;
