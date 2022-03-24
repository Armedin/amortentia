import '../styles/globals.scss';
import '../styles/font.scss';
import type { AppProps } from 'next/app';
import Layout from '@components/common/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>

      <style jsx global>{`
        #__next {
          display: flex;
          flex: 1 1 100%;
        }
      `}</style>
    </>
  );
}

export default MyApp;
