import { IMAGES } from '@assets/index';
import { ReservationItem, ReservationStatus } from '@type/reservation';

import React from 'react';

import Image from 'next/image';

export default function ReservationItemComponent({
  reservationItem,
  status,
}: {
  reservationItem: ReservationItem;
  status: ReservationStatus;
}) {
  return (
    <div>
      <p className="flex justify-end font-CAP2 text-CAP2 leading-CAP2 text-light_gray">
        {reservationItem.reservationDate} {reservationItem.reservationoTime}
      </p>
      <div className="rounded-lg border border-stroke p-4">
        <div className="flex cursor-pointer flex-row justify-between rounded-lg border border-stroke py-4 pl-3 pr-[3px]">
          <p className="font-SUB3 text-SUB3 leading-SUB3">{reservationItem.brandName}</p>
          <Image className="-rotate-90" src={IMAGES.ArrowDownGray} alt="arrow" />
        </div>
        <div className="my-6 flex flex-row justify-between">
          <div className="flex flex-col">
            <p className="mt-2 font-CAP1 text-CAP1 leading-CAP1 text-medium_gray">
              {reservationItem.cityName} · {reservationItem.neighborhoodName}
            </p>
            <p className="font-H2 text-H2 leading-H2">{reservationItem.name}</p>
            <p className="mt-2 font-CAP1 text-CAP1 leading-CAP1 text-light_gray">
              {reservationItem.area}m² · {reservationItem.capacity}명 수용가능
            </p>
          </div>
          <div className="relative aspect-square size-[120px]">
            <Image
              className="rounded-lg"
              src={reservationItem.imageUrl}
              alt="image"
              fill={true}
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row justify-between">
            <p className="font-CAP1 text-CAP1 leading-CAP1 text-semi_light_gray">대여 기간</p>
            <p className="font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">
              {reservationItem.startDate} ~ {reservationItem.endDate}
              <span className={`ml-2 ${status === 'cancled' ? 'text-deep_gray' : 'text-purple'}`}>
                ({reservationItem.date}일)
              </span>
            </p>
          </div>
          <div className="mb-4 flex flex-row justify-between">
            <p className="font-CAP1 text-CAP1 leading-CAP1 text-semi_light_gray">총 대여 가격</p>
            <p
              className={`font-SUB1 text-SUB1 leading-SUB1 ${status === 'cancled' && 'text-deep_gray line-through'}`}
            >
              {reservationItem.totalPrice}원
            </p>
          </div>
        </div>
        {status === 'pending' && (
          <div className="flex flex-row gap-2">
            <button className="rounded-lg border p-[14px]">
              <Image src={IMAGES.SendBlack} alt="send" width={24} height={24} />
            </button>
            <button className="rounded-lg border border-stroke px-[32.75px] py-[15.5px] font-BTN1 text-BTN1 leading-BTN1 text-medium_gray">
              대기 거절
            </button>
            <button className="rounded-lg border border-stroke bg-black px-[32.75px] py-[15.5px] font-BTN1 text-BTN1 leading-BTN1 text-white">
              예약 수락
            </button>
          </div>
        )}
        {status === 'confirmed' && (
          <div className="flex flex-row gap-2">
            <button className="rounded-lg border p-[14px]">
              <Image src={IMAGES.SendBlack} alt="send" width={24} height={24} />
            </button>
            <button className="w-full rounded-lg border border-stroke font-BTN1 text-BTN1 leading-BTN1 text-medium_gray">
              예약 거절
            </button>
          </div>
        )}
        {status === 'cancled' && (
          <button className="w-full rounded-lg bg-light_gray py-[15.5px] font-BTN1 text-BTN1 leading-BTN1 text-white">
            예약 취소됨
          </button>
        )}
      </div>
    </div>
  );
}
