import { AUTH_TOKEN, REFRESH_TOKEN } from '../const/local-storage.const';
import { isExpired } from '../helpers/auth-token.helper';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const refreshAPI = axios.create({
  baseURL: API_URL,
});

const getToken = async () => {
  const token = JSON.parse(localStorage.getItem(AUTH_TOKEN) ?? 'null');
  const refreshToken = JSON.parse(
    localStorage.getItem(REFRESH_TOKEN) ?? 'null'
  );

  if (!token && !refreshToken) {
    return null;
  }

  if (isExpired(token) && !isExpired(refreshToken)) {
    try {
      const res = await refreshAPI.post('/auth/refreshToken', {
        refreshToken: refreshToken.token,
      });

      localStorage.setItem(AUTH_TOKEN, JSON.stringify(res.data.token));

      localStorage.setItem(
        REFRESH_TOKEN,
        JSON.stringify(res.data.refreshToken)
      );

      return res.data.token;
    } catch (e) {
      return null;
    }
  } else {
    return null;
  }
};

export default getToken;
