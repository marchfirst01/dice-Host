import { IMAGES } from '@assets/index';
import { Address, PopUpFormData } from '@type/popUpSetting';
import { useGeocodeStore } from '@zustands/geocode/store';

import React, { Dispatch, SetStateAction, useState } from 'react';
import { Control, Controller, UseControllerProps, UseFormSetValue } from 'react-hook-form';

import Image from 'next/image';
import { getGeocode } from 'src/server/naverMap';

export default function GeocodeModalComponent({
  setGeocodeModalOpen,
  control,
  setValue,
  rules,
}: {
  setGeocodeModalOpen: Dispatch<SetStateAction<boolean>>;
  control: Control<PopUpFormData>;
  setValue: UseFormSetValue<PopUpFormData>;
  rules: UseControllerProps<PopUpFormData, 'address'>['rules'];
}) {
  const [searchAddress, setSearchAddress] = useState('');
  const [resultAddress, setResultAddress] = useState<Address[] | null>([]);

  const { setSelectedAddress } = useGeocodeStore();

  const handleSearch = async () => {
    const response = await getGeocode(searchAddress);

    // TODO: 검색 결과 여러 개 표시 - 현재는 한 개의 데이터만 표시됨 ex) 사가정로 검색 -> 사가정로 1, 사가정로 2 ... 등 여러 결과가 표시돼야함
    if (response.status === 'OK' && response.meta.totalCount > 0) {
      const result = response.addresses[0];
      const jibunAddress = result.jibunAddress;
      const roadAddress = result.roadAddress;
      // 서울특별시 -> 서울로 저장
      const sido =
        result.addressElements[0].longName === '서울특별시'
          ? '서울'
          : result.addressElements[0].longName;
      const sigugun = result.addressElements[1].longName;
      const postalCode = result.addressElements[8].longName;
      // x: longitude(경도), y: latitude(위도)
      const longitude = result.x;
      const latitude = result.y;
      setResultAddress([
        {
          jibunAddress,
          roadAddress,
          sido,
          sigugun,
          postalCode,
          longitude: Number(longitude), // 경도 (127)
          latitude: Number(latitude), // 위도 (33)
        },
      ]);
    } else {
      console.error('주소를 찾을 수 없습니다.');
    }
  };

  const handleClickAddress = (address: Address) => {
    setSelectedAddress(address);
    setGeocodeModalOpen(false);
    setValue('address', address.roadAddress);
    setValue('city', address.sido);
    setValue('district', address.sigugun);
    setValue('latitude', address.latitude);
    setValue('longitude', address.longitude);
  };

  return (
    <Controller
      name="address"
      control={control}
      rules={rules}
      render={() => {
        return (
          <div className="border border-stroke px-5">
            <div className="relative">
              <input
                className="w-full border-b border-black px-2 py-4"
                placeholder="예) 판교역로 166, 분당 주공"
                onChange={(e) => setSearchAddress(e.target.value)}
              />
              <Image
                onClick={() => handleSearch()}
                className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                src={IMAGES.Search}
                alt="search"
              />
            </div>
            {resultAddress && resultAddress.length > 0 ? (
              resultAddress.map((address, index) => (
                <div
                  key={index}
                  onClick={() => handleClickAddress(address)}
                  className="my-4 cursor-pointer p-2"
                >
                  <p className="text-red">{address.postalCode}</p>
                  <p>
                    <span className="border border-blue-200 text-blue-200">도로명</span>{' '}
                    {address.roadAddress}
                  </p>
                  <p>
                    <span className="border border-blue-200 text-blue-200">지번</span>{' '}
                    {address.jibunAddress}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-6">
                <p className="font-H2 text-H2 leading-H2">tip</p>
                <p className="mt-1">
                  아래와 같은 조합으로 검색을 하시면 더 정확한 결과과 검색됩니다.
                </p>
                <p className="mt-2">도로명 + 건물번호</p>
                <p className="text-blue-400">예) 판교역로 166, 제주 첨단로 242</p>
                <p className="mt-2">지역명(동/리) + 번지</p>
                <p className="text-blue-400">예) 백현동 532, 제주 영평동 2181</p>
                <p className="mt-2">지역명(동/리) + 건물명(아파트명)</p>
                <p className="text-blue-400">예) 분당 주공, 연수동 주공 3차</p>
                <p className="mt-2">사서함명 + 번호</p>
                <p className="text-blue-400">예) 분당우체국 사서함 1-100</p>
              </div>
            )}
          </div>
        );
      }}
    />
  );
}
