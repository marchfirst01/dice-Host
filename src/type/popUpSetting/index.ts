import { CommonPopUpData } from '@type/common';

// 지도 response
interface Address {
  jibunAddress: string;
  roadAddress: string;
  sido: string;
  sigugun: string;
  postalCode: string;
  latitude: number;
  longitude: number;
}

// popUpSetting 페이지에서 react-hook-form에 연결되는 데이터
interface PopUpFormData extends CommonPopUpData {
  imageList: (File | string)[];
  size: number;
  pricePerDay: string;
  discountRate: string;
  city: string;
  district: string;
  address: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
}

// 팝업 formData의 id들
type PopUpId =
  | 'name'
  | 'description'
  | 'openingTime'
  | 'closingTime'
  | 'size'
  | 'capacity'
  | 'tags'
  | 'pricePerDay'
  | 'discountRate'
  | 'details'
  | 'address'
  | 'detailAddress'
  | 'websiteUrl'
  | 'contactNumber'
  | 'facilityInfo'
  | 'notice';

// 인풋에 사용되는 정보들이 담긴 데이터
interface PopUpConfig {
  name: PopUpId;
  display: string;
  placeholder: string;
  rules?: string;
}

// 데이터 리스트
type PopUpConfigList = Record<PopUpId, PopUpConfig>;

// popUpFormData를 가공해서 api에 필요한 데이터로 변경
interface PopUpRegisterResponse extends CommonPopUpData {
  pricePerDay: number;
  discountRate: number;
  size: number;
  imageUrls: string[];
  latitude: number;
  longitude: number;
  city: string;
  district: string;
  address: string;
  detailAddress: string;
}

export type {
  Address,
  PopUpFormData,
  PopUpId,
  PopUpConfig,
  PopUpConfigList,
  PopUpRegisterResponse,
};
