import { IMAGES } from '@assets/index';
import { Reservation, ReservationStatus } from '@type/reservation';
import { calculateDaysBetween } from '@utils/calculateDays';
import { numberFormat } from '@utils/format/numberFormat';

import React from 'react';

import Image from 'next/image';
import { fetchReservationAccept, fetchReservationDecline } from 'src/api/reservation';

export default function ReservationItemComponent({
  reservationItem,
  status,
}: {
  reservationItem: Reservation;
  status: ReservationStatus;
}) {
  const handleReservationAccept = async (reservationId: number) => {
    const res = await fetchReservationAccept(reservationId);
    if (res) alert('예약 수락');
  };
  const handleReservationDecline = async (reservationId: number) => {
    const res = await fetchReservationDecline(reservationId);
    if (res) alert('예약 거절');
  };

  return (
    <div>
      <p className="text-style-CAP2 flex justify-end text-light_gray">
        {reservationItem.startDate} {reservationItem.endDate}
      </p>
      <div className="rounded-lg border border-stroke p-4">
        <div className="flex cursor-pointer flex-row justify-between rounded-lg border border-stroke py-4 pl-3 pr-[3px]">
          <p className="text-style-SUB3">{reservationItem.brandName}</p>
          <Image className="-rotate-90" src={IMAGES.ArrowDownGray} alt="arrow" />
        </div>
        <div className="my-6 flex flex-row justify-between">
          <div className="flex flex-col">
            <p className="text-style-CAP1 mt-2 text-medium_gray">
              {reservationItem.city} · {reservationItem.district}
            </p>
            <p className="text-style-H2">{reservationItem.spaceName}</p>
            <p className="text-style-CAP1 mt-2 text-light_gray">
              {reservationItem.size}m² · {reservationItem.capacity}명 수용가능
            </p>
          </div>
          <div className="relative aspect-square size-[120px]">
            <Image
              className="rounded-lg"
              src={reservationItem.spaceImage}
              alt="image"
              fill={true}
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row justify-between">
            <p className="text-style-CAP1 text-semi_light_gray">대여 기간</p>
            <p className="text-style-CAP1 text-deep_gray">
              {reservationItem.startDate} ~ {reservationItem.endDate}
              <span className={`ml-2 ${status === 'DECLINE' ? 'text-deep_gray' : 'text-purple'}`}>
                ({calculateDaysBetween(reservationItem.startDate, reservationItem.endDate)}일)
              </span>
            </p>
          </div>
          <div className="mb-4 flex flex-row justify-between">
            <p className="text-style-CAP1 text-semi_light_gray">총 대여 가격</p>
            <p
              className={`text-style-SUB1 ${status === 'DECLINE' && 'text-deep_gray line-through'}`}
            >
              {numberFormat(reservationItem.totalPrice)}원
            </p>
          </div>
        </div>
        {status === 'PENDING' && (
          <div className="flex flex-row gap-2">
            <button className="rounded-lg border p-[14px]">
              <Image src={IMAGES.SendBlack} alt="send" width={24} height={24} />
            </button>
            <button className="text-style-BTN1 rounded-lg border border-stroke px-[32.75px] py-[15.5px] text-medium_gray">
              대기 거절
            </button>
            <button
              onClick={() => handleReservationAccept(reservationItem.reservationId)}
              className="text-style-BTN1 rounded-lg border border-stroke bg-black px-[32.75px] py-[15.5px] text-white"
            >
              예약 수락
            </button>
          </div>
        )}
        {status === 'ACCEPT' && (
          <div className="flex flex-row gap-2">
            <button className="rounded-lg border p-[14px]">
              <Image src={IMAGES.SendBlack} alt="send" width={24} height={24} />
            </button>
            <button
              onClick={() => handleReservationDecline(reservationItem.reservationId)}
              className="text-style-BTN1 w-full rounded-lg border border-stroke text-medium_gray"
            >
              예약 거절
            </button>
          </div>
        )}
        {status === 'DECLINE' && (
          <button className="text-style-BTN1 w-full rounded-lg bg-light_gray py-[15.5px] text-white">
            예약 취소됨
          </button>
        )}
      </div>
    </div>
  );
}
