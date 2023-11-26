import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Urbanist%3A400%2C400i%2C400%2C500i%2C500%2C600i%2C600%2C700i%2C700&#038;subset=latin%2Clatin-ext&#038;ver=5.9.3"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
