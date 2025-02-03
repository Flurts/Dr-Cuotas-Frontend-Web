// import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import router from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { useSelector } from 'react-redux';
import { z } from 'zod';

// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
// import { getCurrentUser } from '@/store';
// import { toast } from '@/components/ui/use-toast';
import { Adjudicated, usePaymentUpdateAdjudicatedMutation } from '@/types';
import currencyFormatter from '@/utils/currencyFormatter';

// Esquema de validación con zod

const validateDiscountCode = async (code: string) => {
  // Simula una llamada a la API para validar el código de descuento
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(code === 'VALIDCODE'); // Reemplaza esto con tu lógica de validación
    }, 500);
  });
};

export default function PaymentForm({
  adjudicated,
}: {
  adjudicated: Adjudicated;
}) {
  const { t } = useTranslation(['common', 'surgeries', 'payment']);
  // const user = useSelector(getCurrentUser);

  const [paymentUpdateAdjudicated] = usePaymentUpdateAdjudicatedMutation();
  const [discountCodesList, setDiscountCodesList] = useState<string[]>([]);

  const discountCodeSchema = z.object({
    discountCode: z.string().min(1, t('payment:discountCodeRequired')),
  });

  const discountForm = useForm<z.infer<typeof discountCodeSchema>>({
    resolver: zodResolver(discountCodeSchema),
    defaultValues: {
      discountCode: '',
    },
  });

  async function onSubmit(values: z.infer<typeof discountCodeSchema>) {
    // Validación con zod
    const validation = discountCodeSchema.safeParse({ values });

    if (!validation.success) {
      return;
    }

    // Validar que el código de descuento exista y sea válido
    const isValid = await validateDiscountCode(values.discountCode);

    if (isValid) {
      setDiscountCodesList([...discountCodesList, values.discountCode]);
      discountForm.reset();
    } else {
      toast({
        variant: 'destructive',
        title: t('payment:discountCodeTitleInvalid'),
        description: t('payment:discountCodeDescriptionInvalid'),
      });
    }
  }

  async function handleUpdateAdjudicated() {
    try {
      const result = await paymentUpdateAdjudicated({
        variables: {
          adjudicatedId: adjudicated.id,
          quotasNumber: 10,
        },
      });

      if (result.data?.paymentUpdateAdjudicated) {
        toast({
          variant: 'success',
          title: t('payment:paymentSuccessTitle'),
          description: t('payment:paymentSuccessDescription'),
        });

        // Redirigir a la página de perfil
        void router.push('/account');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('payment:paymentErrorTitle'),
        description: t('payment:paymentErrorDescription'),
      });

      // Redirigir a la página de perfil
      void router.push('/account');
    }
  }

  return (
    <>
      <div className="w-screen md:w-full lg:h-full bg-[#f3f2f0] flex flex-col gap-10">
        <div className="w-screen md:w-full lg:h-full bg-[#6636E2] py-5 flex justify-center items-center">
          <div className="flex max-w-screen-xl justify-start items-start w-full">
            <h1 className="text-xl font-medium text-white ">
              {t('payment:userThanksMessage', {
                firstName: adjudicated.user?.first_name,
                lastName: adjudicated.user?.last_name,
              })}
            </h1>
          </div>
        </div>

        <div className="flex flex-row justify-center gap-6">
          <div className="h-full mb-20 flex justify-center items-center">
            <div className="max-w-3xl w-full bg-white border shadow-2xl shadow-[#B398F5] flex flex-col justify-center items-center rounded-lg p-6">
              <div className="flex flex-col w-full h-full items-center justify-start gap-3">
                <span className="text-xl font-semibold w-full">
                  {t('payment:billingCycleConfirm')}
                </span>

                <div className="flex flex-col justify-start items-start w-full pt-0 gap-6">
                  {/* <Avatar>
                    <AvatarImage src={user.profile_picture ?? ''} />
                    <AvatarFallback>
                      {user.first_name.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>

                  <span className="text-lg font-semibold">
                    {user.first_name + ' ' + user.last_name}
                  </span> */}

                  <div className="flex flex-col w-full gap-2">
                    <div className="flex justify-between w-full">
                      <span className="text-lg font-normal">Doctor</span>
                      <span className="text-base font-light text-gray-500">
                        Dr. {adjudicated.doctor?.user?.first_name}
                      </span>
                    </div>

                    <Separator className="my-2" />

                    <div className="flex flex-col justify-between w-full gap-5">
                      <span className="text-xl font-semibold">
                        {t('payment:surgeryNameTitle')}
                      </span>
                      <span className="text-sm font-normal">
                        {t('payment:surgeryNameValue', {
                          surgeryName: adjudicated.surgery?.name,
                        })}
                      </span>

                      <span className="text-xl font-semibold">
                        {t('payment:surgeryDataTitle')}
                      </span>
                      <span className="text-lg font-normal">
                        {t('payment:descriptionTitle')}
                      </span>
                      <span className="text-sm font-normal">
                        {adjudicated.surgery?.description ? (
                          <>{adjudicated.surgery?.description}</>
                        ) : (
                          <>
                            <span className="text-gray-500">
                              {t('payment:noDescriptionMessage')}
                            </span>
                          </>
                        )}
                      </span>

                      <div className="flex justify-between w-full">
                        <span className="text-lg font-normal">
                          {t('payment:surgeryTypeTitle')}
                        </span>
                        <span className="text-base font-semibold">
                          {t(`surgeries:${adjudicated.surgery?.type}`)}
                        </span>
                      </div>

                      <div className="flex justify-between w-full">
                        <span className="text-lg font-normal">Catergoría</span>
                        <span className="text-base font-semibold">
                          {t(`surgeries:${adjudicated.surgery?.category}`)}
                        </span>
                      </div>

                      <span className="text-lg font-normal">
                        {t('payment:userCommentsTitle')}
                      </span>
                      <span className="text-sm font-normal">
                        {adjudicated.comments ? (
                          <>{adjudicated.comments}</>
                        ) : (
                          <>
                            <span className="text-gray-500">
                              {t('payment:noCommentsMessage')}
                            </span>
                          </>
                        )}
                      </span>
                    </div>

                    <Separator className="my-2" />
                  </div>

                  <div className="flex flex-col w-full">
                    <div className="flex flex-col w-full gap-2">
                      <div className="flex justify-between w-full">
                        <span className="text-lg font-normal">
                          {t('payment:billingCycleDatesTitle')}
                        </span>
                        <span className="text-sm font-normal">
                          {t('payment:billingCycleDatesValue', {
                            startDate: 1,
                            endDate: 5,
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between w-full">
                        <span className="text-lg font-normal">
                          {t('payment:billingCycleTitle')}
                        </span>
                        <span className="text-sm font-normal">
                          {t('payment:billingCycleValue')}
                        </span>
                      </div>

                      <div className="flex justify-between w-full">
                        <span className="text-lg font-normal">
                          {t('payment:billingQuotesNumber')}
                        </span>
                        <span className="text-sm font-normal">10</span>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="flex justify-between w-full">
                      <span className="text-lg font-normal">
                        {t('payment:TotalTitle')}
                      </span>
                      <span className="text-sm font-normal">
                        {currencyFormatter(adjudicated.surgery?.amount ?? 0)}{' '}
                        ARS
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-full gap-4">
                  <Form {...discountForm}>
                    <form
                      onSubmit={discountForm.handleSubmit(onSubmit)}
                      className="flex flex-col max-w-[240px] w-full justify-center"
                    >
                      <FormField
                        control={discountForm.control}
                        name="discountCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              {t('payment:discountCodeTitle')}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t('payment:discountCodeTitle')}
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                            <div className="w-full flex justify-start items-center ">
                              <Button
                                variant="default"
                                type="submit"
                                className="bg-[#6636E2] rounded-3xl text-white font-semibold w-full"
                              >
                                {t('payment:discountCodeButton')}
                              </Button>
                            </div>
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </div>

                <span className="text-lg font-semibold w-full">
                  {t('payment:paymentResumeTitle')}
                </span>

                <Separator className="mb-3" />

                <div className="space-y-2 flex flex-col w-full">
                  <div className="flex justify-between w-full">
                    <span className="text-sm font-normal">
                      {t('payment:subtotalTitle')}
                    </span>
                    <span className="text-sm font-normal">
                      {currencyFormatter(adjudicated.surgery?.amount ?? 0)} ARS
                    </span>
                  </div>
                  <div className="flex justify-between w-full">
                    <span className="text-sm font-normal">
                      {t('payment:discountTitle')}
                    </span>
                    <span className="text-sm font-normal">0,00 ARS</span>
                  </div>
                  {/* <div className="flex justify-between w-full">
                    <span className="text-sm font-normal">IVA (19 %)</span>
                    <span className="text-sm font-normal">19.303,36 ARS</span>
                  </div> */}
                  <div className="flex justify-between w-full">
                    <span className="text-sm font-semibold">
                      {t('payment:totalPaymentTitle')}
                    </span>
                    <span className="text-sm font-normal">
                      {currencyFormatter(adjudicated.surgery?.amount ?? 0)} ARS
                    </span>
                  </div>
                </div>

                <ul className="flex flex-col w-full gap-4 px-5 list-disc py-4">
                  <li className="text-sm text-gray-600">
                    {t('payment:startDatePlan.descriptionOne')}
                    <span className="font-bold text-black">
                      {' '}
                      {t('payment:startDatePlan.inputValue', {
                        startDate: 1,
                        endDate: 5,
                      })}
                    </span>
                    {t('payment:startDatePlan.descriptionTwo')}
                  </li>
                  <li className="text-sm text-gray-600">
                    {t('payment:paymentCharge.descriptionOne')}
                    <span className="font-bold text-black">
                      {t('payment:paymentCharge.inputValue', {
                        totalPayment: currencyFormatter(
                          (adjudicated.surgery?.amount ?? 0) / 10,
                        ),
                      })}
                    </span>
                    {t('payment:paymentCharge.descriptionTwo')}
                  </li>
                  {/* <li className="text-sm text-gray-600">
                    Para evitar los cargos del próximo mes, cancela antes del 5
                    de agosto de 2024.
                  </li> */}
                </ul>

                <span className="text-xs text-gray-500 text-justify my-4">
                  {t('payment:termsAndConditions.descriptionOne')}{' '}
                  <Link href="/terms" className="text-blue-600">
                    {t('payment:termsAndConditions.terms')}
                  </Link>{' '}
                  {t('payment:termsAndConditions.descriptionTwo')}{' '}
                  <Link href="/terms" className="text-blue-600">
                    {t('payment:termsAndConditions.howToCancel')}
                  </Link>{' '}
                  {t('payment:termsAndConditions.descriptionThree')}{' '}
                  <Link href="/terms" className="text-blue-600">
                    {t('payment:termsAndConditions.privacyPolicy')}
                  </Link>
                </span>

                <Separator className="mb-3" />

                <div className="flex w-full justify-end">
                  <Button
                    variant="default"
                    className="rounded-3xl bg-[#6636E2] text-white font-semibold px-6 py-2"
                    onClick={handleUpdateAdjudicated}
                  >
                    {t('payment:confirmPaymentButton')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full mb-20 flex justify-center items-center">
            {/* <div className="w-[320px] md:w-[280px] h-[620px] md:h-[320px] bg-white border shadow-2xl shadow-[#B398F5] flex flex-col rounded-lg p-6 space-y-6"> */}
            <div className="max-w-sm w-full bg-white border border-gray-200 shadow-xl rounded-lg p-6 flex flex-col gap-5">
              <span className="text-lg font-bold">
                {t('payment:frecuentQuestions.title')}
              </span>

              <div>
                <span className="text-sm font-bold">
                  {t('payment:frecuentQuestions.questions.questionOne')}
                </span>

                <p className="text-sm text-justify text-gray-500">
                  {t('payment:frecuentQuestions.questions.answerOne')}
                </p>
              </div>

              <div>
                <span className="text-sm font-bold ">
                  {t('payment:frecuentQuestions.questions.questionTwo')}
                </span>

                <p className="text-sm text-justify text-gray-500">
                  {t('payment:frecuentQuestions.questions.answerTwo')}
                </p>
              </div>

              <div>
                <span className="text-sm font-bold ">
                  {t('payment:frecuentQuestions.questions.questionThree')}
                </span>

                <p className="text-sm text-justify text-gray-500">
                  {t('payment:frecuentQuestions.questions.answerThree')}
                </p>
              </div>

              <div>
                <span className="text-sm font-bold ">
                  {t('payment:frecuentQuestions.questions.questionFour')}
                </span>

                <p className="text-sm text-justify text-gray-500">
                  {t('payment:frecuentQuestions.questions.answerFour')}
                </p>
              </div>

              <div>
                <span className="text-sm font-bold ">
                  {t('payment:frecuentQuestions.questions.questionFive')}
                </span>

                <p className="text-sm text-justify text-gray-500">
                  {t('payment:frecuentQuestions.questions.answerFive')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
