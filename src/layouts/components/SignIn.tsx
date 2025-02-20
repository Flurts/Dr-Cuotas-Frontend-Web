import { Form, FormikProvider, useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { ImSpinner9 } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { chargeUser } from '@/store';
import { useLoginMutation } from '@/types';

function SignIn() {
  const [loginUserMutatio] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const initialValues = {
    emailPhone: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    emailPhone: Yup.string().required('Email or Phone is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values: any) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const response = await loginUserMutatio({
        variables: {
          phoneEmail: values.emailPhone,
          password: values.password,
        },
      });

      if (response.errors) {
        response.errors.forEach((error) => {
          console.log(error.message);
        });
      }

      dispatch(
        chargeUser({
          user: {
            ...response.data!.login.user,
            // @ts-expect-error: doctor might be undefined
            doctor: response.data!.login.user?.doctor ?? null,
          },
          jwt: response.data!.login.token,
        }),
      );

      localStorage.setItem('accessToken', response.data!.login.token);
      localStorage.setItem('role', response.data!.login.user.role);

      toast({
        variant: 'success',
        title: 'Te has logueado correctamente',
        description: 'Bienvenido de vuelta',
      });
      if (response.data!.login.user.role === 'Admin') {
        await router.push('/admin');
      } else {
        await router.push('/');
      }
    } catch (error: any) {
      toast({
        variant: 'warning',
        title: 'Error al iniciar sesión',
        description: 'Revisa tus credenciales, algo no está bien',
      });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  // Estado para controlar si la contraseña está oculta o no
  const [showPassword, setShowPassword] = useState(false);

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { t } = useTranslation('common');

  return (
    <div className="w-80 lg:w-[40vw] flex flex-col justify-center items-center gap-4">
      <span className="text-drcuotasPrimary-text text-2xl font-black uppercase leading-tight tracking-tight">
        Iniciar sesión
      </span>
      <FormikProvider value={formik}>
        <Form className="w-full">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Correo electrónico o teléfono"
              className="border border-gray-300 rounded-md p-3 leading-tight tracking-tight"
              {...formik.getFieldProps('emailPhone')}
            />
            <div className="flex flex-col gap-3">
              <>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Contraseña"
                    className="border border-gray-300 rounded-md p-3 pr-10 w-full leading-tight tracking-tight" // Añade espacio a la derecha para el icono
                    {...formik.getFieldProps('password')}
                  />
                  {/* Ícono para alternar la visibilidad de la contraseña */}
                  <span
                    className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer text-[#6636E2] leading-tight tracking-tight"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                </div>
              </>
              <>
                <div className="flex flex-row items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-xs font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-tight tracking-tight"
                    >
                      Recuérdame
                    </label>
                  </div>
                  <Link href="/forgot-your-password">
                    <span className="text-xs leading-tight tracking-tight">
                      Recuperar contraseña ?
                    </span>
                  </Link>
                </div>
              </>
            </div>
            <button
              type="submit"
              className="bg-drcuotasPrimary-bg text-white leading-tight tracking-tight uppercase h-12 w-full rounded-md justify-center items-center  hover:scale-100 transition-all duration-300 hover:shadow-2xl hover:shadow-[#B398F5]  hover:bg-white hover:border hover:text-[#6636E2] hover:border-[#6636E2]"
            >
              {formik.isSubmitting ? (
                <ImSpinner9 className="animate-spin h-6 text-white w-full" />
              ) : (
                t('loginButton')
              )}
            </button>
          </div>
        </Form>
      </FormikProvider>

      <div className="flex flex-col gap-6 w-full justify-center items-center">
        <span className="text-drcuotasTertiary-text text-xs w-full text-center leading-tight tracking-tight">
          o continuar con
        </span>
        <div className="flex flex-row items-center justify-center w-full gap-2">
          <button
            type="button"
            className=""
            onClick={async () => {
              await signIn('google');
            }}
          >
            <FcGoogle className="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
