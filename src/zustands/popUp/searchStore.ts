import { create } from 'zustand';

export const useSearchStore = create<{ searchText: string; setSearchText: (text: string) => void }>(
  (set) => ({
    searchText: '',
    setSearchText: (text) => set({ searchText: text }),
  }),
);
