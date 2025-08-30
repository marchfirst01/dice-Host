import { GetAxiosInstance, PostAxiosInstance } from '@axios/axios.method';
import { ChatList, PaginationResponse } from '@type/chat';

export const fetchMessageHostList = async () => {
  const res = await GetAxiosInstance<ChatList[]>('/v1/message/host-list');
  return res.data;
};

export const fetchMessageRoomId = async (roomId: number) => {
  const res = await GetAxiosInstance<PaginationResponse>(`/v1/message/${roomId}`);
  return res.data;
};

export const fetchSendMessage = async (roomId: number, content: string) => {
  const type = 'string';
  const res = await PostAxiosInstance(`/v1/message/${roomId}`, { roomId, content, type });
  return res.data;
};
