type MemberList = Record<MemberName, Member>;

type MemberName = 'id' | 'password' | 'password_check' | 'name' | 'email' | 'phone' | 'auth';

interface Member {
  name: MemberName;
  display: string;
  type: string;
  placeholder: string;
}

export type { MemberList, MemberName, Member };
