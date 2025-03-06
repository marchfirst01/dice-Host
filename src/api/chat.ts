import { GetAxiosInstance } from '@axios/axios.method';
import { ChatList, PaginationResponse } from '@type/chat';

export const fetchMessageHostList = async () => {
  const res = await GetAxiosInstance<ChatList[]>('/message/host-list');
  return res.data;
};

export const fetchMessageRoomId = async (roomId: number) => {
  const res = await GetAxiosInstance<PaginationResponse>(`message/${roomId}`);
  return res.data;
};
