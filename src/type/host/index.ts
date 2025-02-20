import { CommonConfig } from '@type/common';

export type PwResetForm = Record<PwResetId, string>;

export type PwResetId = 'password' | 'new_password' | 'new_password_check';

export interface PwResetConfig extends CommonConfig {
  name: PwResetId;
}

export type PwConfigList = Record<PwResetId, PwResetConfig>;
