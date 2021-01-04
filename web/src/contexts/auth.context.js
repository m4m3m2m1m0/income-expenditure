import React, { createContext, useState, useCallback, useEffect } from 'react';
import jwt from 'jwt-decode';

import {
  getTokenObjectToSave,
  isExpired,
} from '../shared/helpers/auth-token.helper';
import useLocalStorage from '../shared/hooks/use-local-storage.hook';
import { AUTH_TOKEN, REFRESH_TOKEN } from '../shared/const/local-storage.const';

export const AuthContext = createContext({
  isAuth: false,
  payload: null,
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState({});
  const [token, setToken, removeToken] = useLocalStorage(AUTH_TOKEN, null);
  const [refreshToken, setRefreshToken, removeRefreshToken] = useLocalStorage(
    REFRESH_TOKEN,
    null
  );

  const setAuthentication = useCallback((token) => {
    const payload = jwt(token.token);
    setPayload(payload);
    setIsAuthenticated(true);
  }, []);

  const logoutHandler = useCallback(() => {
    setIsAuthenticated(false);
    removeToken();
    removeRefreshToken();
  }, [setIsAuthenticated, removeToken, removeRefreshToken]);

  useEffect(() => {
    if (token && token.token && !isExpired(refreshToken)) {
      setAuthentication(token);
    } else {
      logoutHandler();
    }
  }, [token, refreshToken, setAuthentication, logoutHandler]);

  const loginHandler = useCallback(
    (token) => {
      setAuthentication(token);
      setToken(getTokenObjectToSave(token.token));
      setRefreshToken(getTokenObjectToSave(token.refreshToken));
    },
    [setAuthentication, setToken, setRefreshToken]
  );

  return (
    <AuthContext.Provider
      value={{
        login: loginHandler,
        logout: logoutHandler,
        isAuth: isAuthenticated,
        payload: payload,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
