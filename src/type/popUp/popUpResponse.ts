import { StoreData } from '.';

export interface SpaceLatestResponse {
  content: StoreData[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: Sort;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface SpaceIdResponse {
  id: number;
  name: string;
  description: string;
  imageUrls: string[];
  category: string;
  openingTime: string;
  closingTime: string;
  capacity: number;
  tags: string[];
  pricePerDay: number;
  discountRate: number;
  details: string;
  latitude: number;
  longitude: number;
  city: string;
  district: string;
  address: string;
  websiteUrl: string;
  contactNumber: string;
  facilityInfo: string;
  notice: string;
  likeCount: number;
}
