import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { toast } from '@/components/ui/use-toast';
import RegisterModal from '@/layouts/components/SignUp';
import { chargeUser } from '@/store';
import { useLoginWithGoogleTokenMutation } from '@/types';

export default function RegisterView() {
  const { data: session } = useSession();
  const [loginWithGoogleToken] = useLoginWithGoogleTokenMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  // Verifica si hay un query parameter para determinar la vista inicial

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

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center gap-20 p-20">
        {/* Texto e Imagen principal  */}
        <>
          <div className="flex flex-col justify-center items-start gap-8">
            <Link href="/" className="w-auto h-auto">
              <Image
                src="/images/logo/logo-1.svg"
                alt="Logo"
                width={190}
                height={190}
              />
            </Link>
            <span className="w-full flex flex-col justify-center items-center text-xs leading-tight tracking-tight">
              <>
                Si no tienes una cuenta, puedes{' '}
                <Link
                  href="/login"
                  className="text-drcuotasPrimary-text font-semibold uppercase leading-tight tracking-tight"
                >
                  Ingresa a tu cuenta
                </Link>
              </>
            </span>
          </div>
        </>
        <>
          <RegisterModal />
        </>
      </div>
    </>
  );
}
