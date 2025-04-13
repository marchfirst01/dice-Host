import { CommonPopUpData } from '@type/common';

export interface SpaceIdResponse extends CommonPopUpData {
  id: number;
  imageUrls: string[];
  size: number;
  pricePerDay: number;
  discountRate: number;
  latitude: number;
  longitude: number;
  city: string;
  district: string;
  address: string;
  detailAddress: string;
  likeCount: number;
  isActivated: boolean;
}
