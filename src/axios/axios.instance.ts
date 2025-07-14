import {
  deleteToken,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@utils/token';

import { GuestPostAxiosInstance } from './guest.axios.method';
import axios, { AxiosInstance } from 'axios';
import Router from 'next/router';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  // withCredentials: true,
});

const axiosInstanceV2: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_V2,
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
  (error: Error) => {
    return Promise.reject(error);
  },
);

axiosInstanceV2.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      throw new Error('토큰 없음');
    }

    config.headers['Authorization'] = `Bearer ${accessToken}`;

    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  },
);

// 기존 코드에 추가
axiosInstanceV2.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 403 에러 발생 시 토큰 재발급 처리
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await refreshTokenRequest();
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return axiosInstanceV2(originalRequest); // V2 인스턴스로 재시도
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    // 토큰 만료나 잘못된 토큰일 때 로그아웃 처리
    if (error.response?.data?.code === 'AUTH_001') {
      console.log('잘못된 토큰');
      deleteToken();
    }

    return Promise.reject(error);
  },
);

const refreshTokenRequest = async () => {
  try {
    const refreshToken = await getRefreshToken();
    const { data } = await GuestPostAxiosInstance('/auth/reissue', {
      refreshToken: refreshToken,
    });
    await setAccessToken(data.accessToken);
    await setRefreshToken(data.refreshToken);
    return data;
  } catch (error) {
    console.log(error);
    deleteToken();
    alert('로그인을 다시 해주세요');
    Router.push('/');
  }
};

// 토큰 관련 에러 처리
axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    // 403 에러 발생 시 토큰 재발급 처리
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지

      try {
        const { data } = await refreshTokenRequest();
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest); // 기존 요청 재시도
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    // 토큰 만료나 잘못된 토큰일 때 로그아웃 처리
    if (error.response?.data?.code === 'AUTH_001') {
      console.log('잘못된 토큰');
      deleteToken();
    }

    return Promise.reject(error);
  },
);

export { axiosInstance, axiosInstanceV2 };
