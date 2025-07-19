import { guestAxiosInstance, guestAxiosInstanceV2 } from './guest.axios.instance';
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

// 새로운 v2 함수들 - v1과 동일한 패턴으로 수정
export const GuestPostAxiosInstanceV2 = async <TResponse = unknown, TRequest = unknown>(
  url: string,
  data?: TRequest,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<TResponse>> => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await guestAxiosInstanceV2.post<TResponse>(url, data, { ...config, headers });
  return response;
};

export const GuestGetAxiosInstanceV2 = async <T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const response = await guestAxiosInstanceV2.get<T>(url, config);
  return response;
};
