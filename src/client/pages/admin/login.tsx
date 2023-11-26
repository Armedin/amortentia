import { Button } from '@admin/components/base';
import { authService } from '@admin/services';
import {
  getAuthCredentials,
  isAuthenticated,
  setAuthCredentials,
} from '@admin/utils/auth';
import { Box, FormContainer, Input, Typography, useSnackbar } from '@kukui/ui';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import authBg from '@admin/assets/images/auth-bg.png';

const LoginPage = () => {
  const [openSnackbar] = useSnackbar();
  const { token } = getAuthCredentials();
  const router = useRouter();

  if (isAuthenticated({ token })) {
    router.replace('/');
  }

  const handleSubmit = (data: any) => {
    authService
      .login(data)
      .then(res => {
        if (res.accessToken) {
          setAuthCredentials(res);
          router.push('/');
        } else {
          openSnackbar('Error! Please try again');
        }
      })
      .catch(e => openSnackbar('Incorrect credentials'));
  };

  return (
    <Box
      sx={{
        width: '100%',
        background: '#fff',
      }}
    >
      <FormContainer
        defaultValues={{ email: '', password: '' }}
        onSuccess={handleSubmit}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            minHeight: '100vh',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box sx={{ width: '100%', maxWidth: '480px' }}>
              <Typography
                variant="h1"
                sx={{ fontSize: '2rem', fontWeight: 800 }}
              >
                Admin Login
              </Typography>
              <Box sx={{ padding: '1.5rem 0' }}>
                <Box sx={{ marginBottom: '1.5rem' }}>
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                  />
                </Box>
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                />
              </Box>
              <Button color="primary" size="large" type="submit" fullWidth>
                Login
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundImage: `url(${authBg.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'left center',
            }}
          ></Box>
        </Box>
      </FormContainer>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { token } = getAuthCredentials(ctx);

  if (isAuthenticated({ token })) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: {} };
};

LoginPage.Layout = null;

LoginPage.auth = {
  public: true,
};

export default LoginPage;
