import { IMAGES } from '@assets/index';
import DragModalComponent from '@components/common/dragModal';
import ModalComponent from '@components/common/modal';
import { clearTokens } from '@utils/cookie';

import React, { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { fetchWithDraw } from 'src/api/host';
import { withDrawConfig } from 'src/context/withDraw/withDrawConfig';

export default function WithDrawPage() {
  const router = useRouter();
  const { name } = router.query;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [etcReason, setEtcReason] = useState('');
  const [error, setError] = useState('');
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);

  const handleWithDraw = async (reason: string) => {
    try {
      const res = await fetchWithDraw(reason);
      if (res === 200) {
        alert('탈퇴 완료');
        clearTokens();
        router.push('/');
      }
    } catch (error) {
      alert('탈퇴 실패');
      console.log(error);
    }
  };

  const handleSubmitBtn = async () => {
    // error 설정
    if (reason === '') {
      setError('탈퇴 이유를 선택해주세요');
    } else if (reason === '기타' && etcReason === '') {
      setError('탈퇴 이유를 작성해주세요');
    } else {
      // 탈퇴
      //TODO: 탈퇴 확인 모달 띄우기
      setIsCheckModalOpen(true);
    }
  };

  return (
    <div className="relative h-screen">
      <ModalComponent isOpen={isCheckModalOpen} onClose={() => setIsCheckModalOpen(false)}>
        <div className="w-full">
          <p className="mb-4 text-center">
            회원 탈퇴 시 회원님의 모든 데이터(개인 정보, 활동 내역 등)가 삭제됩니다.
            <br />
            그래도 회원을 탈퇴하시겠습니까?
          </p>
          <button onClick={() => setIsCheckModalOpen(false)} className="w-1/2 text-medium_gray">
            취소
          </button>
          <button
            onClick={() => {
              setIsCheckModalOpen(false);
              if (reason === '기타') {
                handleWithDraw(etcReason);
              } else {
                handleWithDraw(reason);
              }
            }}
            className="w-1/2 text-purple"
          >
            확인
          </button>
        </div>
      </ModalComponent>
      <header className="flex flex-row bg-white">
        <div onClick={() => router.back()} className="cursor-pointer p-3">
          <Image src={IMAGES.ArrowBackBlack} alt="back" />
        </div>
        <p className="text-style-SUB3 grow py-3 text-center">탈퇴하기</p>
        <div className="w-12" />
      </header>
      <div className="px-5 py-8">
        <p className="">
          {name}님과 이별한다니
          <br />
          너무 아쉽습니다
        </p>
        <p className="text-style-BODY1 mt-2 text-medium_gray">
          회원님께서 탈퇴를 원하신다니 저희 서비스가 많이 부족하고 미흡했나 봅니다. 더 나은 서비스를
          제공하는 플랫폼이 될 수 있도록 노력하겠습니다.
        </p>
        <p className="text-style-SUB2 mt-8">탈퇴 전 확인 부탁드립니다</p>
        <p className="text-style-BODY1 mt-2 text-medium_gray">
          계정을 삭제하시면 예약, 프로필, 찜, 쪽지 등 모든 활동 정보가 삭제됩니다. 계정 삭제 후
          00일간 재가입할 수 없습니다.
        </p>
        <p className="text-style-SUB3 mt-8">
          더 나은 다이스가 될 수 있도록
          <br /> 탈퇴하시는 이유를 알려주시면 감사하겠습니다
        </p>
        <div
          onClick={() => setIsModalOpen(true)}
          className="text-style-BODY2 mt-2 flex h-11 w-full cursor-pointer flex-row items-center justify-between rounded-lg border border-light_gray px-4"
        >
          {reason ? reason : '탈퇴하시는 이유가 무엇인가요?'}
          <Image src={IMAGES.ArrowDownGray} alt="arrow" />
        </div>
        {reason === '기타' && (
          <textarea
            onChange={(e) => {
              setEtcReason(e.target.value);
              if (e.target.value) {
                setError('');
              } else {
                setError('탈퇴 이유를 작성해주세요');
              }
            }}
            className="mt-2 h-28 w-full rounded-lg border p-2"
            placeholder="탈퇴하는 이유를 적어주세요"
          />
        )}
        {error && <p className="text-style-CAP1 text-red">{error}</p>}
        <DragModalComponent isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="text-style-SUB3 px-5 pb-[64px] pt-11">
            {withDrawConfig.map((item, index) => (
              <p
                key={index}
                onClick={() => {
                  setReason(item);
                  setEtcReason('');
                  setIsModalOpen(false);
                  setError('');
                }}
                className="flex h-[52px] w-full items-center px-4 text-medium_gray hover:bg-back_gray hover:text-black"
              >
                {item}
              </p>
            ))}
          </div>
        </DragModalComponent>
        <div className="absolute bottom-0 left-0 mb-3 flex w-full max-w-[400px] flex-row gap-3 px-5">
          <button
            onClick={() => router.back()}
            className="text-style-BTN1 h-[52px] w-1/2 cursor-pointer rounded-lg border border-stroke text-medium_gray"
          >
            취소
          </button>
          <button
            onClick={handleSubmitBtn}
            className={`text-style-BTN1 h-[52px] w-1/2 cursor-pointer rounded-lg bg-black text-white`}
          >
            제출
          </button>
        </div>
      </div>
    </div>
  );
}
