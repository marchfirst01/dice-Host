import { CommonSpaceData } from '@type/common';

// 지도 response
export interface Address {
  jibunAddress: string;
  roadAddress: string;
  sido: string;
  sigugun: string;
  postalCode: string;
  latitude: number;
  longitude: number;
}

// 공간 정보 Form으로 받아온 정보들
export interface SpaceFormData extends CommonSpaceData {
  imageList: Array<string | File>;
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

// 공간 정보를 등록/수정할 때 api로 전달하는 데이터 (FormData -> SubmitData)
export interface SpaceSubmitData extends CommonSpaceData {
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
}

// spaceId Api의 응답 데이터 타입
export interface SpaceIdResponse extends CommonSpaceData {
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
  isLiked: boolean;
  messageRoomId: number | null;
}
