import { FacilityKey } from '@type/common';

interface FacilityConfig {
  id: FacilityKey;
  name: string;
  number: number;
}

type FacilityConfigList = Record<FacilityKey, FacilityConfig>;

export type { FacilityConfig, FacilityConfigList };
