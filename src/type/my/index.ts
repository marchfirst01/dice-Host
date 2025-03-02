import { CommonConfig } from '@type/common';

export interface HostSpaceData {
  id: number;
  name: string;
  address: string;
  city: string;
  district: string;
  imageUrl: string;
  pricePerDay: number;
  discountRate: number;
  discountPrice: number;
  capacity: number;
  size: number;
  likeCount: number;
  liked: boolean;
}

export type HostInfoId = 'name' | 'email' | 'phone' | 'bankName' | 'accountNumber' | 'password';

export interface HostInfoForm {
  name: string;
  email: string;
  phone: string;
  bankName: null | string;
  accountNumber: null | string;
  password: string;
}

export interface HostInfoConfig extends CommonConfig {
  name: HostInfoId;
  display: string;
}

export type HostInfoConfigList = Record<HostInfoId, HostInfoConfig>;
