// _app.tsx
import '@/styles/globals.css';

import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import { Provider } from 'react-redux';

import useApolloClient from '@/api/use_apollo_client';
import { Toaster } from '@/components/ui/toaster';
import FooterWrapper from '@/footers';
import LayoutWrapper from '@/layouts';
import { wrapper } from '@/store/wrapper';
import AdsModal from '@/components/common/ViewElements/AdComponents';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const App = ({
  Component,
  pageProps,
  session,
  ...rest
}: AppProps & { session: any }) => {
  const client = useApolloClient();
  const { store } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <LayoutWrapper>
          <FooterWrapper>
            <>
              <SessionProvider session={session}>
                  <main className={poppins.className}>
                    {/* Botón flotante del carrito principal */}
                    <AdsModal />
                    <Component {...pageProps} />
                  </main>
              </SessionProvider>
              <Toaster />
            </>
          </FooterWrapper>
        </LayoutWrapper>
      </ApolloProvider>
    </Provider>
  );
};

export default appWithTranslation(App);
