import { create } from 'zustand';

export const useFindPassword = create<{
  name: string;
  email: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  step: number;
  setStep: (step: number) => void;
}>((set) => ({
  name: '',
  email: '',
  setName: (name) => set({ name: name }),
  setEmail: (email) => set({ email: email }),
  step: 0,
  setStep: (step) => set({ step: step }),
}));
