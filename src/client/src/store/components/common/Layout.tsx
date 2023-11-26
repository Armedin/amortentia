import styled from '@emotion/styled';
import Footer from './Footer';
import Header from './Header';
import Topbar from './Topbar';

interface LayoutProps {
  children?: React.ReactNode;
  pageProps?: any;
}

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  webkitBoxPack: 'center',
  justifyContent: 'center',
});

const PageBody = styled('div')({
  flex: '1 1 100%',
  minWidth: 0,
  paddingTop: '90px',
});

const Layout = ({ children, pageProps }: LayoutProps) => {
  return (
    <Container>
      <Header />
      <PageBody>{children}</PageBody>
      <Footer />
    </Container>
  );
};

export default Layout;
