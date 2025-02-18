import { PostAxiosInstance } from '@axios/axios.method';
import { GuestPostAxiosInstance } from '@axios/guest.axios.method';
import { MemberFormData } from '@type/member';
import { LoginResponse } from '@type/member/memberResponse';

export const fetchLogin = async (formData: MemberFormData): Promise<LoginResponse> => {
  const { email, password } = formData;
  const res = await GuestPostAxiosInstance('/auth/login', { email, password });
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

export class ValidatePhoneError extends Error {
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
    throw new ValidateEmailError('이미 가입된 이메일 입니다', 'DUPLICATE_EMAIL');
  }
};

export const fetchValidatePhone = async (phone: string) => {
  try {
    console.log(phone);
    const res = await GuestPostAxiosInstance('/auth/validate/phone', phone.replace(/-/g, ''));
    if (res.status === 200) return;
  } catch (error) {
    throw new ValidatePhoneError('중복된 휴대폰 번호입니다', 'DUPLICATE_PHONE');
  }
};

export const fetchRegister = async (formData: MemberFormData) => {
  const { email, name, password, phone } = formData;
  const res = await GuestPostAxiosInstance('/auth/signup', { email, name, password, phone });
  if (res.status !== 200) throw new Error('회원가입 실패');
  return;
};

export const fetchLogout = async () => {
  const res = await PostAxiosInstance('/auth/logout');
  return res.status;
};
