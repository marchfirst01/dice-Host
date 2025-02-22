import { GuestGetAxiosInstance } from '@axios/guest.axios.method';
import { SpaceIdResponse } from '@type/popUp/popUpResponse';

// getServerSideProps로 실행
export const fetchSpaceId = async (id: string): Promise<SpaceIdResponse> => {
  const res = await GuestGetAxiosInstance(`/space/${id}`);
  if (res.status !== 200) throw new Error('Failed to fetch posts');
  return res.data;
};
