export interface CommonConfig {
  type: string;
  placeholder: string;
  rules?: string;
}

export interface CommonSpaceData {
  name: string;
  openingTime: string;
  closingTime: string;
  details: string;
  websiteUrl: string;
  contactNumber: string;
  facilityInfo: string;
  notice: string[];
  isActivated: boolean;
}
