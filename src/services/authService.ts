import apiClient from '@/services/api';
import { baseURL } from '@/constants'

const endpointURL = `${baseURL}/auth`

export const register = async (username: string, password: string) => {
  return apiClient.post(`${endpointURL}/register`, { username, password });
};

export const login = async (username: string, password: string) => {
  return apiClient.post(`${endpointURL}/login`, { username, password });
};

export const refreshToken = async () => {
  return apiClient.post(
    `${endpointURL}/refresh-token`,
    {},
    { withCredentials: true }
  );
};
