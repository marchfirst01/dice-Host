import { useQuery } from '@tanstack/react-query';

import { fetchSpaceId } from 'src/api/popUp';

export const usePopUpId = (id: string) => {
  return useQuery({
    queryKey: ['popUp', id],
    queryFn: () => fetchSpaceId(id),
    select: (data) => ({
      name: data.name,
      description: data.description,
      imageList: data.imageUrls,
      category: data.category,
      // openingTime:
      // closingTime:
      capacity: data.capacity,
      tags: data.tags,
      pricePerDay: data.pricePerDay,
      discountRate: String(data.discountRate),
      details: data.details,
      // 좌표 변환 필요
      latitude: data.latitude,
      longitude: data.longitude,
      address: data.address,
      websiteUrl: data.websiteUrl,
      contactNumber: data.contactNumber,
      facilityInfo: data.facilityInfo,
      notice: data.notice,
    }),
  });
};
