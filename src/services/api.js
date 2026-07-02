import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Production Interceptor Configuration for Error Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      message: error.response?.data || 'Something went wrong across network layers',
      status: error.response?.status || 500,
    };
    return Promise.reject(customError);
  }
);

export default api;