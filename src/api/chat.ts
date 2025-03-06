import { GetAxiosInstance } from '@axios/axios.method';
import { ChatList } from '@type/chat';

export const fetchMessageHostList = async () => {
  const data = GetAxiosInstance<ChatList[]>('/message/host-list');
  return data;
};
