import { axiosInstance } from '@axios/axios.instance';

import { AxiosRequestConfig, AxiosResponse } from 'axios';

// 제네릭 타입을 사용하여 데이터를 타입 안전하게 처리
export const PostAxiosInstance = async <T, R = T>(
  url: string,
  data?: T, // 여기서 T를 사용합니다.
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<R>> => {
  // 반환 타입에 R를 사용합니다.
  const response = await axiosInstance.post<R>(url, data, config);
  return response;
};

export const GetAxiosInstance = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  // 반환 타입에 T를 사용합니다.
  const response = await axiosInstance.get<T>(url, config);
  return response;
};

export const PatchAxiosInstance = async <T>(
  url: string,
  data?: T, // 여기서 T를 사용합니다.
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  // 반환 타입에 T를 사용합니다.
  const response = await axiosInstance.patch<T>(url, data, config);
  return response;
};

export const DeleteAxiosInstance = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  // 반환 타입에 T를 사용합니다.
  const response = await axiosInstance.delete<T>(url, config);
  return response;
};

export const PutAxiosInstance = async <T>(
  url: string,
  data?: T, // 여기서 T를 사용합니다.
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  // 반환 타입에 T를 사용합니다.
  const response = await axiosInstance.put<T>(url, data, config);
  return response;
};
