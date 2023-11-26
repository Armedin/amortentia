import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuthCredentials } from '@admin/utils/auth';
import { ADMIN_ROUTES } from '@admin/utils/routes';

const PrivateRoute: FC = ({ children }) => {
  const router = useRouter();
  const { token } = getAuthCredentials();
  const isUser = !!token;

  useEffect(() => {
    if (!isUser) router.replace(ADMIN_ROUTES.LOGIN);
  }, [isUser]);

  if (isUser) {
    return <>{children}</>;
  }
  // if (isUser && !hasPermission) {
  //   return <AccessDeniedPage />;
  // }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading</div>;
};

export default PrivateRoute;
