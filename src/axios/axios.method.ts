import axiosInstance from '@axios/axios.instance';

import { AxiosRequestConfig, AxiosResponse } from 'axios';

export const PostAxiosInstance = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const response = await axiosInstance.post(url, data, config);
  return response;
};

export const GetAxiosInstance = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const response = await axiosInstance.get(url, config);
  return response;
};

export const PatchAxiosInstance = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const response = await axiosInstance.patch(url, data, config);
  return response;
};

export const DeleteAxiosInstance = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const response = await axiosInstance.delete(url, config);
  return response;
};

export const PutAxiosInstance = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const response = await axiosInstance.put(url, data, config);
  return response;
};
