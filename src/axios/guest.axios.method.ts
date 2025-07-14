import { guestAxiosInstance, guestAxiosInstanceV2 } from './guest.axios.instance';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

// 기존 v1 함수들
export const GuestPostAxiosInstance = async <T>(
  url: string,
  data?: T,
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

// 새로운 v2 함수들
export const GuestPostAxiosInstanceV2 = async <T>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await guestAxiosInstanceV2.post<T>(url, data, { ...config, headers });
  return response;
};

export const GuestGetAxiosInstanceV2 = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const response = await guestAxiosInstanceV2.get(url, config);
  return response;
};
