import { useMutation, useQuery } from '@tanstack/react-query';

import { fetchMessageHostList, fetchMessageRoomId, fetchSendMessage } from 'src/api/chat';

export const useMessageHostList = () => {
  return useQuery({
    queryKey: ['message/host-list'],
    queryFn: () => fetchMessageHostList(),
  });
};

export const useMessageRoomId = (roomId: number) => {
  return useQuery({
    queryKey: ['message/roomId', roomId],
    queryFn: () => fetchMessageRoomId(roomId),
  });
};

export const useSendMessage = () => {
  return useMutation({
    mutationFn: ({ roomId, content }: { roomId: number; content: string }) =>
      fetchSendMessage(roomId, content),
  });
};
