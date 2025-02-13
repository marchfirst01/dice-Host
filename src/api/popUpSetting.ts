import { PostAxiosInstance } from '@axios/axios.method';
import { PopUpRegisterResponse } from '@type/popUpSetting/popUpResponse';

export const fetchImageUpload = async (imageList: File[]) => {
  try {
    const formData = new FormData();
    Array.from(imageList).forEach((image) => {
      formData.append('images', image);
    });
    const res = await PostAxiosInstance(`/s3/uploads`, imageList, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (res.status !== 200) throw new Error('Failed to fetch image list');
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch image list');
  }
};

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
