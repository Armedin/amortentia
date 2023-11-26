const getApiUrl = () => {
  let baseURL = process.env.API_URL || 'http://localhost:3000/api';
  if (process.env.NODE_ENV === 'production') {
    baseURL = 'https://amortentia.al/api';
  }

  return baseURL;
};

export default getApiUrl;
