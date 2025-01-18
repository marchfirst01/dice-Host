import { create } from 'zustand';

export const useLoggedInStore = create<{
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
}>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
}));
