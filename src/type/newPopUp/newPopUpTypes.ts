type NewPopUpInfo =
  | 'name'
  | 'subTitle'
  | 'placeStart'
  | 'placeEnd'
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

interface NewPopUpFormData {
  name: string;
  subTitle: string;
  placeType: string;
  placeStart: number;
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

type NewPopUpInfoList = Record<NewPopUpInfo, NewPopUp>;

interface NewPopUp {
  name: NewPopUpInfo;
  display: string;
  placeholder: string;
}

export type { NewPopUpFormData, NewPopUpInfoList, NewPopUpInfo, NewPopUp };
