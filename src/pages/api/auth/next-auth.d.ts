import NextAuth from 'next-auth';

// Session 타입 확장
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

// JWT 타입 확장
declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    profile?: any;
  }
}
