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

    if (!accessToken) {
      throw new Error('토큰 없음');
    }

    config.headers['Authorization'] = `Bearer ${accessToken}`;

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

    // TODO: 토큰 만료시 재발급 처리

    return Promise.reject(error);
  },
);

export default axiosInstance;
