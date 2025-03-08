import { GetAxiosInstance, PostAxiosInstance } from '@axios/axios.method';
import { ReservationResponse } from '@type/reservation';

export const fetchReservationList = async (status: string) => {
  console.log(status);
  const res = await GetAxiosInstance<ReservationResponse>(
    `/reservation/host-list?status=${status}`,
  );
  return res.data;
};

export const fetchReservationAccept = async (reservationId: number) => {
  const res = await PostAxiosInstance(`reservation/accept?reservationId=${reservationId}`);
  if (res.status === 200) return true;
};

export const fetchReservationDecline = async (reservationId: number) => {
  const res = await PostAxiosInstance(`reservation/decline?reservationId=${reservationId}`);
  if (res.status === 200) return true;
};
