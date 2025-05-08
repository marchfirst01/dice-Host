import { useQuery } from '@tanstack/react-query';
import { transformResponseToFormData } from '@utils/spaceTransform';

import { fetchSpaceId } from 'src/api/space';

export const useSpaceId = (id: string) => {
  return useQuery({
    queryKey: ['spaceId', id],
    queryFn: async () => {
      // id 공간의 정보를 조회하는 space/view에서는 SSR로 데이터 불러와서 해당 훅 사용x
      // 따라서 id가 없는 경우에는 그냥 null 반환
      if (!id) return null;
      const response = await fetchSpaceId(id);
      return transformResponseToFormData(response);
    },
    enabled: !!id,
  });
};
