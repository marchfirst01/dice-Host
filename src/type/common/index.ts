export interface CommonConfig {
  type: string;
  placeholder: string;
  rules?: string;
}

export type FacilityKey =
  | 'cctv'
  | 'chair'
  | 'circleTable'
  | 'couch'
  | 'desktop'
  | 'drink'
  | 'fireExtinguisher'
  | 'firealarm'
  | 'firstAidKit'
  | 'light'
  | 'monitor'
  | 'printer'
  | 'projector'
  | 'shelf'
  | 'speaker'
  | 'squareTable'
  | 'standingTable'
  | 'tv'
  | 'waterPurifier'
  | 'wifi';

export interface CommonSpaceData {
  name: string;
  openingTime: string;
  closingTime: string;
  details: string;
  websiteUrl: string;
  contactNumber: string;
  facilityInfos: {
    key: FacilityKey;
    number: number;
  }[];
  notices: string[];
  isActivated: boolean;
  tags: string[];
}
