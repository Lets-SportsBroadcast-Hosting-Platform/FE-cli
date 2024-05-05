import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const saveLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    console.log(`안녕하세요 ${userData.name}님!`)
  };

  const clearLogin = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, saveLogin, clearLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
