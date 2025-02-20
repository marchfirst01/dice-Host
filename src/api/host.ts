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

export const fetchPasswordUpdate = async (passwordUpdate: {
  password: string;
  newPassword: string;
}) => {
  try {
    const res = await PostAxiosInstance('auth/password-update', passwordUpdate);
    if (res.status === 200) return res.status;
  } catch (error) {
    throw new Error('failed to fetch update password');
  }
};
