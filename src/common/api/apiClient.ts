import axios from 'axios';
import { store } from '@/store/store';

const getToken = (): string => {
  const state = store.getState();
  const token = state.auth.access_token;
  return token;
};

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
