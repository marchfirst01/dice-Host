import { Address } from '@type/popUpSetting';

import { create } from 'zustand';

export const useGeocodeStore = create<{
  selectedAddress: Address;
  setSelectedAddress: (address: Partial<Address>) => void;
}>((set) => ({
  selectedAddress: {
    jibunAddress: '',
    roadAddress: '',
    sido: '',
    sigugun: '',
    postalCode: '',
    latitude: 0,
    longitude: 0,
  },
  setSelectedAddress: (address: Partial<Address>) =>
    set((state) => ({
      selectedAddress: {
        ...state.selectedAddress, // 이전 상태 복사
        ...address, // 전달된 필드 업데이트
      },
    })),
}));
