import { GetAxiosInstance } from '@axios/axios.method';
import { ReservationResponse } from '@type/reservation';

export const fetchReservationList = async (status: string) => {
  const res = await GetAxiosInstance<ReservationResponse>(
    `/reservation/host-list?status=${status}`,
  );
  return res.data;
};
