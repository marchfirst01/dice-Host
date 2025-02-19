import { GetAxiosInstance } from '@axios/axios.method';

export const fetchHostSpace = async () => {
  const res = await GetAxiosInstance('/host/space');
  return res.data;
};

export const fetchHostInfo = async () => {
  const res = await GetAxiosInstance('/host/info');
  return res.data;
};
