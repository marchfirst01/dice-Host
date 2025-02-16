import { Address } from '@type/popUpSetting';

import { create } from 'zustand';

export const useGeocodeStore = create<{
  selectedAddress: Address;
  setSelectedAddress: (address: Address) => void;
}>((set) => ({
  selectedAddress: {
    jibunAddress: '',
    roadAddress: '',
    sido: '',
    sigugun: '',
    postalCode: '',
    latitude: '',
    longitude: '',
  },
  setSelectedAddress: (address: Address) => set({ selectedAddress: address }),
}));
