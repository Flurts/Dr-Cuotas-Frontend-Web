import { GetServerSideProps } from 'next';

import { Head } from '@/components/constants';
import getServerSideSharedProps from '@/lib/next';
import FaqView from '@/views/faq';

export default function FrequentlyAskedQuestions() {
  return (
    <>
      <Head title="Preguntas Frecuentes" />
      <FaqView />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await getServerSideSharedProps(ctx)),
    },
  };
};
