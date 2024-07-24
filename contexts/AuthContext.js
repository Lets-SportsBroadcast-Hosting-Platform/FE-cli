import React, { createContext, useState, useContext } from 'react';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [store, setStore] = useState(null);
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
    if(!!user){
      return user
    }
    const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'))
    return userInfo
  }

  const saveUserInfo = async (info)=>{
    let userInfo = {}
    if(!!user){
      userInfo = await getUserInfo();
    }
    await AsyncStorage.setItem('userInfo', JSON.stringify({...userInfo, ...info}))
    setUser({...userInfo, ...info})
  }
 

  const getStoreInfo = async ()=>{
    if(store === null){
      const stringifiedStoreInfo = await AsyncStorage.getItem('storeInfo')
      const storeInfo = JSON.parse(stringifiedStoreInfo)
      setStore(storeInfo)
      return storeInfo
    }
    return store
  }

  return (
    <AuthContext.Provider value={{ user, token, getUserToken, saveLogin, clearLogin, getStoreInfo, saveStoreInfo, getUserInfo, saveUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const 
useAuth = () => useContext(AuthContext);
