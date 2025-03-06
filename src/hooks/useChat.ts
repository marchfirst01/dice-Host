import { useQuery } from '@tanstack/react-query';

import { fetchMessageHostList } from 'src/api/chat';

export const useMessageHostList = () => {
  return useQuery({
    queryKey: ['message/host-list'],
    queryFn: () => fetchMessageHostList(),
  });
};
