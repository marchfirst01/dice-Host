import { useQuery } from '@tanstack/react-query';
import { SpaceLatestResponse } from '@type/popUp/popUpResponse';

import { fetchSpaceLatest } from 'src/api/popUp';

export const useSpaceLatest = () => {
  return useQuery<SpaceLatestResponse>({
    queryKey: ['spaceLatest'],
    queryFn: fetchSpaceLatest,
    refetchOnWindowFocus: true,
  });
};
