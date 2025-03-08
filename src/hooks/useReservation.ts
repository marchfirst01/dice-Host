import { useQuery } from '@tanstack/react-query';

import { fetchReservationList } from 'src/api/reservation';

export const useReservationList = (status: string) => {
  return useQuery({
    queryKey: ['reservationList'],
    queryFn: () => fetchReservationList(status),
  });
};
