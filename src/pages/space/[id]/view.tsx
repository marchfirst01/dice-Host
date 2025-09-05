// [id] 공간 조회
import { IMAGES } from '@assets/index';
import { ImageItem } from '@components/common/ImageItem';
import FacilityItem from '@components/space/facilityItem';
import LocalAnalysisCard from '@components/space/localAnalysisCard';
import SpaceViewLayout from '@layout/spaceViewLayout';
import { FacilityKey } from '@type/common';
import { SpaceIdResponse } from '@type/space/spaceType';
import discount from '@utils/calculate/discount';
import { numberFormat } from '@utils/format/numberFormat';

import React, { useEffect, useState } from 'react';

import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { fetchSpaceId } from 'src/api/space';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.query as { id: string };
  try {
    const initialData = await fetchSpaceId(id);
    return { props: { initialData } };
  } catch (error) {
    console.log('getServerSideProps error (spaceIdView): ', error);
    return { props: { initialData: {} as SpaceIdResponse } };
  }
};

const tempTag = ['20대 여성이 가장 많아요', '데이트 장소 핫플', '주말에 사람이 가장 많아요'];
const tempFacility: { id: FacilityKey; number: number }[] = [
  { id: 'waterPurifier', number: 1 },
  { id: 'couch', number: 4 },
  { id: 'tv', number: 1 },
  { id: 'firealarm', number: 0 },
  { id: 'desktop', number: 5 },
];

export default function SpaceIdView({
  initialData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // React Hook들을 조건부 렌더링 이전에 모두 선언
  const [isUsageDetailView, setIsUsageDetailView] = useState<boolean>(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // 카카오맵 초기화
  useEffect(() => {
    // initialData가 없으면 early return
    if (!initialData || !initialData.latitude || !initialData.longitude) {
      return;
    }

    const initializeMap = () => {
      if (window.kakao && window.kakao.maps) {
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
          const mapOption = {
            center: new window.kakao.maps.LatLng(initialData.latitude, initialData.longitude),
            level: 3,
          };

          const map = new window.kakao.maps.Map(mapContainer, mapOption);

          const markerPosition = new window.kakao.maps.LatLng(
            initialData.latitude,
            initialData.longitude,
          );
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });

          marker.setMap(map);
          setMapLoaded(true);
        }
      }
    };

    // 카카오 스크립트가 이미 로드되어 있다면 바로 초기화
    if (window.kakao && window.kakao.maps) {
      initializeMap();
    } else {
      // 스크립트 로드를 기다림 (최대 5초)
      let attempts = 0;
      const maxAttempts = 50; // 5초 (100ms * 50)

      const checkKakao = setInterval(() => {
        attempts++;
        if (window.kakao && window.kakao.maps) {
          clearInterval(checkKakao);
          initializeMap();
        } else if (attempts >= maxAttempts) {
          clearInterval(checkKakao);
          console.error('카카오맵 스크립트 로드 실패');
        }
      }, 100);

      return () => clearInterval(checkKakao);
    }
  }, [initialData]);

  // 조건부 렌더링을 Hook 선언 이후에 배치
  if (!initialData) {
    return <p>데이터 로드에 실패했습니다.</p>;
  }

  console.log(initialData);
  return (
    <SpaceViewLayout>
      <Swiper
        className="aspect-[1/1] w-full"
        modules={[Pagination]}
        direction="horizontal"
        slidesPerView={1}
        pagination={{ clickable: true, type: 'fraction' }}
      >
        {initialData.imageUrls?.map((image, index) => {
          return (
            <SwiperSlide key={index} className="aspect-[3/2] w-full">
              <Image src={image} alt="image" fill style={{ objectFit: 'cover' }} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <section className="mt-5 flex flex-col gap-4">
        <div>
          {/* name, description */}
          <div className="mb-4">
            <p className="text-style-H2">{initialData.name}</p>
          </div>
          {/* TODO: 가까운 지하철역 정보 추가 */}
          {/* discount, pricePerDay */}
          <div className="flex flex-col">
            <div className="flex flex-row gap-1">
              <p className="text-style-CAP1 text-dark_gray">1일 대여</p>
              <p className="text-style-CAP1 text-light_gray line-through">
                {numberFormat(initialData.pricePerDay)}
              </p>
            </div>
            <div className="flex flex-row gap-[6px]">
              <p className="text-style-SUB2 text-purple">{initialData.discountRate}%</p>
              <p className="text-style-SUB2 text-dark_gray">
                {numberFormat(discount(initialData.discountRate, initialData.pricePerDay))}원
              </p>
            </div>
          </div>
        </div>
        <LocalAnalysisCard />
        {/* time, size, tags */}
        <div className="text-style-CAP1 mb-5 flex flex-col gap-2 text-deep_gray">
          <div className="flex flex-row gap-5">
            <p>영업 시간</p>
            <p>
              {initialData.openingTime?.slice(0, -3)} ~ {initialData.closingTime?.slice(0, -3)}
            </p>
          </div>
          <div className="flex flex-row gap-5">
            <p>공간 크기</p>
            {/* TODO: 평 계산 과정 추가 */}
            <p>{initialData.size}㎡</p>
          </div>
          <hr className="my-5" />
          <p className="text-style-CAP1 text-black">동네 해시태그</p>
          <div className="flex flex-wrap gap-1">
            {tempTag.map((tag, index) => (
              <div
                key={index}
                className={`text-style-CAP1 w-fit rounded-full border border-stroke px-[10px] py-1 text-deep_gray`}
              >
                <p># {tag}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* details */}
      <section className="flex flex-col gap-4">
        <p className="text-style-SUB2">팝업 공간 소개</p>
        <p className="text-style-BODY1 text-deep_gray">{initialData.details}</p>
      </section>
      {/* popUpImageUrls */}
      <section>
        <p className="text-style-SUB2 mb-4">여기서 열렸던 팝업 사진</p>
        <div className="flex h-32 w-full flex-row gap-1 overflow-x-scroll">
          {/* TODO: imageUrls -> popUpImageUrls */}
          {initialData.imageUrls?.length > 0 &&
            initialData.imageUrls.map((item, index) => (
              <ImageItem key={index} size={32} imageUrl={item} />
            ))}
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <p className="text-style-SUB2">시설 이용 안내</p>
        <div className="grid grid-cols-2 gap-4">
          {tempFacility
            .slice(0, tempFacility.length > 4 && !isUsageDetailView ? 4 : tempFacility.length)
            .map((item, index) => (
              <FacilityItem key={index} facility={item} />
            ))}
        </div>

        {/* 아이템이 5개 이상일 때만 버튼 표시 */}
        {tempFacility.length > 4 && (
          <div className="relative flex w-full">
            <button
              onClick={() => setIsUsageDetailView(!isUsageDetailView)}
              className="h-[52px] w-full cursor-pointer rounded-lg border border-stroke text-medium_gray"
            >
              {isUsageDetailView ? '간략히 보기' : '자세히 보기'}
            </button>
            {isUsageDetailView ? (
              <Image
                className="absolute right-0 top-0 mx-4 translate-y-1/2 rotate-180"
                src={IMAGES.ArrowDownGray}
                alt="arrow-down"
                width={24}
                height={24}
              />
            ) : (
              <Image
                className="absolute right-0 top-0 mx-4 translate-y-1/2"
                src={IMAGES.ArrowDownGray}
                alt="arrow-down"
                width={24}
                height={24}
              />
            )}
          </div>
        )}
      </section>
      <section className="flex flex-col gap-4">
        <p className="text-style-SUB2">위치 안내</p>
        <div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row">
              <Image src={IMAGES.PlaceMarker} alt="place-marker" width={24} height={24} />
              <p className="text-style-BODY1 text-dark_gray">{initialData.address}</p>
            </div>
            <p
              onClick={() => {
                navigator.clipboard
                  .writeText(initialData.address)
                  .then(() => {
                    alert('주소가 복사되었습니다.');
                  })
                  .catch(() => {
                    console.log('주소 복사:', initialData.address);
                  });
              }}
              className="text-style-CAP2 cursor-pointer text-medium_gray underline"
            >
              주소 복사
            </p>
          </div>
          {initialData.detailAddress && (
            <p className="text-style-BODY1 ml-[26px] text-medium_gray">
              · {initialData.detailAddress}
            </p>
          )}
        </div>
        <div className="h-[160px] w-full rounded-xl border border-stroke bg-light_gray">
          {!mapLoaded && (
            <div className="flex size-full items-center justify-center">
              <p className="text-medium_gray">지도 로딩 중...</p>
            </div>
          )}
          <div id="map" style={{ width: '100%', height: '160px' }} />
        </div>
        <button
          onClick={() => window.open(initialData.websiteUrl)}
          className="flex h-[52px] w-full cursor-pointer flex-row items-center justify-center gap-1 rounded-lg border border-stroke text-medium_gray"
        >
          <Image src={IMAGES.Globe} alt="globe" width={24} height={24} />
          웹사이트 바로가기
        </button>
      </section>

      <section className="mb-4">
        <p className="text-style-SUB2 mb-4">공지사항 안내</p>
        <div className="text-style-BODY1 flex flex-col gap-1 whitespace-pre-line rounded-lg border border-stroke bg-back_gray p-4 text-deep_gray">
          {initialData.notices}
        </div>
      </section>
    </SpaceViewLayout>
  );
}
