import { IMAGES } from '@assets/index';
import { Address, SpaceFormData } from '@type/space/spaceType';
import { useGeocodeStore } from '@zustands/geocode/store';

import React, { Dispatch, SetStateAction, useState } from 'react';
import { Control, Controller, UseControllerProps, UseFormSetValue } from 'react-hook-form';

import Image from 'next/image';
import { getGeocode } from 'src/server/kakaoMap';

// 카카오 API 응답 타입 정의
interface KakaoDocument {
  x: string; // longitude
  y: string; // latitude
  road_address?: {
    address_name: string;
    zone_no: string;
  };
  address?: {
    address_name: string;
  };
}

interface KakaoResponse {
  documents: KakaoDocument[];
}

export default function GeocodeModalComponent({
  setGeocodeModalOpen,
  control,
  setValue,
  rules,
}: {
  setGeocodeModalOpen: Dispatch<SetStateAction<boolean>>;
  control: Control<SpaceFormData>;
  setValue: UseFormSetValue<SpaceFormData>;
  rules: UseControllerProps<SpaceFormData, 'address'>['rules'];
}) {
  const [searchAddress, setSearchAddress] = useState('');
  const [resultAddress, setResultAddress] = useState<Address[] | null>([]);
  const [searchError, setSearchError] = useState(false);

  const { setSelectedAddress } = useGeocodeStore();

  const handleSearch = async () => {
    const response: KakaoResponse = await getGeocode(searchAddress);

    // 카카오맵 API 응답 구조에 맞게 변경
    if (response.documents && response.documents.length > 0) {
      setSearchError(false);

      // 여러 결과를 모두 표시하도록 변경
      const addresses: Address[] = response.documents.map((doc: KakaoDocument) => {
        // 도로명 주소가 있으면 도로명 주소, 없으면 지번 주소 사용
        const roadAddress = doc.road_address?.address_name || '';
        const jibunAddress = doc.address?.address_name || '';

        // 주소 구성 요소 파싱
        const addressParts = (roadAddress || jibunAddress).split(' ');
        let sido = addressParts[0] || '';
        const sigugun = addressParts[1] || ''; // const로 변경

        // 서울특별시 -> 서울로 변경
        if (sido === '서울특별시') {
          sido = '서울';
        }

        // 우편번호는 카카오 API에서 제공하지 않으므로 빈 문자열
        const postalCode = doc.road_address?.zone_no || '';

        // x: longitude(경도), y: latitude(위도)
        const longitude = doc.x;
        const latitude = doc.y;

        return {
          jibunAddress,
          roadAddress,
          sido,
          sigugun,
          postalCode,
          longitude: Number(longitude),
          latitude: Number(latitude),
        };
      });

      setResultAddress(addresses);
    } else {
      console.error('주소를 찾을 수 없습니다.');
      setSearchError(true);
      setResultAddress([]);
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
                  {address.postalCode && <p className="text-red">{address.postalCode}</p>}
                  {address.roadAddress && (
                    <p>
                      <span className="border border-blue-200 text-blue-200">도로명</span>{' '}
                      {address.roadAddress}
                    </p>
                  )}
                  {address.jibunAddress && (
                    <p>
                      <span className="border border-blue-200 text-blue-200">지번</span>{' '}
                      {address.jibunAddress}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div className="p-6">
                {searchError && (
                  <p className="text-style-SUB2 mb-2">입력하신 주소를 찾을 수 없습니다.</p>
                )}
                <p className="text-style-H2">tip</p>
                <p className="mt-1">
                  아래와 같은 조합으로 검색을 하시면 더 정확한 결과가 검색됩니다.
                </p>
                <p className="mt-2">도로명 + 건물번호</p>
                <p className="text-blue-400">예) 판교역로 166, 제주 첨단로 242</p>
                <p className="mt-2">지역명(동/리) + 번지</p>
                <p className="text-blue-400">예) 백현동 532, 제주 영평동 2181</p>
                <p className="mt-2">지역명(동/리) + 건물명(아파트명)</p>
                <p className="text-blue-400">예) 분당 주공, 연수동 주공 3차</p>
                <p className="mt-2">건물명</p>
                <p className="text-blue-400">예) 롯데월드타워, 63빌딩</p>
              </div>
            )}
          </div>
        );
      }}
    />
  );
}
