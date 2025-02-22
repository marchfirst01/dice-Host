import { CommonPopUpData } from '@type/common';

export interface SpaceIdResponse extends CommonPopUpData {
  id: number;
  imageUrls: string[];
  pricePerDay: string;
  latitude: number;
  longitude: number;
  city: string;
  district: string;
  address: string;
  likeCount: number;
}
