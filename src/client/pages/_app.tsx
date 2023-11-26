import '@store/styles/font.scss';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
import DefaultAdminLayout from '@admin/components/common/layout/Layout';
import StoreLayout from '@store/components/common/Layout';
import { useDarkMode } from '@admin/hooks';
import { GlobalStyles as KukuiGlobalStyles, SnackbarProvider } from '@kukui/ui';
import AdminGlobalStyles from '@admin/styles/global';
import StoreGlobalStyles from '@store/styles/global';
import PrivateRoute from '@admin/components/PrivateRoute';
import { useRouter } from 'next/router';
import Basket from '@store/components/basket/Basket';
import Head from 'next/head';
import { CartProvider } from '@store/context/CartContext';
import { CheckoutProvider } from '@store/context/CheckoutContext';

const Noop: React.FC = ({ children }) => <>{children}</>;

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const isAdminPath = pathname.includes('/admin');

  useDarkMode();

  if (!isAdminPath) {
    return (
      <SnackbarProvider>
        <CartProvider>
          <CheckoutProvider>
            <Head>
              <title>Amortentia</title>
            </Head>
            <Basket />
            <StoreLayout>
              <Component {...pageProps} />
            </StoreLayout>
            <KukuiGlobalStyles />
            <style jsx global>{`
              #__next {
                display: flex;
                flex: 1 1 100%;
              }
            `}</style>

            <style jsx global>
              {StoreGlobalStyles}
            </style>
          </CheckoutProvider>
        </CartProvider>
      </SnackbarProvider>
    );
  }

  const ComponentLayout = (Component as any).Layout;
  let Layout: any = Noop;
  if (ComponentLayout === undefined) {
    Layout = DefaultAdminLayout;
  } else if (ComponentLayout === null) {
    Layout = Noop;
  }

  const authProps = (Component as any).auth;

  return (
    <SnackbarProvider>
      {authProps && authProps.public ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <PrivateRoute>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PrivateRoute>
      )}

      <KukuiGlobalStyles />
      <style jsx global>{`
        #__next {
          display: flex;
          flex: 1 1 100%;
        }
      `}</style>
      <style jsx global>
        {AdminGlobalStyles}
      </style>
    </SnackbarProvider>
  );
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
