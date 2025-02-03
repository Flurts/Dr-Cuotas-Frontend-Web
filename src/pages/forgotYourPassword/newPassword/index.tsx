import { Form, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/router';
// import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { ImSpinner9 } from 'react-icons/im';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { Head } from '@/components/constants';
import { toast } from '@/components/ui/use-toast';
import RegisterModal from '@/layouts/components/SignUp';
import { chargeUser } from '@/store';
import { useLoginMutation } from '@/types';

const NewPasswordView = () => {
  const router = useRouter();
  const [toggleModal, setToggleModal] = useState(false);
  const [errorRequest, setError] = useState('');
  const [loginUserMutatio] = useLoginMutation();
  const dispatch = useDispatch();

  const modalHandler = () => {
    setToggleModal(!toggleModal);
  };

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

      toast({
        variant: 'success',
        title: 'Te has logueado correctamente',
        description: 'Bienvenido de vuelta',
      });
      await router.push('/');
    } catch (error: any) {
      toast({
        variant: 'warning',
        title: 'Error al iniciar sesión',
        description: 'Revisa tus credenciales, algo no está bien',
      });
      setError(error.message);
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

  // const { t } = useTranslation('common');

  return (
    <>
      <Head title="New Password" />

      <div className="flex flex-col xl:h-96 h-[25rem] mb-40 pt-20 w-full justify-start xl:justify-center items-center ">
        <div className=" bg-white xl:w-[26rem] flex flex-col gap-3">
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <h1 className="text-[#6636E2] text-3xl md:text-4xl text-center font-bold">
              Crear nueva contraseña
            </h1>
            <p className="text-[#6636E2] text-base">
              Crear nueva contraseña para la cuenta
            </p>
            <FormikProvider value={formik}>
              <Form className="w-full">
                <div className="flex flex-col gap-3">
                  <input
                    type="password"
                    placeholder="New Password"
                    className="border border-gray-300 rounded p-2"
                    {...formik.getFieldProps('emailPhone')}
                  />
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className="border border-gray-300 rounded p-2 pr-10 w-full" // Añade espacio a la derecha para el icono
                      {...formik.getFieldProps('password')}
                    />
                    {/* Ícono para alternar la visibilidad de la contraseña */}
                    <span
                      className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer text-[#6636E2]"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#6636E2] text-white py-1 px-3 rounded-full justify-center items-center  hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-[#B398F5]  hover:bg-white hover:border hover:text-[#6636E2] hover:border-[#6636E2]"
                  >
                    {formik.isSubmitting ? (
                      <ImSpinner9 className="w-full h-auto animate-spin text-white " />
                    ) : (
                      <p>Confirmar</p>
                    )}
                  </button>
                </div>
              </Form>
            </FormikProvider>

            <div className=" flex flex-col md:flex-row md:w-96 justify-between   items-center w-full "></div>
            {errorRequest && (
              <div className="text-red-600 text-sm text-center">
                {errorRequest}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {toggleModal && (
        <div className="fixed inset-0   bg-black h-screen bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 xl:w-[460px] w-[350px] relative">
            <IoCloseCircleSharp
              className="text-2xl text-gray-500 absolute top-4 right-4 cursor-pointer"
              onClick={modalHandler}
            />
            <div className="z-50">
              <RegisterModal modalHandler={modalHandler} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewPasswordView;
