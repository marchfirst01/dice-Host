import { ReservationStatus } from '@type/reservation';

import { create } from 'zustand';

export const useReservationStore = create<{
  reservationStatus: ReservationStatus;
  setReservationStatus: (status: ReservationStatus) => void;
  pendingCount: number;
  setPendingCount: (count: number) => void;
}>((set) => ({
  reservationStatus: 'PENDING',
  setReservationStatus: (status) => set({ reservationStatus: status }),
  pendingCount: 0,
  setPendingCount: (count: number) => set({ pendingCount: count }),
}));
