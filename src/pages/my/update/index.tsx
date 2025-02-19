import { BANK, IMAGES } from '@assets/index';
import DragModalComponent from '@components/common/dragModal';
import { useHostInfo } from '@hooks/useHost';
import { HostInfo } from '@type/my';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { fetchHostUpdate } from 'src/api/host';

export default function MyUpdatePage() {
  const router = useRouter();
  const { data: defaultHostInfo } = useHostInfo();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<HostInfo>();

  useEffect(() => {
    setValue('name', defaultHostInfo.name);
    setValue('email', defaultHostInfo.email);
    setValue('phone', defaultHostInfo.phone);
    setValue('accountNumber', defaultHostInfo.accountNumber ? defaultHostInfo.accountNumber : null);
    setValue('bankName', defaultHostInfo.bankName ? defaultHostInfo.bankName : null);
  }, [defaultHostInfo]);

  const [phoneChange, setPhoneChange] = useState(true);

  const handlePhoneValidate = () => {
    setPhoneChange(!phoneChange);
    const phone = getValues('phone');
    //TODO: phone 중복 검사
  };

  const onSubmit = async (hostInfo: HostInfo) => {
    console.log(hostInfo);
    await fetchHostUpdate(hostInfo);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <header className="flex flex-row bg-black">
        <div onClick={() => router.back()} className="cursor-pointer px-3 py-3">
          <Image src={IMAGES.ArrowBackWhite} alt="back" />
        </div>
        <p className="flex-grow py-3 text-center font-SUB3 text-SUB3 leading-SUB3 text-white">
          호스트 정보 수정
        </p>
        <button type="submit" className="px-5 text-white">
          완료
        </button>
      </header>
      <div className="relative flex flex-col gap-6 px-5 py-8 font-CAP1 text-CAP1 leading-CAP1 text-dark_gray">
        <div>
          <p>호스트 이름</p>
          <input
            {...register('name')}
            className="mt-2 h-11 w-full rounded-lg border border-light_gray px-4"
          />
        </div>
        <div>
          <p>이메일</p>
          <div className="mt-2 flex flex-row items-center justify-center gap-2">
            <input
              disabled={true}
              {...register('email')}
              className="h-11 w-full rounded-lg border border-light_gray px-4"
            />
          </div>
        </div>
        <div>
          <p>휴대폰</p>
          <div className="mt-2 flex flex-row items-center justify-center gap-2">
            <input
              {...register('phone')}
              disabled={phoneChange}
              className="h-11 w-full rounded-lg border border-light_gray px-4"
            />
            <button
              type="button"
              onClick={handlePhoneValidate}
              className="h-11 w-[135px] text-nowrap rounded-lg border border-light_gray text-center text-light_gray"
            >
              {phoneChange ? '번호 변경' : '중복 확인'}
            </button>
          </div>
        </div>
        <div>
          <p className="after:ml-0.5 after:text-red after:content-['*']">계좌번호</p>
          <div className="relative flex flex-row">
            <input
              {...register('accountNumber', { required: '계좌번호를 입력해주세요' })}
              className="mt-2 h-11 w-full rounded-lg border border-light_gray px-4"
              placeholder="계좌번호를 입력해주세요"
            />
            <div className="absolute right-0 mt-2 flex flex-row items-center text-light_gray">
              <p>|</p>
              <button type="button" onClick={openModal} className="h-11 w-[118px]">
                {getValues('bankName') ? getValues('bankName') : '은행 선택'}
              </button>
              <DragModalComponent isOpen={isModalOpen} onClose={closeModal}>
                <div className="px-5 py-6">
                  <p className="font-H2 text-H2 leading-H2 text-black">금융 기관 선택</p>
                  <div className="flex h-12 flex-row justify-center font-SUB3 text-SUB3 leading-SUB3">
                    <div className="flex w-1/2 justify-center">
                      <button type="button" className="border-b-2 border-black">
                        은행
                      </button>
                    </div>
                    <div className="flex w-1/2 justify-center">
                      <button type="button" className="border-b-2 border-black">
                        증권사
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div className="mt-6 grid grid-cols-3 gap-2 overflow-auto">
                    {BANK.map((bank) => (
                      <div
                        onClick={() => {
                          console.log(bank.bankName);
                          setValue('bankName', bank.bankName);
                          closeModal();
                        }}
                        className="flex flex-col items-center justify-center rounded-lg border py-4"
                      >
                        <Image src={bank.bankImage} alt={bank.bankName} />
                        {bank.bankName}
                      </div>
                    ))}
                  </div>
                </div>
              </DragModalComponent>
              <input {...register('bankName', { required: '은행을 선택해주세요' })} type="hidden" />
            </div>
          </div>
          {errors.accountNumber ? (
            <p className="mt-2 text-red">{errors.accountNumber.message}</p>
          ) : errors.bankName && !getValues('bankName') ? (
            <p className="mt-2 text-red">{errors.bankName.message}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => router.push('/my/pwReset')}
          className="mt-4 h-[52px] w-full rounded-lg border border-stroke text-medium_gray"
        >
          비밀번호 재설정
        </button>
      </div>
    </form>
  );
}
