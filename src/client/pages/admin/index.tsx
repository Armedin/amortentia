import { getAuthCredentials, isAuthenticated } from '@admin/utils/auth';
import { ADMIN_ROUTES } from '@admin/utils/routes';
import { GetServerSideProps } from 'next';

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { token } = getAuthCredentials(ctx);

  if (!isAuthenticated({ token })) {
    return {
      redirect: {
        destination: ADMIN_ROUTES.LOGIN,
        permanent: false,
      },
    };
  }
  return { props: {} };
};

export default Dashboard;
