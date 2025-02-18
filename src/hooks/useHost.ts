import { useQuery } from '@tanstack/react-query';
import { HostSpaceData } from '@type/my';

import { fetchHostSpace } from 'src/api/host';

export const useHostSpace = () => {
  return useQuery<HostSpaceData[]>({
    queryKey: ['hostSpace'],
    queryFn: () => fetchHostSpace(),
    initialData: [],
    staleTime: 0,
  });
};
