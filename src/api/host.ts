import { GetAxiosInstance, PostAxiosInstance } from '@axios/axios.method';
import { HostInfo } from '@type/my';

export const fetchHostSpace = async () => {
  const res = await GetAxiosInstance('/host/space');
  return res.data;
};

export const fetchHostInfo = async () => {
  const res = await GetAxiosInstance('/host/info');
  return res.data;
};

export const fetchHostUpdate = async (hostUpdate: HostInfo) => {
  try {
    const res = await PostAxiosInstance('/host/update', hostUpdate);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
