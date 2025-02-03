import { deleteToken, getAccessToken } from '@utils/token';

import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  // withCredentials: true,
});

// JWT 토큰 기반 API 요청
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();

    // 토큰이 있을 때만 추가
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

// 토큰 관련 에러 처리
axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },

  async (error) => {
    // 토큰 만료나 잘못된 토큰일 때 로그아웃 처리
    if (error.response?.data?.code === 'AUTH_001') {
      console.log('잘못된 토큰');
      deleteToken();
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
