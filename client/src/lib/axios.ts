import Axios from 'axios';
import storage from '../utils/storage';

export const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axios.interceptors.request.use((config) => {
  const token = storage.getItem('token');

  if (token && config?.headers) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});
