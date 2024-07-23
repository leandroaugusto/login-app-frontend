import axios from 'axios';

import { getAuthToken, setAuthToken, removeAuthToken } from '@/storage/tokenStorage';
import { baseURL } from '@/constants'
import { refreshToken } from '@/services/authService'

const apiClient = axios.create({
  baseURL,
  withCredentials: true // Permitir envio de cookies com cada requisição
});

const token = getAuthToken();

apiClient.interceptors.request.use(
  config => {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const errorMessage = error.response.data || error.message || error

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await refreshToken();
        const newToken = response.data.token;

        setAuthToken(newToken);

        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        // originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

        return apiClient(originalRequest);
      } catch (error) {
        removeAuthToken();

        window.location.href = '/login';

        return Promise.reject(error);
      }
    }

    return Promise.reject(errorMessage);
  }
);

export default apiClient;
