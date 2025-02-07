import { GuestPostAxiosInstance } from '@axios/guest.axios.method';
import { MemberFormData } from '@type/member';
import { LoginResponse } from '@type/member/memberResponse';

export const fetchLogin = async (formData: MemberFormData): Promise<LoginResponse> => {
  const { id, password } = formData;
  const res = await GuestPostAxiosInstance('/auth/login', { email: id, password });
  if (res.status !== 200) throw new Error('Failed to fetch login');
  return res.data;
};
