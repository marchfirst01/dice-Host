import { PostAxiosInstance } from '@axios/axios.method';
import { GuestGetAxiosInstance } from '@axios/guest.axios.method';
import { SpaceIdResponse } from '@type/space/spaceType';

// id 공간 정보 조회
export const fetchSpaceId = async (id: string): Promise<SpaceIdResponse> => {
  const res = await GuestGetAxiosInstance(`/space/${id}`);
  if (res.status !== 200) throw new Error('Failed to fetch posts');
  return res.data;
};

// 이미지 업로드
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

export const uploadImage = async (imageList: (File | string)[]): Promise<string[]> => {
  try {
    // 문자열과 파일 분리
    const stringUrls = imageList.filter((item): item is string => typeof item === 'string');
    const files = imageList.filter((item): item is File => item instanceof File);

    // 파일이 없으면 기존 문자열 URL만 반환
    if (files.length === 0) {
      return stringUrls;
    }

    // 파일 업로드
    const { imageUrls } = await fetchImageUpload(files);

    // 업로드된 URL과 기존 URL 합치기
    return [...imageUrls, ...stringUrls];
  } catch (error) {
    console.error('이미지 업로드 중 오류 발생:', error);
    return [];
  }
};
