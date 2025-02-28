import { HostInfoConfigList } from '@type/my';

export const hostInfoConfig: HostInfoConfigList = {
  name: {
    name: 'name',
    display: '호스트 이름',
    type: 'default',
    placeholder: '이름을 입력해주세요',
  },
  email: {
    name: 'email',
    display: '이메일',
    type: 'default',
    placeholder: '이메일을 입력해주세요',
  },
  phone: {
    name: 'phone',
    display: '휴대폰',
    type: 'default',
    placeholder: '휴대폰 번호를 입력해주세요',
  },
  bankName: {
    name: 'bankName',
    display: '',
    type: 'default',
    placeholder: '',
  },
  accountNumber: {
    name: 'accountNumber',
    display: '계좌번호',
    type: 'default',
    placeholder: '계좌번호를 입력해주세요',
  },
  password: {
    name: 'password',
    display: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요',
  },
};
