import React, { createContext, useState, useContext } from 'react';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [store, setStore] = useState(null);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const saveLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    Toast.show(({
      type: 'success',
      text1: '로그인 성공',
      text2: `안녕하세요 ${userData.name}님!👋`
    }))
  };

  const getUserToken = async ()=>{
    if(token === null){
      const storageToken = await AsyncStorage.getItem('jwtToken')
      setUser('storageToken', storageToken)
      console.log(storageToken)
      return storageToken
    }
    console.log('token', token)
    return token
  }

  const saveStoreInfo = async (storeInfo) => {
    setStore(storeInfo)
    AsyncStorage.setItem('storeInfo', JSON.stringify(storeInfo))
  }

  const clearLogin = () => {
    setUser(null);
    setToken(null);
  };

  const getUserInfo = async ()=>{
    if(user === null){
      const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'))
      setUser(userInfo)
      return userInfo
    }
    return user
  }

  const getStoreInfo = async ()=>{
    if(store === null){
      const storeInfo = JSON.parse(await AsyncStorage.getItem('storeInfo'))
      setStore(storeInfo)
      return storeInfo
    }
    return store
  }

  return (
    <AuthContext.Provider value={{ user, token, getUserToken, saveLogin, clearLogin, getStoreInfo, saveStoreInfo, getUserInfo, isAdmin, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const 
useAuth = () => useContext(AuthContext);
