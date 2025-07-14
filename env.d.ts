declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_BASE_URL: string;
    NEXT_PUBLIC_BASE_URL_V2: string;

    NEXT_PUBLIC_NMFClientId: string;
    NEXT_PUBLIC_NMFClientSecret: string;

    NEXT_PUBLIC_KAKAO_REST_API_KEY: string;
    NEXT_PUBLIC_KAKAO_JS_API_KEY: string;
  }
}
