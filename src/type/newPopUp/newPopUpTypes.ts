type NewPopUpInfoList = Record<NewPopUpInfo, NewPopUp>;

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

interface NewPopUp {
  name: string;
  display: string;
  placeholder: string;
}

export type { NewPopUpInfoList, NewPopUpInfo, NewPopUp };
