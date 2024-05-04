import axios from 'axios';

const ApiUtil = axios.create({
    baseURL: "http://43.202.194.172/",
    timeout: 10000, // 타임아웃 시간 설정 (ms)
})

// 요청 전에 실행될 작업
api.interceptors.request.use(
    (config) => {
      // 예: 인증 토큰 추가
      // config.headers.Authorization = `Bearer ${accessToken}`;
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
// 응답을 받은 후 실행될 작업
api.interceptors.response.use(
(response) => {
    return response.data; // 응답의 데이터만 반환
},
(error) => {
    return Promise.reject(error);
}
);

export default ApiUtil;