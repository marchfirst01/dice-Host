// 쿠키 설정 함수
export const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict;Secure`;
};

// 쿠키 읽기 함수
export const getCookie = (name: string): string | null => {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// 쿠키 삭제 함수
export const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// 액세스 토큰 설정 (7일 유효)
export const setAccessToken = (token: string) => {
  setCookie('accessToken', token, 7);
};

// 리프레시 토큰 설정 (30일 유효)
export const setRefreshToken = (token: string) => {
  setCookie('refreshToken', token, 30);
};

// 액세스 토큰 가져오기
export const getAccessToken = (): string | null => {
  return getCookie('accessToken');
};

// 리프레시 토큰 가져오기
export const getRefreshToken = (): string | null => {
  return getCookie('refreshToken');
};

// 모든 토큰 삭제 (로그아웃 시 사용)
export const clearTokens = () => {
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
};

// 토큰 존재 여부 확인
export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};
