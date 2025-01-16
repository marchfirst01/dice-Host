import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['placehold.co'], // 사용하려는 이미지 URL의 도메인 추가
  },
};

export default nextConfig;
