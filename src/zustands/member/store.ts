import { create } from 'zustand';

export const useLoggedInStore = create<{
  isLoggedIn: boolean;
  user: { email: string; name: string; userRole: string | null } | null;
  setIsLoggedIn: (status: boolean) => void;
  setUser: (user: { email: string; name: string; userRole: string | null }) => void;
  clearUser: () => void;
}>((set) => ({
  isLoggedIn: false, // 로그인 여부
  user: null, // 유저 정보 초기값
  setIsLoggedIn: (status) => set({ isLoggedIn: status }), // 로그인 상태 설정
  setUser: (user) => set({ user, isLoggedIn: true }), // 유저 정보 저장 후 로그인 상태 설정
  clearUser: () => set({ user: null, isLoggedIn: false }), // 로그아웃 시 유저 정보 초기화
}));
