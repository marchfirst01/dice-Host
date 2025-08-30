import { guestAxiosInstance } from './guest.axios.instance';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

// 기존 v1 함수들
export const GuestPostAxiosInstance = async <TResponse = unknown, TRequest = unknown>(
  url: string,
  data?: TRequest,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<TResponse>> => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await guestAxiosInstance.post<TResponse>(url, data, { ...config, headers });
  return response;
};

export const GuestGetAxiosInstance = async <T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const response = await guestAxiosInstance.get<T>(url, config);
  return response;
};
