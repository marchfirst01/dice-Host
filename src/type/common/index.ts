export interface CommonConfig {
  type: string;
  placeholder: string;
  rules?: string;
}

export type FacilityKey =
  | 'cctv'
  | 'chair'
  | 'circle_table'
  | 'couch'
  | 'desktop'
  | 'drink'
  | 'fire_extinguisher'
  | 'firealarm'
  | 'first_aid_kit'
  | 'light'
  | 'monitor'
  | 'printer'
  | 'projector'
  | 'shelf'
  | 'speaker'
  | 'square_table'
  | 'standing_table'
  | 'tv'
  | 'water_purifier'
  | 'wifi';

export interface CommonSpaceData {
  name: string;
  openingTime: string;
  closingTime: string;
  details: string;
  websiteUrl: string;
  contactNumber: string;
  facilityInfo: {
    key: FacilityKey;
    number: number;
    description: string;
  }[];
  notice: string[];
  isActivated: boolean;
  tags: string[];
}
