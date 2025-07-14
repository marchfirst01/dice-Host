import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';

// 카카오 로그인 설정
export default NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  // JWT 토큰 설정
  callbacks: {
    async jwt({ token, account, profile }) {
      // 로그인 성공 시 실행
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;

        // 프로필 정보 저장
        if (profile) {
          token.profile = profile;
        }
      }
      return token;
    },
    // 세션 설정
    async session({ session, token }) {
      // 세션에 액세스 토큰 추가
      session.accessToken = token.accessToken;
      return session;
    },
  },
  // 기본 페이지 설정 (선택사항)
  pages: {
    signIn: '/auth/signin', // 커스텀 로그인 페이지 경로
  },
  secret: process.env.NEXTAUTH_SECRET,
});
