import { CommonConfig } from '@type/common';

import { ControllerRenderProps } from 'react-hook-form';

import { SpaceFormData } from './spaceType';

// 팝업 formData의 id들
type SpaceId =
  | 'name'
  | 'description'
  | 'openingTime'
  | 'closingTime'
  | 'size'
  | 'capacity'
  | 'tags'
  | 'pricePerDay'
  | 'discountRate'
  | 'details'
  | 'address'
  | 'detailAddress'
  | 'websiteUrl'
  | 'contactNumber'
  | 'facilityInfo'
  | 'notice';

// 개별 spaceConfig 타입
interface SpaceConfig extends CommonConfig {
  name: SpaceId;
  display: string;
  handleOnChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: Pick<ControllerRenderProps<SpaceFormData, SpaceId>, 'onChange'>,
  ) => void;
}

// spaceConfig 타입
type SpaceConfigList = Record<SpaceId, SpaceConfig>;

export type { SpaceId, SpaceConfig, SpaceConfigList };
