import { AuthCredentials } from '@admin/interfaces/auth';
import apiAxios from '@admin/lib/api';

const login = (data: any) => {
  return apiAxios.post<AuthCredentials, any>('/auth/login', data);
};

const register = (data: any) => {
  return apiAxios.post('/users/register', data);
};

export const authService = {
  login,
  register,
};
