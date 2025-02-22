import { CommonPopUpData } from '@type/common';

export interface PopUpRegisterResponse extends CommonPopUpData {
  pricePerDay: number;
  imageUrls: string[];
  latitude: number;
  longitude: number;
  city: string;
  district: string;
  address: string;
}
