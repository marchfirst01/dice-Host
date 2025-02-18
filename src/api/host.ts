import { GetAxiosInstance } from '@axios/axios.method';

export const fetchHostSpace = async () => {
  const res = await GetAxiosInstance('/host/space');
  return res.data;
};
