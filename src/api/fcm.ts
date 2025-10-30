import { PostAxiosInstance } from '@axios/axios.method';

export const fetchFCMCurrentToken = async (fcmToken: string) => {
  const res = await PostAxiosInstance(`/v1/fcm/token`, { fcmToken });
  return res.data;
};
