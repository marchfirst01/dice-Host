import { MemberConfigList, MemberId } from '@type/member';

export const memberConfig: MemberConfigList = {
  email: {
    name: 'email',
    display: '이메일',
    type: 'default',
    placeholder: '예: dice16',
    rules: '이메일을 입력해주세요',
  },
  password: {
    name: 'password',
    display: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요',
    rules: '비밀번호를 입력해주세요',
  },
  password_check: {
    name: 'password_check',
    display: '비밀번호 확인',
    type: 'password',
    placeholder: '비밀번호를 한 번 더 입력해주세요',
    rules: '비밀번호를 한 번 더 입력해주세요',
  },
  name: {
    name: 'name',
    display: '이름',
    type: 'default',
    placeholder: '이름을 입력해주세요',
    rules: '이름을 입력해주세요',
  },
  phone: {
    name: 'phone',
    display: '휴대폰',
    type: 'default',
    placeholder: '숫자만 입력해주세요',
    rules: '전화번호를 입력해주세요',
  },
  auth: {
    name: 'auth',
    display: '',
    type: 'default',
    placeholder: '인증번호 받기',
    rules: '인증번호를 입력해주세요',
  },
  bank: {
    name: 'bank',
    display: '계좌번호',
    type: 'default',
    placeholder: '계좌번호를 입력해주세요',
    rules: '공간 예약 시 입금 받을 계좌번호를 입력해주세요',
  },
};

export const memberIdList: MemberId[] = ['email', 'password', 'password_check', 'name', 'bank'];
