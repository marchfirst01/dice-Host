// types/next-auth.d.ts
import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    provider?: 'google' | 'kakao' | 'naver'; // 네이버 추가
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    provider?: 'google' | 'kakao' | 'naver'; // 네이버 추가
    profile?: {
      id?: string;
      nickname?: string;
      email?: string;
      name?: string;
      profile_image?: string; // 네이버 프로필 이미지
    };
  }
}
