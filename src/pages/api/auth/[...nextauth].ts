import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';

// 네이버 커스텀 Provider
const NaverProvider = {
  id: 'naver',
  name: 'Naver',
  type: 'oauth' as const,
  authorization: {
    url: 'https://nid.naver.com/oauth2.0/authorize',
    params: {
      response_type: 'code',
      client_id: process.env.NAVER_CLIENT_ID,
      redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/naver`,
      state: Math.random().toString(36).substring(2, 15),
    },
  },
  token: {
    url: 'https://nid.naver.com/oauth2.0/token',
    async request(context: any) {
      const { provider, params, checks } = context;

      const response = await fetch('https://nid.naver.com/oauth2.0/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: provider.clientId!,
          client_secret: provider.clientSecret!,
          code: params.code!,
          state: params.state!,
        }),
      });

      const tokens = await response.json();
      return { tokens };
    },
  },
  userinfo: {
    url: 'https://openapi.naver.com/v1/nid/me',
    async request(context: any) {
      const { tokens } = context;

      const response = await fetch('https://openapi.naver.com/v1/nid/me', {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      });

      const data = await response.json();
      return data.response;
    },
  },
  profile(profile: any) {
    return {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      image: profile.profile_image,
    };
  },
  clientId: process.env.NAVER_CLIENT_ID,
  clientSecret: process.env.NAVER_CLIENT_SECRET,
  checks: ['state'],
};

export default NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    NaverProvider as any, // 네이버 커스텀 Provider 추가
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.provider = account.provider as 'google' | 'kakao' | 'naver'; // 타입 명시
        if (profile) {
          token.profile = profile;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      if (token.provider) {
        session.provider = token.provider; // as string 제거 (이미 올바른 타입)
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
