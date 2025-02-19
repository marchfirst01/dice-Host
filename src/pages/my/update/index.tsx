import { IMAGES } from '@assets/index';
import { useHostInfo } from '@hooks/useHost';
import { HostInfo } from '@type/my';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';
import { useRouter } from 'next/router';

export default function MyUpdatePage() {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<HostInfo>();
  const { data: defaultHostInfo } = useHostInfo();
  const [bankName, setBankName] = useState(
    defaultHostInfo.bankName ? defaultHostInfo.bankName : '',
  );

  const onSubmit = (hostInfo: HostInfo) => {
    console.log(hostInfo);
  };

  const handleBankSelection = () => {
    setBankName('신한은행');
    setValue('bankName', '신한은행'); // 예제: 버튼 클릭 시 '신한은행'으로 값 설정
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <header className="flex flex-row bg-black">
        <div onClick={() => router.back()} className="cursor-pointer px-3 py-3">
          <Image src={IMAGES.ArrowBackWhite} alt="back" />
        </div>
        <p className="flex-grow py-3 text-center text-white">호스트 정보 수정</p>
        <button type="submit" className="px-5 text-white">
          완료
        </button>
      </header>
      <div className="flex flex-col gap-6 px-5 py-8 font-CAP1 text-CAP1 leading-CAP1 text-dark_gray">
        <div>
          <p>호스트 이름</p>
          <input
            {...register('name')}
            defaultValue={defaultHostInfo.name}
            className="mt-2 h-11 w-full rounded-lg border border-light_gray px-4"
          />
        </div>
        <div>
          <p>이메일</p>
          <div className="mt-2 flex flex-row items-center justify-center gap-2">
            <input
              {...register('email')}
              defaultValue={defaultHostInfo.email}
              className="h-11 w-full rounded-lg border border-light_gray px-4"
            />
            <button
              type="button"
              className="h-11 text-nowrap rounded-lg border border-light_gray px-[41.5px] text-center text-light_gray"
            >
              중복 확인
            </button>
          </div>
        </div>
        <div>
          <p>휴대폰</p>
          <div className="mt-2 flex flex-row items-center justify-center gap-2">
            <input
              {...register('phone')}
              defaultValue={defaultHostInfo.phone}
              className="h-11 w-full rounded-lg border border-light_gray px-4"
            />
            <button
              type="button"
              className="h-11 text-nowrap rounded-lg border border-light_gray px-[41.5px] text-center text-light_gray"
            >
              중복 확인
            </button>
          </div>
        </div>
        <div>
          <p>계좌번호</p>
          <div className="relative flex flex-row">
            <input
              {...register('accountNumber')}
              defaultValue={defaultHostInfo.accountNumber ? defaultHostInfo.accountNumber : ''}
              className="mt-2 h-11 w-full rounded-lg border border-light_gray px-4"
              placeholder="계좌번호를 입력해주세요"
            />
            <div className="absolute right-0 mt-2 flex flex-row items-center text-light_gray">
              <p>|</p>
              <button type="button" onClick={handleBankSelection} className="h-11 w-[118px]">
                {bankName ? bankName : '은행 선택'}
              </button>
              <input {...register('bankName')} type="hidden" />
            </div>
          </div>
        </div>
        <button
          type="button"
          className="mt-4 h-[52px] w-full rounded-lg border border-stroke text-medium_gray"
        >
          비밀번호 재설정
        </button>
      </div>
    </form>
  );
}
