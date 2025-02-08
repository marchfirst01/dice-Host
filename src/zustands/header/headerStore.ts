import { create } from 'zustand';

export const useHeaderStore = create<{
  mainPageType: 'popUp' | 'reservation' | 'my';
  setMainPageType: (pageType: 'popUp' | 'reservation' | 'my') => void;
}>((set) => ({
  mainPageType: 'reservation',
  setMainPageType: (pagetype) => set({ mainPageType: pagetype }),
}));
