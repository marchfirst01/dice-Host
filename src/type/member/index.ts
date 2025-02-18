type MemberFormData = Record<MemberId, string>;

type MemberId = 'email' | 'password' | 'password_check' | 'name' | 'phone' | 'auth' | 'bank';

interface MemberConfig {
  name: MemberId;
  display: string;
  type: string;
  placeholder: string;
  rules: string;
  isValid: string;
}

type MemberConfigList = Record<MemberId, MemberConfig>;

export type { MemberFormData, MemberConfigList, MemberId, MemberConfig };
