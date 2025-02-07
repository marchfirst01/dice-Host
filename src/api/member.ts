import { GuestPostAxiosInstance } from '@axios/guest.axios.method';
import { MemberFormData } from '@type/member';
import { LoginResponse } from '@type/member/memberResponse';

export const fetchLogin = async (formData: MemberFormData): Promise<LoginResponse> => {
  const { id, password } = formData;
  const res = await GuestPostAxiosInstance('/auth/login', { email: id, password });
  if (res.status !== 200) throw new Error('Failed to fetch login');
  return res.data;
};

export class ValidateEmailError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message); // 기본 Error 생성자 호출
    this.code = code; // 추가적인 속성 설정
    this.name = this.constructor.name; // 오류 이름 설정
  }
}

export const fetchValidateEmail = async (email: string) => {
  try {
    const res = await GuestPostAxiosInstance('/auth/validate/email', { email });
    if (res.status === 200) return;
  } catch (error) {
    throw new ValidateEmailError('중복된 이메일 입니다', 'DUPLICATE_EMAIL');
  }
};

export const fetchRegister = async (formData: MemberFormData) => {
  const { id, name, password, phone } = formData;
  const res = await GuestPostAxiosInstance('/auth/signup', { email: id, name, password, phone });
  if (res.status !== 200) throw new Error('회원가입 실패');
  return;
};
