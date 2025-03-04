import { PostAxiosInstance } from '@axios/axios.method';
import { PopUpFormData, PopUpRegisterResponse } from '@type/popUpSetting';
import { formatTimeTo24Hour } from '@utils/formatTime';

interface ImageUploadResponse {
  imageUrls: string[]; // 또는 어떤 구조인지에 따라 수정
}

export const fetchImageUpload = async (imageList: File[]): Promise<ImageUploadResponse> => {
  try {
    const formData = new FormData();
    imageList.forEach((image) => {
      formData.append('images', image);
    });
    const res = await PostAxiosInstance<FormData, ImageUploadResponse>(`/s3/uploads`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (res.status !== 200) throw new Error('Failed to fetch image list');
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch image list');
  }
};

export const uploadImage = async (imageList: (File | string)[]) => {
  try {
    // imageList에서 타입이 File인 것만 따로 모아서 배열로 만들기
    const fileList = imageList.filter((item): item is File => item instanceof File);
    if (fileList.length === 0) {
      // imageList에서 File 타입이 없다? 전부 string -> 그대로 반환
      return imageList as string[];
    }
    const { imageUrls } = await fetchImageUpload(fileList);
    const stringList = imageList.filter((item): item is string => typeof item === 'string');
    if (stringList === null) {
      // string 타입이 없다? 전부 File 타입, 변환 완료 -> imageUrls 반환
      return imageUrls;
    }
    imageUrls.push(...stringList);
    return imageUrls;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchSpaceRegister = async (formData: PopUpFormData) => {
  const imageUrlsRes = await uploadImage(formData.imageList);

  const registerData: PopUpRegisterResponse = {
    ...formData,
    imageUrls: imageUrlsRes,
    openingTime: formatTimeTo24Hour(formData.openingTime),
    closingTime: formatTimeTo24Hour(formData.closingTime),
    size: Number(formData.size),
    capacity: Number(formData.capacity),
    pricePerDay: Number(formData.pricePerDay?.replace(/,/g, '')),
    discountRate: Number(formData.discountRate),
  };

  try {
    const res = await PostAxiosInstance(`/space/register`, registerData);
    if (res.status !== 201) throw new Error('Failed to fetch posts');
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSpaceIdUpdate = async (id: string, editData: PopUpFormData) => {
  const imageUrlsRes = await uploadImage(editData.imageList);
  const registerData: PopUpRegisterResponse = {
    ...editData,
    imageUrls: imageUrlsRes,
    openingTime: formatTimeTo24Hour(editData.openingTime),
    closingTime: formatTimeTo24Hour(editData.closingTime),
    size: Number(editData.size),
    capacity: Number(editData.capacity),
    pricePerDay: Number(editData.pricePerDay?.replace(/,/g, '')),
    discountRate: Number(editData.discountRate),
    details: editData.details,
    isActivated: editData.isActivated,
  };
  const res = await PostAxiosInstance(`/space/update/${id}`, registerData);
  console.log(res);
};
