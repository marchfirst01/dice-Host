import { SpaceFormData, SpaceIdResponse, SpaceSubmitData } from '@type/space/spaceType';

import { uploadImage } from 'src/api/popUpSetting';

// API(fetchSpaceId) 응답 데이터를 폼 데이터로 변환
export function transformResponseToFormData(response: SpaceIdResponse): SpaceFormData {
  const { id, imageUrls, likeCount, isLiked, messageRoomId, ...commonFiled } = response;
  return {
    ...commonFiled,
    imageList: imageUrls,
  };
}

// 폼 데이터를 제출 데이터로 변환
export async function transformFormToSubmitData(formData: SpaceFormData): Promise<SpaceSubmitData> {
  const imageUrls = await uploadImage(formData.imageList);
  const { imageList, ...rest } = formData;
  return {
    ...rest,
    imageUrls,
  };
}
