export interface HostSpaceData {
  id: number;
  name: string;
  address: string;
  imageUrl: string;
  pricePerDay: number;
  discountRate: number;
  discountPrice: number;
  capacity: number;
  size: number;
  likeCount: number;
  liked: boolean;
}

export interface HostInfo {
  name: string;
  email: string;
  phone: string;
  bankName: null | string;
  accountNumber: null | string;
  password: string;
}
