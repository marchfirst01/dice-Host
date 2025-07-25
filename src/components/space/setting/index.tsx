import { useSpaceId } from '@hooks/useSpace';
import SpaceSettingLayout from '@layout/spaceSettingLayout';
import { FacilityKey } from '@type/common';
import { SpaceFormData } from '@type/space/spaceType';
import discount from '@utils/calculate/discount';
import { transformFormToSubmitData } from '@utils/transform/spaceTransform';
import { formatTimeToKorean } from '@utils/transform/timePickerTransform';
import { useGeocodeStore } from '@zustands/geocode/store';

import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import FacilityList from './facilityList';
import GeocodeModalComponent from './geocodeModal';
import ImageUploadComponent from './imageUpload';
import SpaceInputComponent from './spaceInput';
import SpaceTextareaComponent from './spaceTextarea';
import TagList from './tagList';
import TimePickerComponent from './timePicker';
import { useRouter } from 'next/router';
import { fetchSpaceIdUpdate, fetchSpaceRegister } from 'src/api/space';
import { FacilityConfig } from 'src/context/space/facilityConfig';
import { SpaceConfig } from 'src/context/space/spaceConfig';
import { tagList } from 'src/context/space/tagList';
import { getReverseGeocode } from 'src/server/kakaoMap';

interface SpaceSettingComponentProps {
  id?: string; // router.query
}

export default function SpaceSettingComponent({ id }: SpaceSettingComponentProps) {
  const router = useRouter();
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SpaceFormData>();

  const { data } = useSpaceId(id!);
  const { selectedAddress, setSelectedAddress } = useGeocodeStore();
  const [isOn, setIsOn] = useState(true);
  const [geocodeModalOpen, setGeocodeModalOpen] = useState<boolean>(false);

  const getAddressFromCoords = useCallback(async () => {
    if (data && data.latitude && data.longitude) {
      try {
        const response = await getReverseGeocode(data.latitude, data.longitude);

        if (response && response.documents && response.documents.length > 0) {
          const city = response.documents[0].road_address.region_1depth_name;
          const district = response.documents[0].road_address.region_2depth_name;
          const address = response.documents[0].road_address.address_name;

          // 폼 상태에 주소 정보 설정
          setValue('city', city);
          setValue('district', district);
          setValue('address', address);

          // Zustand 스토어에 주소 정보 저장
          setSelectedAddress({
            roadAddress: address, // 전체 도로명 주소
            postalCode: response.documents[0].road_address.zone_no,
            jibunAddress: response.documents[0].address.address_name, // 지번 주소
            sido: city,
            sigugun: district,
            latitude: data.latitude,
            longitude: data.longitude,
          });
        }
      } catch (error) {
        console.error('좌표를 주소로 변환하는 중 오류 발생:', error);
      }
    }
  }, [data, setValue, setSelectedAddress]);

  // 데이터 로드 시 처리
  useEffect(() => {
    // TODO: 삭제
    const tempData: {
      tags: string[];
      facilityInfo: {
        key: FacilityKey;
        number: number;
      }[];
    } = {
      tags: ['연인이랑 데이트하기 좋은 곳', '감성 로컬 거리', '브런치 맛집 밀집'],
      facilityInfo: [
        { key: 'waterPurifier', number: 1 },
        { key: 'couch', number: 4 },
        { key: 'tv', number: 1 },
        { key: 'firealarm', number: 0 },
        { key: 'desktop', number: 5 },
      ],
    };

    if (data) {
      // 시간 형식 변환
      const formattedData = {
        ...data,
        openingTime: formatTimeToKorean(data.openingTime),
        closingTime: formatTimeToKorean(data.closingTime),
      };

      // 변환된 데이터로 리셋
      reset(formattedData);

      // 해시태그 초기값 설정
      if (tempData.tags && tempData.tags.length > 0) {
        setValue('tags', tempData.tags);
      }

      // facility 초기값 설정
      if (tempData.facilityInfo) {
        if (Array.isArray(tempData.facilityInfo)) {
          // 이미 배열 형태라면 그대로 설정
          setValue('facilityInfo', tempData.facilityInfo);
        } else if (typeof tempData.facilityInfo === 'object') {
          // 객체 형태라면 배열로 변환
          const updatedFacilityInfo: { key: FacilityKey; number: number }[] = Object.entries(
            tempData.facilityInfo as Record<string, { number: number }>,
          ).map(([facilityKey, facilityValue]) => ({
            key: facilityKey as FacilityKey,
            number: facilityValue.number,
          }));
          setValue('facilityInfo', updatedFacilityInfo);
        }
      }

      // 좌표를 주소로 변환 처리
      getAddressFromCoords();
    }
  }, [data, reset, getAddressFromCoords, setValue]);

  // 할인율 계산
  const watchDiscountFields = watch('discountRate');
  const watchPriceFields = watch('pricePerDay');
  const [formattedPrice, setFormattedPrice] = useState<string>();

  useEffect(() => {
    if (watchDiscountFields && watchPriceFields) {
      const returnValue = discount(watchDiscountFields, watchPriceFields);
      const formattedReturnValue = returnValue.toLocaleString();
      setFormattedPrice(formattedReturnValue);
    }
  }, [watchDiscountFields, watchPriceFields]);

  const onSubmit = async (formData: SpaceFormData) => {
    try {
      // 폼 데이터를 제출용 데이터로 변환
      const submitData = await transformFormToSubmitData({ formData, isActivated: isOn });

      if (id) {
        // 수정 모드 (ID가 존재하는 경우)
        const res = await fetchSpaceIdUpdate(id, submitData);
        if (res) {
          router.push(`/space/${id}/view`);
        }
      } else {
        // 등록 모드 (ID가 없는 경우)
        await fetchSpaceRegister(submitData);
        router.push('/space');
      }
    } catch (error) {
      console.error('저장 중 오류 발생:', error);
      alert('저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <SpaceSettingLayout
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      isOn={isOn}
      setIsOn={setIsOn}
    >
      <section className="text-style-CAP1 flex flex-col gap-6">
        <p className="text-style-SUB1">필수 정보 작성</p>
        {/* name - 공간 이름 */}
        <div className="text-style-CAP1 flex w-full flex-col gap-2">
          <p className="after:ml-1 after:text-red after:content-['*']">
            {SpaceConfig.name.display}
          </p>
          <SpaceInputComponent
            config={SpaceConfig.name}
            control={control}
            rules={{ required: SpaceConfig.name.rules }}
          />
        </div>
        <div className="flex flex-col gap-1">
          {/* image - 이미지 */}
          <p className="after:ml-1 after:text-red after:content-['*']">이미지 등록(최대 10장)</p>
          <ImageUploadComponent
            name="imageList"
            control={control}
            rules={{ required: '이미지를 하나 이상 등록해주세요' }}
          />
        </div>
        {/* openingTime, closingTime - 공간 영업 시간 */}
        <div className="flex flex-col gap-2">
          <p className="after:ml-1 after:text-red after:content-['*']">공간 영업 시간</p>
          <div className="flex flex-row items-center gap-1">
            <TimePickerComponent
              type="openingTime"
              control={control}
              rules={{
                required: SpaceConfig.openingTime.rules,
              }}
            />{' '}
            ~{' '}
            <TimePickerComponent
              type="closingTime"
              control={control}
              rules={{
                required: SpaceConfig.closingTime.rules,
              }}
            />
          </div>
        </div>
        {/* size - 공간 크기 */}
        <div className="text-style-CAP1 flex w-full flex-col gap-2">
          <p className="after:ml-1 after:text-red after:content-['*']">
            {SpaceConfig.size.display}
          </p>
          <SpaceInputComponent
            config={SpaceConfig.size}
            control={control}
            rules={{ required: SpaceConfig.size.rules }}
          />
        </div>
      </section>
      <div>
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-style-SUB1 mb-2">더 좋은 동네 해시태그 요청</p>
            <p className="text-style-BODY2 text-medium_gray">
              공간이 위치한 동네를 잘 나타내는 태그를 1~5개 골라주세요. 저희가 확인 후 더 알맞은
              태그가 있다면 보완해드릴게요.
            </p>
          </div>
          {/* tags */}
          {Object.entries(tagList).map(([category, tags]) => (
            <TagList
              key={category}
              category={category}
              tags={tags}
              setValue={setValue}
              watch={watch}
            />
          ))}
        </div>
      </div>
      {/* pricePerDay & discountRate */}
      <section>
        <p className="text-style-SUB1 mb-6">공간 대여 가격 작성</p>
        <div className="flex flex-col gap-4">
          <div className="text-style-CAP1 flex w-full flex-col gap-2">
            <p className="after:ml-1 after:text-red after:content-['*']">
              {SpaceConfig.pricePerDay.display}
            </p>
            <SpaceInputComponent
              config={SpaceConfig.pricePerDay}
              control={control}
              rules={{ required: SpaceConfig.pricePerDay.rules }}
            />
          </div>
          <div className="text-style-CAP1 flex w-full flex-row items-end gap-2">
            <div className="text-style-CAP1 flex w-full flex-col gap-2">
              <p className="after:ml-1 after:text-red after:content-['*']">
                {SpaceConfig.discountRate.display}
              </p>
              <SpaceInputComponent
                config={SpaceConfig.discountRate}
                control={control}
                rules={{ required: SpaceConfig.discountRate.rules }}
              />
            </div>
            <div className="h-11 w-[107px] rounded-lg border border-stroke py-3 text-center text-light_gray">
              할인율 (%)
            </div>
          </div>
          {watchDiscountFields && formattedPrice && (
            <div className="text-style-SUB2 flex flex-row justify-end gap-2">
              <p className="text-red">{watchDiscountFields}% 할인</p>
              <p>{formattedPrice}원</p>
            </div>
          )}
        </div>
      </section>
      <section>
        <p className="text-style-SUB1 mb-6">공간 소개글 작성</p>
        {/* details - 자세한 소개 */}
        <div className="text-style-CAP1 flex w-full flex-col gap-2">
          <p className="after:ml-1 after:text-red after:content-['*']">
            {SpaceConfig.details.display}
          </p>
          <SpaceTextareaComponent
            config={SpaceConfig.details}
            control={control}
            rules={{ required: SpaceConfig.details.rules }}
          />
        </div>
      </section>
      <section>
        <div className="flex flex-col gap-1">
          {/* image - 이미지 */}
          <p className="text-style-SUB1">여기서 열렸던 팝업 사진 등록</p>
          <p className="text-style-BODY2 text-medium_gray">
            해당 공간에서 열렸던 팝업 사진을 10장까지 등록 가능해요.
          </p>
          <ImageUploadComponent name="popUpImageList" control={control} />
        </div>
      </section>
      <section className="text-style-CAP1 flex flex-col gap-6">
        <p className="text-style-SUB1">위치 안내 작성</p>
        <div className="relative w-full">
          <p className="after:ml-1 after:text-red after:content-['*']">위치</p>
          <div className="mb-1 mt-2 flex flex-row">
            <p
              className={`text-style-CAP1 flex h-[44px] w-full items-center rounded-lg border px-4 ${selectedAddress.postalCode ? 'text-black' : 'text-light_gray'}`}
            >
              {selectedAddress.postalCode
                ? selectedAddress.postalCode
                : '팝업 공간 주소를 검색해주세요'}
            </p>
            <button
              onClick={() => setGeocodeModalOpen(!geocodeModalOpen)}
              className={`ml-2 text-nowrap rounded-lg px-[27.5px] py-[11.5px] text-white ${geocodeModalOpen ? 'bg-black' : 'bg-light_gray'}`}
            >
              주소 검색
            </button>
          </div>
          <div className={`${geocodeModalOpen ? '' : 'hidden'}`}>
            <GeocodeModalComponent
              setGeocodeModalOpen={setGeocodeModalOpen}
              control={control}
              setValue={setValue}
              rules={{ required: SpaceConfig.address.rules }}
            />
          </div>
          {selectedAddress.roadAddress && (
            <p className="text-style-CAP1 my-1 flex h-[44px] w-full items-center rounded-lg border px-4">
              {selectedAddress.roadAddress}
            </p>
          )}
          <SpaceInputComponent config={SpaceConfig.detailAddress} control={control} />
          {errors.detailAddress && <p className="text-red">{errors.detailAddress.message}</p>}
        </div>

        {/* contactNumber - 문의 전화번호 */}
        <div className="text-style-CAP1 flex w-full flex-col gap-2">
          <p className="after:ml-1 after:text-red after:content-['*']">
            {SpaceConfig.contactNumber.display}
          </p>
          <SpaceInputComponent
            config={SpaceConfig.contactNumber}
            control={control}
            rules={{ required: SpaceConfig.contactNumber.rules }}
          />
        </div>
      </section>
      <section>
        {/* facilityInfo - 시설 이용 및 공지사항 안내 */}
        <p className="text-style-SUB1 mb-2">이용 가능한 시설·집기 등록</p>
        <FacilityList
          facilities={Object.values(FacilityConfig)}
          setValue={setValue}
          watch={watch}
        />
      </section>

      <section className="flex flex-col gap-6">
        <p className="text-style-SUB1">공지사항 안내 작성</p>
        {/* notice - 공지사항 */}
        <div className="text-style-CAP1 flex w-full flex-col gap-2">
          <p className="after:ml-1 after:text-red after:content-['*']">
            {SpaceConfig.notice.display}
          </p>
          <SpaceTextareaComponent
            config={SpaceConfig.notice}
            control={control}
            rules={{ required: SpaceConfig.notice.rules }}
          />
        </div>
      </section>
    </SpaceSettingLayout>
  );
}
