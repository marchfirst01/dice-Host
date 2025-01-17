type MemberList = Record<
  'id' | 'password' | 'password_check' | 'name' | 'email' | 'phone' | 'auth',
  Member
>;

interface Member {
  name: string;
  type: string;
  placeholder: string;
}

export type { MemberList, Member };
