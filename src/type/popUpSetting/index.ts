// 팝업을 생성/수정할 때 제출하는 폼데이터의 내용
// TODO: api 내용에 city(도시명), district(동네명), address(상세주소), latitude, longitude 들어가야함
// TODO: popUpFormData = 사용자한테 입력받은 값
// TODO: fetchPopUpData = popUpFormData를 가공하여 api에 전달할 값 (타입 추가 제작 필요)
interface PopUpFormData {
  name: string;
  description: string;
  imageList: File[];
  category: string;
  openingTime: string;
  closingTime: string;
  placeArea: number;
  capacity: number;
  tags: string[];
  pricePerDay: string;
  discountRate: { price: number; type: string };
  details: string;
  // address: 상세주소, location: 주소 검색
  location: Address;
  address: string;
  websiteUrl: string;
  contactNumber: string;
  facilityInfo: string;
  notice: string;
}

// 팝업 formData의 id들
type PopUpId =
  | 'name'
  | 'description'
  | 'openingTime'
  | 'closingTime'
  | 'placeArea'
  | 'capacity'
  | 'tags'
  | 'pricePerDay'
  | 'discountRate'
  | 'details'
  | 'location'
  | 'address'
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

export type { PopUpFormData, PopUpId, PopUpConfig, PopUpConfigList, Address };
