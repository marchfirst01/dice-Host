/* eslint-disable @typescript-eslint/no-unused-vars */
import guestAxiosInstance from './guest.axios.instance';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

// getServerSideProps, 회원가입, 로그인에서만 사용할 axios method

export const GuestPostAxiosInstance = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await guestAxiosInstance.post<T>(url, data, { ...config, headers });
  return response;
};

export const GuestGetAxiosInstance = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const response = await guestAxiosInstance.get(url, config);
  return response;
};
