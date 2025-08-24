// next-auth.d.ts (또는 types/next-auth.d.ts)
import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    provider?: string; // 추가
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    provider?: string; // 추가
    profile?: {
      id?: string;
      nickname?: string;
      email?: string;
    };
  }
}
