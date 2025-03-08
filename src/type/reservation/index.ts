// TODO: 삭제할 타입
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
  reservationTime: string;
  startDate: string;
  endDate: string;
}

export type ReservationStatus = 'PENDING' | 'ACCEPT' | 'DECLINE' | 'CANCEL';

export type Reservation = {
  reservationId: number;
  spaceName: string;
  startDate: string; // ISO 날짜 문자열
  endDate: string; // ISO 날짜 문자열
  message: string;
  status: ReservationStatus;
  city: string;
  district: string;
  capacity: number;
  size: number;
  totalPrice: number;
  spaceImage: string;
};

type Sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

type Pageable = {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

export type ReservationResponse = {
  content: Reservation[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};
