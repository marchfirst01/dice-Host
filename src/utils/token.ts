// accessToken 저장하기
export const setAccessToken = (accessToken: string): void => {
  localStorage.setItem('accessToken', accessToken);
};

// accessToken 가져오기
export const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

// refreshToken 저장하기
export const setRefreshToken = (refreshToken: string): void => {
  localStorage.setItem('refreshToken', refreshToken);
};

// refreshToken 가져오기
export const getRefreshToken = (): string | null => {
  return localStorage.getItem('refreshToken');
};

// 토큰 전체 삭제 (로그아웃)
export const deleteToken = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};
