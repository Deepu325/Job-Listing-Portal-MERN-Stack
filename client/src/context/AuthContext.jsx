import React, { createContext, useState, useEffect } from 'react';
import { getToken, removeToken, setToken } from '../utils/AuthHelpers';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => !!getToken());
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (token, userData) => {
    setToken(token);
    setIsAuth(true);
    if (userData) {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };

  const logout = () => {
    removeToken();
    setIsAuth(false);
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;