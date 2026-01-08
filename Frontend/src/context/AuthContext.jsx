import React, { createContext, useState, useEffect } from 'react';
import { getToken, removeToken, setToken } from '../utils/AuthHelpers';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => !!getToken());

  const login = (token) => {
    setToken(token);
    setIsAuth(true);
  };

  const logout = () => {
    removeToken();
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;