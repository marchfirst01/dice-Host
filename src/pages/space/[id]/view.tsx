// [id] 공간 조회
import { IMAGES } from '@assets/index';
import SpaceViewLayout from '@layout/spaceViewLayout';
import { SpaceIdResponse } from '@type/popUp/popUpResponse';
import discount from '@utils/calculate/discount';
import { numberFormat } from '@utils/format/numberFormat';

import React, { useEffect, useState } from 'react';

import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { fetchSpaceId } from 'src/api/space';
import { category } from 'src/context/space/category';
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

export default function SpaceIdView({
  initialData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!initialData) return <p>데이터 로드에 실패했습니다.</p>;

  // const [isDescriptionDetailView, setIsDescriptionDetailView] = useState<boolean>(false);
  const [isUsageDetailView, setIsUsageDetailView] = useState<boolean>(false);

  // 지도
  useEffect(() => {
    const mapDiv = document.getElementById('map');
    if (mapDiv && typeof naver !== 'undefined') {
      const map = new naver.maps.Map(mapDiv, {
        // lat: x, lon: y (127, 33)
        center: new naver.maps.LatLng(initialData.latitude, initialData.longitude),
        zoom: 15,
      });

      new naver.maps.Marker({
        position: new naver.maps.LatLng(initialData.latitude, initialData.longitude),
        map: map,
      });
    }
  }, [initialData]);

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
        {initialData.imageUrls.map((image, index) => {
          return (
            <SwiperSlide key={index} className="aspect-[3/2] w-full">
              <Image src={image} alt="image" fill style={{ objectFit: 'cover' }} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <section className="mt-5">
        {/* name, description */}
        <div className="mb-4">
          <p className="text-style-H2">{initialData.name}</p>
          <p className="text-style-SUB3 text-semi_light_gray">{initialData.description}</p>
        </div>
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
        <hr className="my-6" />
        {/* category, time, capacity */}
        <div className="text-style-CAP1 mb-5 flex flex-col gap-2 text-deep_gray">
          <div className="flex flex-row gap-5">
            <p>공간유형</p>
            <p>{category.find((item) => item.id === initialData.category)?.name}</p>
          </div>
          <div className="flex flex-row gap-5">
            <p>영업 시간</p>
            <p>
              {initialData.openingTime.slice(0, -3)} ~ {initialData.closingTime.slice(0, -3)}
            </p>
          </div>
          <div className="flex flex-row gap-5">
            <p>수용인원</p>
            <p>최대 {initialData.capacity}인</p>
          </div>
        </div>
        {/* tag */}
        <div className="flex w-full flex-row flex-wrap gap-1">
          {initialData.tags.map((tag, index) => (
            <p
              key={index}
              className="text-style-CAP1 rounded-full border border-stroke px-[10px] py-1 text-light_gray"
            >
              #<span className="ml-[2px] text-deep_gray">{tag}</span>
            </p>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <p className="text-style-SUB2">위치 안내</p>
        <div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row">
              <Image src={IMAGES.PlaceMarker} alt="place-marker" width={24} height={24} />
              <p className="text-style-BODY1 text-dark_gray">{initialData.address}</p>
            </div>
            {/* TODO: location(지번주소) 필요 */}
            <p
              onClick={() => console.log('주소 복사:', initialData.address)}
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
      <section className="flex flex-col gap-4">
        <p className="text-style-SUB2">시설 이용 안내</p>
        <div className={`text-style-BODY1 flex flex-col gap-1 whitespace-pre-line text-deep_gray`}>
          {initialData.facilityInfo}
        </div>
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
      </section>
      <section className="mb-4">
        <p className="text-style-SUB2 mb-4">공지사항 안내</p>
        <div className="text-style-BODY1 flex flex-col gap-1 whitespace-pre-line rounded-lg border border-stroke bg-back_gray p-4 text-deep_gray">
          {initialData.notice}
        </div>
      </section>
    </SpaceViewLayout>
  );
}
