import { CommonSpaceData } from '@type/common';

export interface SpaceFormData extends CommonSpaceData {
  imageList: (File | string)[];
  size: number;
  pricePerDay: number;
  discountRate: number;
  city: string;
  district: string;
  address: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
}
