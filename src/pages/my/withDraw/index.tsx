import { IMAGES } from '@assets/index';
import DragModalComponent from '@components/common/dragModal';

import React, { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { withDrawConfig } from 'src/context/withDraw/withDrawConfig';

export default function WithDrawPage() {
  const router = useRouter();
  const { name } = router.query;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative h-screen">
      <header className="flex flex-row bg-white">
        <div onClick={() => router.back()} className="cursor-pointer px-3 py-3">
          <Image src={IMAGES.ArrowBackBlack} alt="back" />
        </div>
        <p className="flex-grow py-3 text-center font-SUB3 text-SUB3 leading-SUB3">탈퇴하기</p>
        <div className="w-12" />
      </header>
      <div className="px-5 py-8">
        <p className="font-SUB2 text-SUB2 leading-SUB2">
          {name}님과 이별한다니
          <br />
          너무 아쉽습니다
        </p>
        <p className="mt-2 font-BODY1 text-BODY1 leading-BODY1 text-medium_gray">
          회원님께서 탈퇴를 원하신다니 저희 서비스가 많이 부족하고 미흡했나 봅니다. 더 나은 서비스를
          제공하는 플랫폼이 될 수 있도록 노력하겠습니다.
        </p>
        <p className="mt-8 font-SUB2 text-SUB2 leading-SUB2">탈퇴 전 확인 부탁드립니다</p>
        <p className="mt-2 font-BODY1 text-BODY1 leading-BODY1 text-medium_gray">
          계정을 삭제하시면 예약, 프로필, 찜, 쪽지 등 모든 활동 정보가 삭제됩니다. 계정 삭제 후
          00일간 재가입할 수 없습니다.
        </p>
        <p className="mt-8 font-SUB3 text-SUB3 leading-SUB3">
          더 나은 다이스가 될 수 있도록
          <br /> 탈퇴하시는 이유를 알려주시면 감사하겠습니다
        </p>
        <div
          onClick={openModal}
          className="mt-2 flex h-11 w-full cursor-pointer flex-row items-center justify-between rounded-lg border border-light_gray px-4 font-BODY2 text-BODY2 leading-BODY2"
        >
          {reason ? reason : '탈퇴하시는 이유가 무엇인가요?'}
          <Image src={IMAGES.ArrowDownGray} alt="arrow" />
        </div>
        {reason === '기타' && (
          <textarea
            className="mt-2 h-28 w-full rounded-lg border p-2"
            placeholder="탈퇴하는 이유를 적어주세요"
          />
        )}
        <DragModalComponent isOpen={isModalOpen} onClose={closeModal}>
          <div className="px-5 pb-[64px] pt-11 font-SUB3 text-SUB3 leading-SUB3">
            {withDrawConfig.map((item, index) => (
              <p
                key={index}
                onClick={() => {
                  setReason(item);
                  closeModal();
                }}
                className="flex h-[52px] w-full items-center px-4 text-medium_gray hover:bg-back_gray hover:text-black"
              >
                {item}
              </p>
            ))}
          </div>
        </DragModalComponent>
        <div className="absolute bottom-0 left-0 mb-3 flex w-full max-w-[400px] flex-row gap-3 px-5">
          <button className="h-[52px] w-1/2 cursor-pointer rounded-lg border border-stroke font-BTN1 text-BTN1 leading-BTN1 text-medium_gray">
            취소
          </button>
          <button className="h-[52px] w-1/2 cursor-pointer rounded-lg bg-black font-BTN1 text-BTN1 leading-BTN1 text-white">
            제출
          </button>
        </div>
      </div>
    </div>
  );
}
