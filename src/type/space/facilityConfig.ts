import { FacilityKey } from '@type/common';

interface FacilityConfig {
  id: FacilityKey;
  name: string;
  number: number;
  countable: boolean;
}

type FacilityConfigList = Record<FacilityKey, FacilityConfig>;

export type { FacilityConfig, FacilityConfigList };
