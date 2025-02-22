import { PostAxiosInstance } from '@axios/axios.method';
import { PopUpFormData } from '@type/popUpSetting';
import { PopUpRegisterResponse } from '@type/popUpSetting/popUpResponse';
import formattedTime from '@utils/formattedTime';

export const fetchImageUpload = async (imageList: File[]) => {
  try {
    const formData = new FormData();
    imageList.forEach((image) => {
      formData.append('images', image);
    });
    const res = await PostAxiosInstance(`/s3/uploads`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (res.status !== 200) throw new Error('Failed to fetch image list');
    return res.data;
  } catch (error) {
    throw new Error('Failed to fetch image list');
  }
};

export const uploadImage = async (imageList: (File | string)[]) => {
  try {
    // imageList에서 타입이 File인 것만 따로 모아서 배열로 만들기
    const fileList = imageList.filter((item): item is File => item instanceof File);
    if (fileList.length === 0) {
      // imageList에서 File 타입이 없다? 전부 string -> 그대로 반환
      return imageList;
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
  }
};

export const fetchSpaceRegister = async (formData: PopUpFormData) => {
  const imageUrlsRes = await uploadImage(formData.imageList);

  const registerData: PopUpRegisterResponse = {
    name: formData.name,
    description: formData.description,
    imageUrls: imageUrlsRes,
    category: formData.category,
    openingTime: formattedTime(formData.openingTime),
    closingTime: formattedTime(formData.closingTime),
    capacity: Number(formData.capacity),
    tags: formData.tags,
    pricePerDay: Number(formData.pricePerDay.replace(/,/g, '')),
    discountRate: Number(formData.discountRate),
    details: formData.details,
    latitude: formData.location.latitude,
    longitude: formData.location.longitude,
    city: formData.location.sido,
    district: formData.location.sigugun,
    address: formData.address,
    websiteUrl: formData.websiteUrl,
    contactNumber: formData.contactNumber,
    facilityInfo: formData.facilityInfo,
    notice: formData.notice,
  };

  console.log(registerData);

  try {
    const res = await PostAxiosInstance(`/space/register`, registerData);
    if (res.status !== 201) throw new Error('Failed to fetch posts');
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
