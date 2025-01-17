import { MemberList } from '@type/member';

export const member: MemberList = {
  id: { name: 'id', type: 'default', placeholder: '아이디를 입력해주세요' },
  password: { name: 'password', type: 'password', placeholder: '비밀번호를 입력해주세요' },
  password_check: {
    name: 'password_check',
    type: 'password',
    placeholder: '비밀번호를 한 번 더 입력해주세요',
  },
  name: { name: 'name', type: 'default', placeholder: '이름을 입력해주세요' },
  email: { name: 'email', type: 'default', placeholder: '예: popupdice' },
  phone: { name: 'phone', type: 'default', placeholder: '숫자만 입력해주세요' },
  auth: { name: 'auth', type: 'default', placeholder: '인증번호 받기' },
};
