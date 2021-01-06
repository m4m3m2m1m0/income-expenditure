import { useCallback, useContext, useEffect } from 'react';
import axios from 'axios';
import { isExpired } from '../helpers/auth-token.helper';

const API_URL = 'http://192.168.1.154:5000'; //process.env.REACT_APP_API_URL;

const refreshAPI = axios.create({
  baseURL: API_URL,
});

export const baseAPI = axios.create({
  baseURL: API_URL,
});

let tokenInterceptorRef = null;

const ApiClient = (props) => {
  const authContext = useContext(props.authContext);

  const tokenInterceptor = useCallback(
    async (config) => {
      let token = authContext.token;
      const refreshToken = authContext.refreshToken;

      if (isExpired(token) && isExpired(refreshToken)) {
        authContext.logout();
      }

      if (
        token &&
        refreshToken &&
        isExpired(token) &&
        !isExpired(refreshToken)
      ) {
        try {
          const res = await refreshAPI.post('/auth/refreshToken', {
            refreshToken: refreshToken.token,
          });

          token = authContext.setToken(res.data.token);
          authContext.setRefreshToken(res.data.refreshToken);
        } catch (e) {
          authContext.logout();
        }
      }

      if (token) {
        config.headers.Authorization = `bearer ${token.token}`;
      }

      return config;
    },
    [authContext]
  );

  useEffect(() => {
    if (tokenInterceptorRef !== null) {
      baseAPI.interceptors.request.eject(tokenInterceptorRef);
    }

    tokenInterceptorRef = baseAPI.interceptors.request.use(
      tokenInterceptor,
      (error) => {
        console.error('✉️ ', error);
        return Promise.reject(error);
      }
    );

    return () => {
      if (tokenInterceptorRef !== null) {
        baseAPI.interceptors.request.eject(tokenInterceptorRef);
      }
    };
  }, [tokenInterceptor]);

  return { ...props.children };
};

export default ApiClient;
