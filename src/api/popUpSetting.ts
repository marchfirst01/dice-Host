import { PostAxiosInstance } from '@axios/axios.method';
import { PopUpRegisterResponse } from '@type/popUpSetting/popUpResponse';

export const fetchSpaceRegister = async (registerData: PopUpRegisterResponse) => {
  console.log(registerData);
  try {
    const res = await PostAxiosInstance(`/space/register`, registerData);
    if (res.status !== 200) throw new Error('Failed to fetch posts');
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
