import { SpaceFormData, SpaceIdResponse, SpaceSubmitData } from '@type/space/spaceType';

import { formatKoreanTimeTo24 } from './timePickerTransform';
import { uploadImage } from 'src/api/space';

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
  const openingTime = formatKoreanTimeTo24(formData.openingTime);
  const closingTime = formatKoreanTimeTo24(formData.closingTime);
  const { imageList, ...rest } = formData;
  return {
    ...rest,
    imageUrls,
    openingTime,
    closingTime,
  };
}
