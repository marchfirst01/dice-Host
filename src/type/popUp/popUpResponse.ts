import { CommonPopUpData } from '@type/common';

export interface SpaceIdResponse extends CommonPopUpData {
  id: number;
  imageUrls: string[];
  size: number;
  pricePerDay: string;
  discountRate: number;
  latitude: number;
  longitude: number;
  city: string;
  district: string;
  address: string;
  likeCount: number;
}
