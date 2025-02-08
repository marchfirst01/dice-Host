export interface ReservationItem {
  id: number;
  status: ReservationStatus;
  imageUrl: string;
  brandName: string;
  cityName: string;
  name: string;
  neighborhoodName: string;
  area: number;
  capacity: number;
  date: number;
  totalPrice: number;
  reservationDate: string;
  reservationoTime: string;
  startDate: string;
  endDate: string;
}

export type ReservationStatus = 'pending' | 'confirmed' | 'cancled';
