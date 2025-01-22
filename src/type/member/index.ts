type MemberFormData = Record<MemberId, string>;

type MemberId = 'id' | 'password' | 'password_check' | 'name' | 'email' | 'phone' | 'auth';

interface MemberConfig {
  name: MemberId;
  display: string;
  type: string;
  placeholder: string;
}

type MemberConfigList = Record<MemberId, MemberConfig>;

export type { MemberFormData, MemberConfigList, MemberId, MemberConfig };
