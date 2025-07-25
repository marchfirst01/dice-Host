import { PostAxiosInstance } from '@axios/axios.method';
import { GuestPostAxiosInstance, GuestPostAxiosInstanceV2 } from '@axios/guest.axios.method';
import { MemberFormData } from '@type/member';
import { LoginResponse } from '@type/member/memberResponse';

interface AuthVerifyResponse {
  status: number;
}

interface AuthVerifyCodeResponse {
  isVerified: boolean;
}

interface PasswordResetResponse {
  email: string;
  tempPassword: string;
}

export class ValidateMemberError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message); // 기본 Error 생성자 호출
    this.code = code; // 추가적인 속성 설정
    this.name = this.constructor.name; // 오류 이름 설정
  }
}

export const fetchLogin = async (formData: MemberFormData): Promise<LoginResponse> => {
  const { email, password } = formData;
  const res = await GuestPostAxiosInstance<LoginResponse>('/auth/login', { email, password });
  if (res.status !== 200) throw new Error('Failed to fetch login');
  return res.data;
};

export const fetchValidateEmail = async (email: string) => {
  try {
    const res = await GuestPostAxiosInstance('/auth/validate/email', { email });
    if (res.status === 200) return;
  } catch (error) {
    console.log(error);
    throw new ValidateMemberError('이미 가입된 이메일 입니다', 'DUPLICATE_EMAIL');
  }
};

export const fetchValidatePhone = async (phone: string) => {
  try {
    const res = await GuestPostAxiosInstance('/auth/validate/phone', phone.replace(/-/g, ''));
    if (res.status === 200) return true;
  } catch (error) {
    console.log(error);
    throw new ValidateMemberError('중복된 휴대폰 번호입니다', 'DUPLICATE_PHONE');
  }
};

export const fetchRegister = async (formData: MemberFormData) => {
  const { email, name, password, phone } = formData;
  const userRole = 0;
  const res = await GuestPostAxiosInstanceV2('/auth/signup', {
    email,
    name,
    password,
    phone,
    userRole,
  });
  if (res.status !== 200) throw new Error('회원가입 실패');
  return;
};

export const fetchLogout = async () => {
  const res = await PostAxiosInstance('/auth/logout');
  return res.status;
};

export const fetchAuthVerify = async (email: string): Promise<number> => {
  try {
    const res = await GuestPostAxiosInstance<AuthVerifyResponse>('/auth/verify', { email });
    return res.status; // 또는 적절한 반환값
  } catch (error) {
    console.log(error);
    throw new ValidateMemberError('인증 요청 실패', 'VERIFY_FAILED');
  }
};

export const fetchAuthVerifyCode = async (
  code: string,
  email: string,
): Promise<AuthVerifyCodeResponse> => {
  try {
    const res = await GuestPostAxiosInstance<AuthVerifyCodeResponse>('/auth/verify-code', {
      code,
      email,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new ValidateMemberError('코드 인증 실패', 'CODE_VERIFY_FAILED');
  }
};

export const fetchPasswordReset = async (
  code: string,
  email: string,
): Promise<PasswordResetResponse> => {
  try {
    const res = await GuestPostAxiosInstance<PasswordResetResponse>('/auth/password-reset', {
      code,
      email,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new ValidateMemberError('해당 유저 정보를 찾을 수 없습니다.', 'NOT_FOUND');
  }
};
