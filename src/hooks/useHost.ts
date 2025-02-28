import { useQuery } from '@tanstack/react-query';
import { HostInfoForm, HostSpaceData } from '@type/my';

import { fetchHostInfo, fetchHostSpace } from 'src/api/host';

export const useHostSpace = () => {
  return useQuery<HostSpaceData[]>({
    queryKey: ['hostSpace'],
    queryFn: () => fetchHostSpace(),
    initialData: [],
    staleTime: 0,
  });
};

export const useHostInfo = () => {
  return useQuery<HostInfoForm>({
    queryKey: ['hostInfo'],
    queryFn: () => fetchHostInfo(),
    initialData: {
      name: '',
      email: '',
      phone: '',
      bankName: null,
      accountNumber: null,
      password: '',
    },
    staleTime: 0,
  });
};
