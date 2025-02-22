export interface CommonConfig {
  type: string;
  placeholder: string;
  rules: string;
}

export interface CommonPopUpData {
  name: string;
  description: string;
  category: string;
  openingTime: string;
  closingTime: string;
  capacity: number;
  tags: string[];
  details: string;
  websiteUrl: string;
  contactNumber: string;
  facilityInfo: string;
  notice: string;
}
