import { CommonConfig } from '@type/common';

type MemberFormData = Record<MemberId, string>;

type MemberId = 'email' | 'password' | 'password_check' | 'name' | 'phone' | 'auth' | 'bank';

interface MemberConfig extends CommonConfig {
  name: MemberId;
  display: string;
  isValid: string;
}

type MemberConfigList = Record<MemberId, MemberConfig>;

export type { MemberFormData, MemberConfigList, MemberId, MemberConfig };
