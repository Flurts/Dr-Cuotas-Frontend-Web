import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Tabs, TabsContent } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import SignIn from '@/layouts/components/SignIn';
import RegisterModal from '@/layouts/components/SignUp';
import { chargeUser } from '@/store';
import { useLoginWithGoogleTokenMutation } from '@/types';

export default function LoginView() {
  const { data: session } = useSession();
  const [loginWithGoogleToken] = useLoginWithGoogleTokenMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  // Verifica si hay un query parameter para determinar la vista inicial
  const initialTab = router.query.view === 'register' ? 'register' : 'login';
  const [tab, setTab] = useState(initialTab);

  useEffect(() => {
    const handleGoogleSignInUp = async () => {
      if (session) {
        try {
          const response = await loginWithGoogleToken({
            variables: {
              // @ts-expect-error: accessToken might be undefined
              token: session.idToken as string,
            },
          });

          if (response.errors) {
            response.errors.forEach((error) => {
              console.log(error.message);
            });
            return;
          }

          dispatch(
            chargeUser({
              user: {
                ...response.data!.loginWithGoogleToken.user,
                // @ts-expect-error: doctor might be undefined
                doctor:
                  response.data!.loginWithGoogleToken.user?.doctor ?? null,
              },
              jwt: response.data!.loginWithGoogleToken.token,
            }),
          );

          localStorage.setItem(
            'accessToken',
            response.data!.loginWithGoogleToken.token,
          );

          toast({
            variant: 'success',
            title: 'Te has logueado correctamente',
            description: 'Bienvenido de vuelta',
          });
          await router.push('/');
        } catch (error: any) {}
      }
    };

    void handleGoogleSignInUp();
  }, [session, loginWithGoogleToken, router]);

  const handleChangeTab = (value: string) => {
    setTab(value);
  };

  return (
    <div className="w-full h-full flex flex-row justify-center items-center  gap-80 ">
      <div className="flex flex-col justify-center items-start gap-8">
        <div className="flex flex-col gap-2">
          {tab === 'login' ? (
            <>
              <span className="text-drcuotasSecondary-text text-4xl font-bold  uppercase leading-tight tracking-tight">
                Iniciar sesión
              </span>
              <span className="text-drcuotasSecondary-text text-3xl font-medium">
                De una manera simple
              </span>
            </>
          ) : (
            <>
              <span className="text-drcuotasSecondary-text text-5xl font-semibold">
                Regístrate
              </span>
              <span className="text-drcuotasSecondary-text text-3xl font-medium">
                De una manera simple
              </span>
            </>
          )}
        </div>
        <Image
          src="/images/logo/logo-1.svg"
          alt="Logo"
          width={190}
          height={190}
        />
        <span className="line-clamp-2 w-[240px] text-xs">
          {tab === 'login' ? (
            <>
              Si no tienes una cuenta, puedes{' '}
              <button
                onClick={() => {
                  handleChangeTab('register');
                }}
                className="text-drcuotasPrimary-text font-semibold"
              >
                Registrarte aquí!
              </button>
            </>
          ) : (
            <>
              Si ya tienes una cuenta, puedes{' '}
              <button
                onClick={() => {
                  handleChangeTab('login');
                }}
                className="text-drcuotasPrimary-text font-semibold"
              >
                Iniciar sesión aquí!
              </button>
            </>
          )}
        </span>
      </div>

      <Tabs
        defaultValue="login"
        value={tab}
        onValueChange={(value) => {
          setTab(value);
        }}
        className="w-[400px] h-full justify-center items-start flex flex-col"
      >
        <TabsContent value="login">
          <SignIn />
        </TabsContent>
        <TabsContent value="register">
          <div className="flex flex-col justify-center items-start gap-5">
            <RegisterModal />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
