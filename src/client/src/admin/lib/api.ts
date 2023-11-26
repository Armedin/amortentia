import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

let baseURL = process.env.API_URL || 'http://localhost:3000';
if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://amortentia.al';
}

const apiAxios = axios.create({
  baseURL,
  withCredentials: false,
});

// Interceptors

// request header
apiAxios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config && config.url && config.url.indexOf('/api') === -1) {
      config.url = `/api${config.url}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Parse response
 */
export function parseBody(response: AxiosResponse) {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    return Promise.reject(response.data);
  }
}

apiAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    return parseBody(response);
  },
  (error: AxiosError) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
);

export default apiAxios;
