import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**', // 허용할 이미지 경로
      },
      {
        protocol: 'https',
        hostname: 'cmc-dice-bucket.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: `/api/naver/:path*`,
        destination: 'https://naveropenapi.apigw.ntruss.com/:path*',
      },
    ];
  },
};

export default nextConfig;
