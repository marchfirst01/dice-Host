import { create } from 'zustand';

export const useFindPassword = create<{
  email: string;
  setEmail: (email: string) => void;
  code: string;
  setCode: (code: string) => void;
  step: number;
  setStep: (step: number) => void;
}>((set) => ({
  email: '',
  setEmail: (email) => set({ email: email }),
  code: '',
  setCode: (code) => set({ code: code }),
  step: 0,
  setStep: (step) => set({ step: step }),
}));
