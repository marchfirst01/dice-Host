import { GetAxiosInstance } from '@axios/axios.method';
import { SpaceLatestResponse } from '@type/popUp/popUpResponse';

export const fetchSpaceLatest = async (): Promise<SpaceLatestResponse> => {
  const res = await GetAxiosInstance(`/space/latest?page=0&size=10`);
  if (res.status !== 200) throw new Error('Failed to fetch posts');
  return res.data;
};
