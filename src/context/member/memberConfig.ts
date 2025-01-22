import { MemberConfigList, MemberId } from '@type/member';

export const memberConfig: MemberConfigList = {
  id: { name: 'id', display: '아이디', type: 'default', placeholder: '아이디를 입력해주세요' },
  password: {
    name: 'password',
    display: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요',
  },
  password_check: {
    name: 'password_check',
    display: '비밀번호 확인',
    type: 'password',
    placeholder: '비밀번호를 한 번 더 입력해주세요',
  },
  name: { name: 'name', display: '이름', type: 'default', placeholder: '이름을 입력해주세요' },
  email: { name: 'email', display: '이메일', type: 'default', placeholder: '예: popupdice' },
  phone: { name: 'phone', display: '휴대폰', type: 'default', placeholder: '숫자만 입력해주세요' },
  auth: { name: 'auth', display: '', type: 'default', placeholder: '인증번호 받기' },
};

export const memberIdList: MemberId[] = ['id', 'password', 'password_check', 'name', 'email'];
