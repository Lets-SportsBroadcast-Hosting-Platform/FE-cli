import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ApiUtil = axios.create({
    timeout: 10000, // 타임아웃 시간 설정 (ms)
})

// 요청 전에 실행될 작업
ApiUtil.interceptors.request.use(
    async (config) => {
      // 예: 인증 토큰 추가
      // config.headers.Authorization = `Bearer ${accessToken}`;
      // if(config.headers.accesstoken === undefined){
      //   const jwtToken = await AsyncStorage.getItem('jwtToken')
      //   config.headers.accesstoken = jwtToken
      // }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
// 응답을 받은 후 실행될 작업
ApiUtil.interceptors.response.use(
(response) => {
    return response.data; // 응답의 데이터만 반환
},
(error) => {
    return Promise.reject(error);
}
);

export default ApiUtil;