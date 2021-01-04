import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const baseAPI = axios.create({
  baseURL: API_URL,
});

// baseAPI.defaults.headers.common['Authorization'] = AUTH_TOKEN;

baseAPI.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error('✉️ ', error);
    return Promise.reject(error);
  }
);

export default baseAPI;
