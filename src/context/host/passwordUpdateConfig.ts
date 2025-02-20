import { PwConfigList } from '@type/host';

export const passwordUpdateConfig: PwConfigList = {
  password: {
    name: 'password',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요',
    rules: '비밀번호를 입력해주세요',
  },
  new_password: {
    name: 'new_password',
    type: 'password',
    placeholder: '새 비밀번호를 입력해주세요',
    rules: '새 비밀번호를 입력해주세요',
  },
  new_password_check: {
    name: 'new_password_check',
    type: 'password',
    placeholder: '새 비밀번호를 한 번 더 입력해주세요',
    rules: '새 비밀번호를 한 번 더 입력해주세요',
  },
};
