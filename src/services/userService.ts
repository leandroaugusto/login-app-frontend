import apiClient from '@/services/api';
import { baseURL } from '@/constants'


export const listAllUsers = async () => {
  return apiClient.get(`${baseURL}/users`);
};
