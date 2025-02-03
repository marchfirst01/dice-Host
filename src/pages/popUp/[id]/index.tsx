import { IMAGES } from '@assets/index';
import PopUpDetailLayout from '@layout/popUpDetailLayout';

import React, { useEffect, useState } from 'react';

import { dummyData } from './popUpDetailDummy';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getGeocode } from 'src/server/naverMap';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const PopUpDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [detailDummyData] = useState(dummyData);
  const [isDescriptionDetailView, setIsDescriptionDetailView] = useState<boolean>(false);
  const [isUsageDetailView, setIsUsageDetailView] = useState<boolean>(false);
  const [geoLocation, setGeoLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const handleGeocode = async () => {
    try {
      const response = await getGeocode(dummyData.location);
      console.log(response);
      setGeoLocation({
        latitude: parseFloat(response.addresses[0].y),
        longitude: parseFloat(response.addresses[0].x),
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGeocode();
  }, []);

  useEffect(() => {
    const mapDiv = document.getElementById('map');
    if (mapDiv) {
      const map = new naver.maps.Map(mapDiv, {
        center: new naver.maps.LatLng(geoLocation.latitude, geoLocation.longitude),
        zoom: 15,
      });

      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(geoLocation.latitude, geoLocation.longitude),
        map: map,
      });
    }
  }, [geoLocation]);

  return (
    <PopUpDetailLayout>
      {/* PopUpDetailPage id: {id} */}
      <Swiper
        className="aspect-[1/1] w-full"
        modules={[Pagination]}
        direction="horizontal"
        slidesPerView={1}
        pagination={{ clickable: true, type: 'fraction' }}
      >
        {dummyData.imageList.map((image) => (
          <SwiperSlide className="aspect-[3/2] w-full">
            <Image src={image} alt="image" layout="fill" objectFit="cover" />
          </SwiperSlide>
        ))}
      </Swiper>
      <section className="mt-5">
        <div className="mb-4">
          <p className="font-H2 text-H2 leading-H2">{detailDummyData.name}</p>
          <p className="font-SUB3 text-SUB3 leading-SUB3 text-semi_light_gray">
            {detailDummyData.subtitle}
          </p>
        </div>
        <div>
          <p className="font-CAP1 text-CAP1 leading-CAP1 text-light_gray">1일 대여</p>
          <div className="flex flex-row gap-[6px]">
            <p className="font-SUB2 text-SUB2 leading-SUB2 text-purple">
              {detailDummyData.salePercent}%
            </p>
            <p className="font-SUB1 text-SUB1 leading-SUB1">{detailDummyData.price}원</p>
          </div>
        </div>
        <hr className="my-6" />
        <div className="mb-5 flex flex-col gap-2 font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">
          <div className="flex flex-row gap-5">
            <p className="">공간유형</p>
            <p className="">{detailDummyData.type}</p>
          </div>
          <div className="flex flex-row gap-5">
            <p className="">영업 시간</p>
            <p className="">{detailDummyData.time}</p>
          </div>
          <div className="flex flex-row gap-5">
            <p className="">수용인원</p>
            <p className="">최대 {detailDummyData.numOfPeople}인</p>
          </div>
        </div>
        <div className="flex w-full flex-row flex-wrap gap-1">
          {detailDummyData.hashTagList.map((hashTag) => (
            <p className="rounded-full border border-stroke px-[10px] py-1 font-CAP1 text-CAP1 leading-CAP1 text-light_gray">
              #<span className="ml-[2px] text-deep_gray">{hashTag}</span>
            </p>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <p className="font-SUB2 text-SUB2 leading-SUB2">팝업 공간 소개</p>
        <p
          className={`${isDescriptionDetailView ? '' : 'line-clamp-3'} w-full font-BODY1 text-BODY1 leading-BODY1 text-deep_gray`}
        >
          {detailDummyData.description}
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
                {dummyData.location}
              </p>
            </div>
            <p
              onClick={() => console.log('주소 복사:', dummyData.location)}
              className="cursor-pointer font-CAP2 text-CAP2 leading-CAP2 text-medium_gray underline"
            >
              주소 복사
            </p>
          </div>
          <p className="ml-[26px] font-BODY1 text-BODY1 leading-BODY1 text-medium_gray">
            · {dummyData.locationDescription}
          </p>
        </div>
        <div className="h-[160px] w-full rounded-xl border border-stroke bg-light_gray">
          {/* 지도 추가하기 */}
          <div id="map" style={{ width: '100%', height: '160px' }} />
        </div>
        <button
          onClick={() => window.open(dummyData.homepage)}
          className="flex h-[52px] w-full cursor-pointer flex-row items-center justify-center gap-1 rounded-lg border border-stroke text-medium_gray"
        >
          <Image className="" src={IMAGES.Globe} alt="globe" width={24} height={24} />
          웹사이트 바로가기
        </button>
      </section>
      <section className="flex flex-col gap-4">
        <p className="font-SUB2 text-SUB2 leading-SUB2">시설 이용 안내</p>
        <div className={`flex flex-col gap-1 font-BODY1 text-BODY1 leading-BODY1 text-deep_gray`}>
          {(isUsageDetailView
            ? dummyData.usageInformation
            : dummyData.usageInformation.slice(0, 3)
          ).map((information, index) => (
            <p key={index}>· {information}</p>
          ))}
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
        <div className="flex flex-col gap-1 rounded-lg border border-stroke bg-back_gray p-4 font-BODY1 text-BODY1 leading-BODY1 text-deep_gray">
          {dummyData.noticeInformation.map((information) => (
            <p>* {information}</p>
          ))}
        </div>
      </section>
    </PopUpDetailLayout>
  );
};

export default PopUpDetailPage;
