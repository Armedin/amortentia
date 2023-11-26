import { AuthCredentials } from '@admin/interfaces/auth';
import Cookie from 'js-cookie';
import SSRCookie from 'cookie';

export const setAuthCredentials = (authCredentials: AuthCredentials) => {
  Cookie.set(
    'AUTH_CRED',
    JSON.stringify({
      token: authCredentials.accessToken,
      user: authCredentials.user,
    })
  );
};

export const getAuthCredentials = (context?: any) => {
  const authCred = context
    ? parseSSRCookie(context)['AUTH_CRED']
    : Cookie.get('AUTH_CRED');
  if (authCred) {
    return JSON.parse(authCred);
  }
  return { token: null, user: null };
};

export function parseSSRCookie(context: any) {
  return SSRCookie.parse(context.req.headers.cookie ?? '');
}

export function isAuthenticated(_cookies: any) {
  return !!_cookies['token'];
}
