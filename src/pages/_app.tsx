import '@styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { AppProps } from 'next/app';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Script
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NMFClientId}&submodules=geocoder`}
        strategy="lazyOnload" // 스크립트를 페이지가 로드된 후에 비동기적으로 로드
        onLoad={() => {
          console.log('Naver Maps script loaded successfully.');
          // 스크립트가 로드된 후 실행할 코드
        }}
      />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
