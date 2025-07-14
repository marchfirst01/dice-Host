import { PostAxiosInstance } from '@axios/axios.method';
import { GuestGetAxiosInstance } from '@axios/guest.axios.method';
import { SpaceIdResponse, SpaceSubmitData } from '@type/space/spaceType';

import axios from 'axios';

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

// 지하철역 정보 조회 함수
const fetchNearestSubway = async (latitude: number, longitude: number) => {
  const apiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

  if (!apiKey) {
    console.error('Kakao API 키가 설정되지 않았습니다.');
    return null;
  }

  try {
    const response = await axios.get('https://dapi.kakao.com/v2/local/search/category', {
      headers: {
        Authorization: `KakaoAK ${apiKey}`,
      },
      params: {
        category_group_code: 'SW8', // 지하철역
        x: longitude,
        y: latitude,
        sort: 'distance',
        page: 1,
        size: 1,
      },
    });

    const firstPlace = response.data.documents[0];
    if (!firstPlace) return null;

    const { place_name, distance } = firstPlace;
    const [stationName, lineName] = place_name.split(' ');

    return { stationName, lineName, distance };
  } catch (error) {
    console.error('지하철역 정보 조회 실패:', error);
    return null;
  }
};

export const fetchSpaceRegister = async (submitData: SpaceSubmitData) => {
  try {
    // 1. 지하철역 정보 조회
    let nearestSubway = null;
    if (submitData.latitude && submitData.longitude) {
      nearestSubway = await fetchNearestSubway(submitData.latitude, submitData.longitude);
    }

    // 2. 지하철역 정보를 포함한 최종 데이터 구성 - 임시 구성
    const finalSubmitData = {
      ...submitData,
      // nearestSubway,
    };

    console.log('지하철역 정보:', nearestSubway);

    // 3. 서버로 데이터 전송
    const res = await PostAxiosInstance(`/space/register`, finalSubmitData);

    if (res.status !== 201) throw new Error('공간 등록에 실패했습니다');
    return res.data;
  } catch (error) {
    console.error('공간 등록 오류:', error);
    throw error;
  }
};

// export const fetchSpaceRegister = async (submitData: SpaceSubmitData) => {
//   try {
//     const res = await PostAxiosInstance(`/space/register`, submitData);
//     if (res.status !== 201) throw new Error('공간 등록에 실패했습니다');
//     return res.data;
//   } catch (error) {
//     console.error('공간 등록 오류:', error);
//     throw error;
//   }
// };

export const fetchSpaceIdUpdate = async (id: string, submitData: SpaceSubmitData) => {
  try {
    const res = await PostAxiosInstance(`/space/update/${id}`, submitData);
    if (res.status !== 200) throw new Error('공간 수정에 실패했습니다');
    return res.status;
  } catch (error) {
    console.error('공간 수정 오류:', error);
    throw error;
  }
};
