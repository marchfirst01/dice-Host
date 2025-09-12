import { SpaceFormData, SpaceIdResponse, SpaceSubmitData } from '@type/space/spaceType';

import { formatKoreanTimeTo24 } from './timePickerTransform';
import { uploadImage } from 'src/api/space';

// API(fetchSpaceId) 응답 데이터를 폼 데이터로 변환
export function transformResponseToFormData(response: SpaceIdResponse): SpaceFormData {
  const { id, imageUrls, likeCount, isLiked, messageRoomId, notices, ...commonFiled } = response;
  const noticeString: string = notices.join('\n');
  console.log(id, likeCount, isLiked, messageRoomId);
  return {
    ...commonFiled,
    notices: noticeString,
    imageList: imageUrls,
  };
}

// 폼 데이터를 제출 데이터로 변환
export async function transformFormToSubmitData({
  formData,
  isActivated,
}: {
  formData: SpaceFormData;
  isActivated: boolean;
}): Promise<SpaceSubmitData> {
  const imageUrls = await uploadImage(formData.imageList);
  let popUpImageUrls;
  if (formData.popUpImageList) {
    popUpImageUrls = await uploadImage(formData.popUpImageList);
  }
  const openingTime = formatKoreanTimeTo24(formData.openingTime);
  const closingTime = formatKoreanTimeTo24(formData.closingTime);
  const noticeList: string[] = formData.notices.split('\n');

  const { imageList, popUpImageList, notices, ...rest } = formData;
  console.log(imageList, popUpImageList);
  return {
    ...rest,
    imageUrls,
    popUpImageUrls,
    notices: noticeList,
    openingTime,
    closingTime,
    isActivated,
  };
}
