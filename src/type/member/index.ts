type MemberName = 'id' | 'password' | 'password_check' | 'name' | 'email' | 'phone' | 'auth';

type MemberFormData = Record<MemberName, string>;

type MemberList = Record<MemberName, Member>;

interface Member {
  name: MemberName;
  display: string;
  type: string;
  placeholder: string;
}

export type { MemberFormData, MemberList, MemberName, Member };
