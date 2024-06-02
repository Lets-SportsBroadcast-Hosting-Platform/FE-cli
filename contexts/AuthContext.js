import React, { createContext, useState, useContext } from 'react';
import Toast from 'react-native-toast-message';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const saveLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    Toast.show(({
      type: 'success',
      text1: '로그인 성공',
      text2: `안녕하세요 ${userData.name}님!👋`
    }))
  };

  const clearLogin = () => {
    setUser(null);
    setToken(null);
  };

  const getUserInfo = ()=>{
    return user
  }

  return (
    <AuthContext.Provider value={{ user, token, saveLogin, clearLogin, getUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const 
useAuth = () => useContext(AuthContext);
