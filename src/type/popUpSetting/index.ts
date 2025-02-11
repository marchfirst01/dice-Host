// 팝업을 생성/수정할 때 제출하는 폼데이터의 내용
interface PopUpFormData {
  imageList: File[];
  name: string;
  subTitle: string;
  placeType: string;
  placeStart: number;
  placeArea: number;
  placeEnd: number;
  numOfPeople: number;
  hashTagList: string;
  price: number;
  discount: number;
  description: string;
  location: string;
  locationDescription: string;
  homepage: string;
  phoneNumber: string;
  usageInformation: string;
  noticeInformation: string;
}

// 팝업 formData의 id들
type PopUpId =
  | 'name'
  | 'subTitle'
  | 'placeStart'
  | 'placeEnd'
  | 'placeArea'
  | 'numOfPeople'
  | 'hashTagList'
  | 'price'
  | 'discount'
  | 'description'
  | 'location'
  | 'locationDescription'
  | 'homepage'
  | 'phoneNumber'
  | 'usageInformation'
  | 'noticeInformation';

// 인풋에 사용되는 정보들이 담긴 데이터
interface PopUpConfig {
  name: PopUpId;
  display: string;
  placeholder: string;
  rules?: string;
}

// 데이터 리스트
type PopUpConfigList = Record<PopUpId, PopUpConfig>;

export type { PopUpFormData, PopUpId, PopUpConfig, PopUpConfigList };
