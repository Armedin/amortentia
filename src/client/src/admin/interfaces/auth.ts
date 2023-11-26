interface AuthUser {
  email: string;
  password: string;
}

export interface AuthCredentials {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}
