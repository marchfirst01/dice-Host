// next-auth.d.ts
import 'next-auth';
// types/next-auth.d.ts 파일이 있다면
import NextAuth from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    profile?: {
      id?: string;
      nickname?: string;
      email?: string;
    };
  }
}
