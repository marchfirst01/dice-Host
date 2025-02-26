import { IMAGES } from '@assets/index';
import PopUpDetailLayout from '@layout/popUpDetailLayout';
import { SpaceIdResponse } from '@type/popUp/popUpResponse';

import React, { useEffect, useState } from 'react';

import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { fetchSpaceId } from 'src/api/popUp';
import { category } from 'src/context/popUpSetting/category';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export const getServerSideProps: GetServerSideProps<{ initialData: SpaceIdResponse }> = async (
  context: GetServerSidePropsContext,
) => {
  const { id } = context.query as { id: string };
  try {
    const initialData = await fetchSpaceId(id);
    return { props: { initialData } };
  } catch (error) {
    console.log('getServerSideProps error: ', error);
    return { props: { initialData: {} as SpaceIdResponse } };
  }
};

export default function PopUpDetailPage({
  initialData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isDescriptionDetailView, setIsDescriptionDetailView] = useState<boolean>(false);
  const [isUsageDetailView, setIsUsageDetailView] = useState<boolean>(false);

  useEffect(() => {
    const mapDiv = document.getElementById('map');
    if (mapDiv && typeof naver !== 'undefined') {
      const map = new naver.maps.Map(mapDiv, {
        center: new naver.maps.LatLng(initialData.latitude, initialData.longitude),
        zoom: 15,
      });

      new naver.maps.Marker({
        position: new naver.maps.LatLng(initialData.latitude, initialData.longitude),
        map: map,
      });
    }
  }, [initialData]);

  return (
    initialData && (
      <PopUpDetailLayout>
        <Swiper
          className="aspect-[1/1] w-full"
          modules={[Pagination]}
          direction="horizontal"
          slidesPerView={1}
          pagination={{ clickable: true, type: 'fraction' }}
        >
          {initialData.imageUrls.map((image, index) => {
            // TODO: 'www.example.com' 삭제필요
            const imageUrl =
              image === 'www.example.com' ? 'https://placehold.co/600x400/png' : image;
            return (
              <SwiperSlide key={index} className="aspect-[3/2] w-full">
                <Image src={imageUrl} alt="image" layout="fill" objectFit="cover" />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <section className="mt-5">
          <div className="mb-4">
            <p className="font-H2 text-H2 leading-H2">{initialData.name}</p>
            <p className="font-SUB3 text-SUB3 leading-SUB3 text-semi_light_gray">
              {initialData.description}
            </p>
          </div>
          <div>
            <p className="font-CAP1 text-CAP1 leading-CAP1 text-light_gray">1일 대여</p>
            <div className="flex flex-row gap-[6px]">
              <p className="font-SUB2 text-SUB2 leading-SUB2 text-purple">
                {initialData.discountRate}%
              </p>
              <p className="font-SUB1 text-SUB1 leading-SUB1">{initialData.pricePerDay}원</p>
            </div>
          </div>
          <hr className="my-6" />
          <div className="mb-5 flex flex-col gap-2 font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">
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
          <div className="flex w-full flex-row flex-wrap gap-1">
            {initialData.tags.map((tag, index) => (
              <p
                key={index}
                className="rounded-full border border-stroke px-[10px] py-1 font-CAP1 text-CAP1 leading-CAP1 text-light_gray"
              >
                #<span className="ml-[2px] text-deep_gray">{tag}</span>
              </p>
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <p className="font-SUB2 text-SUB2 leading-SUB2">팝업 공간 소개</p>
          <p
            className={`${isDescriptionDetailView ? '' : 'line-clamp-3'} w-full font-BODY1 text-BODY1 leading-BODY1 text-deep_gray`}
          >
            {initialData.details}
          </p>
          <div className="relative flex w-full">
            <button
              onClick={() => setIsDescriptionDetailView(!isDescriptionDetailView)}
              className="h-[52px] w-full cursor-pointer rounded-lg border border-stroke text-medium_gray"
            >
              {isDescriptionDetailView ? '간략히 보기' : '자세히 보기'}
            </button>
            {isDescriptionDetailView ? (
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
        <section className="flex flex-col gap-4">
          <p className="font-SUB2 text-SUB2 leading-SUB2">위치 안내</p>
          <div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row">
                <Image src={IMAGES.PlaceMarker} alt="place-marker" width={24} height={24} />
                <p className="font-BODY1 text-BODY1 leading-BODY1 text-dark_gray">
                  {initialData.address}
                </p>
              </div>
              {/* TODO: location(지번주소) 필요 */}
              <p
                onClick={() => console.log('주소 복사:', initialData.address)}
                className="cursor-pointer font-CAP2 text-CAP2 leading-CAP2 text-medium_gray underline"
              >
                주소 복사
              </p>
            </div>
            <p className="ml-[26px] font-BODY1 text-BODY1 leading-BODY1 text-medium_gray">
              · {initialData.detailAddress}
            </p>
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
          <p className="font-SUB2 text-SUB2 leading-SUB2">시설 이용 안내</p>
          <div
            className={`flex flex-col gap-1 whitespace-pre-line font-BODY1 text-BODY1 leading-BODY1 text-deep_gray`}
          >
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
          <p className="mb-4 font-SUB2 text-SUB2 leading-SUB2">공지사항 안내</p>
          <div className="flex flex-col gap-1 whitespace-pre-line rounded-lg border border-stroke bg-back_gray p-4 font-BODY1 text-BODY1 leading-BODY1 text-deep_gray">
            {initialData.notice}
          </div>
        </section>
      </PopUpDetailLayout>
    )
  );
}
