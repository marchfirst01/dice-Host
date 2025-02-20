import { CommonConfig } from '@type/common';

type MemberFormData = Record<MemberId, string>;

type MemberId = 'id' | 'password' | 'password_check' | 'name' | 'email' | 'phone' | 'auth';

interface MemberConfig extends CommonConfig {
  name: MemberId;
  display: string;
}

type MemberConfigList = Record<MemberId, MemberConfig>;

export type { MemberFormData, MemberConfigList, MemberId, MemberConfig };
