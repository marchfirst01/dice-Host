import { GetAxiosInstance, PostAxiosInstance } from '@axios/axios.method';
import { HostInfoForm, HostSpaceData } from '@type/my';

export const fetchHostSpace = async (): Promise<HostSpaceData[]> => {
  const res = await GetAxiosInstance<HostSpaceData[]>('/v1/host/space');
  return res.data;
};

export const fetchHostInfo = async () => {
  const res = await GetAxiosInstance<HostInfoForm>('/v1/host/info');
  return res.data;
};

export const fetchHostUpdate = async (hostUpdate: HostInfoForm) => {
  try {
    const res = await PostAxiosInstance('/v1/host/update', hostUpdate);
    if (res.status === 200) return true;
  } catch (error) {
    console.log(error);
    throw new Error('failed to fetch update host info');
  }
};

export const fetchPasswordUpdate = async (passwordUpdate: {
  password: string;
  newPassword: string;
}) => {
  try {
    const res = await PostAxiosInstance('/v1/auth/password-update', passwordUpdate);
    if (res.status === 200) return res.status;
  } catch (error) {
    console.log(error);
    throw new Error('failed to fetch update password');
  }
};

export const fetchWithDraw = async (reason: string) => {
  console.log(reason);
  const res = await PostAxiosInstance('/v1/auth/withdraw');
  return res.status;
};
