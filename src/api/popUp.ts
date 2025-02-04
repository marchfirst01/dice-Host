import { GuestGetAxiosInstance } from '@axios/guest.axios.method';
import { SpaceIdResponse, SpaceLatestResponse } from '@type/popUp/popUpResponse';

// getServerSideProps로 실행
export const fetchSpaceLatest = async (): Promise<SpaceLatestResponse> => {
  const res = await GuestGetAxiosInstance(`/space/latest?page=0&size=10`);
  console.log('fetch space latest', res);
  if (res.status !== 200) throw new Error('Failed to fetch posts');
  return res.data;
};

export const fetchSpaceId = async (id: string): Promise<SpaceIdResponse> => {
  const res = await GuestGetAxiosInstance(`/space/${id}`);
  if (res.status !== 200) throw new Error('Failed to fetch posts');
  return res.data;
};
