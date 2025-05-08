import SpaceSettingLayout from '@layout/spaceSettingLayout';
import { SpaceFormData } from '@type/space/spaceFormData';
import discount from '@utils/calculate/discount';
import { useGeocodeStore } from '@zustands/geocode/store';

import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import CategoryDropdownComponent from './categoryDropdown';
import GeocodeModalComponent from './geocodeModal';
import ImageUploadComponent from './imageUpload';
import SpaceInputComponent from './spaceInput';
import SpaceTextareaComponent from './spaceTextarea';
import TagInputComponent from './tagInput';
import TimePickerComponent from './timePicker';
import { SpaceConfig } from 'src/context/space/spaceConfig';

export default function SpaceSettingComponent() {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SpaceFormData>();

  const [isOn, setIsOn] = useState(true);

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
  }, [watchDiscountFields, watchPriceFields, formattedPrice]);

  // 주소
  // TODO: 주소 변환 과정 추가 (주소 <-> 좌표)
  const { selectedAddress, setSelectedAddress } = useGeocodeStore();

  // const getAddressFromCoords = useCallback(async () => {}, []);

  const [geocodeModalOpen, setGeocodeModalOpen] = useState<boolean>(false);

  const onSubmit = (formData: SpaceFormData) => {
    console.log(formData);
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
        {/* description - 한 줄 소개 */}
        <div>
          <p className="after:ml-1 after:text-red after:content-['*']">
            {SpaceConfig.description.display}
          </p>
          <SpaceInputComponent
            config={SpaceConfig.description}
            control={control}
            rules={{ required: SpaceConfig.description.rules }}
          />
        </div>
        <div className="flex flex-col gap-1">
          {/* image - 이미지 */}
          <p className="after:ml-1 after:text-red after:content-['*']">이미지 등록(최대 10장)</p>
          <ImageUploadComponent
            // TODO: 기존 링크 불러오는 작업 (정보 수정 할 때 필요)
            // editImageUrls={editData.imageList as string[]}
            control={control}
            rules={{ required: '이미지를 하나 이상 등록해주세요' }}
          />
        </div>
        {/* category - 공간 타입 */}
        <div className="flex flex-col gap-2">
          <p className="after:ml-1 after:text-red after:content-['*']">공간 유형</p>
          <CategoryDropdownComponent
            control={control}
            rules={{ required: '공간 유형을 선택해주세요' }}
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
        {/* capacity - 수용인원 */}
        <div className="text-style-CAP1 flex w-full flex-col gap-2">
          <p className="after:ml-1 after:text-red after:content-['*']">
            {SpaceConfig.capacity.display}
          </p>
          <SpaceInputComponent
            config={SpaceConfig.capacity}
            control={control}
            rules={{ required: SpaceConfig.capacity.rules }}
          />
        </div>
        {/* tags - 해시태그 */}
        <div className="text-style-CAP1 flex flex-col gap-2">
          <p className="after:ml-1 after:text-red after:content-['*']">
            {SpaceConfig.tags.display}
          </p>
          <TagInputComponent control={control} setValue={setValue} />
        </div>
      </section>
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
        {/* websiteUrl */}
        <div className="text-style-CAP1 flex w-full flex-col gap-2">
          <p>{SpaceConfig.websiteUrl.display}</p>
          <SpaceInputComponent config={SpaceConfig.websiteUrl} control={control} />
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
      <section className="flex flex-col gap-6">
        <p className="text-style-SUB1">시설 이용 및 공지사항 안내 작성</p>
        {/* facilityInfo - 시설 이용 및 공지사항 안내 */}
        <div className="text-style-CAP1 flex w-full flex-col gap-2">
          <p className="after:ml-1 after:text-red after:content-['*']">
            {SpaceConfig.facilityInfo.display}
          </p>
          <SpaceTextareaComponent
            config={SpaceConfig.facilityInfo}
            control={control}
            rules={{ required: SpaceConfig.facilityInfo.rules }}
          />
        </div>
        {/* notice - 시설 이용 안내 */}
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
