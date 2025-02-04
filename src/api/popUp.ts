import { GetAxiosInstance } from '@axios/axios.method';
import { GuestGetAxiosInstance } from '@axios/guest.axios.method';
import { SpaceIdResponse, SpaceLatestResponse } from '@type/popUp/popUpResponse';

export const fetchSpaceLatest = async (): Promise<SpaceLatestResponse> => {
  const res = await GetAxiosInstance(`/space/latest?page=0&size=10`);
  if (res.status !== 200) throw new Error('Failed to fetch posts');
  return res.data;
};

// getServerSideProps로 실행
export const fetchSpaceId = async (id: string): Promise<SpaceIdResponse> => {
  console.log('fetchSpaceId, ', id);
  const res = await GuestGetAxiosInstance(`/space/${id}`);
  if (res.status !== 200) throw new Error('Failed to fetch posts');
  return res.data;
};
