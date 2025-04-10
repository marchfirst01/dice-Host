import { BANK, IMAGES } from '@assets/index';
import InputComponent from '@components/common/Input';
import DragModalComponent from '@components/common/dragModal';
import ModalComponent from '@components/common/modal';
import { useHostInfo } from '@hooks/useHost';
import { HostInfoForm } from '@type/my';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { fetchHostUpdate } from 'src/api/host';
import { ValidateMemberError, fetchValidatePhone } from 'src/api/member';
import { hostInfoConfig } from 'src/context/host/hostInfoConfig';

export default function MyUpdatePage() {
  const router = useRouter();
  const { data: defaultHostInfo } = useHostInfo();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<HostInfoForm>();

  const [bankText, setBankText] = useState(
    defaultHostInfo.bankName ? defaultHostInfo.bankName : '은행 선택',
  );

  useEffect(() => {
    setValue('name', defaultHostInfo.name);
    setValue('email', defaultHostInfo.email);
    setValue('phone', defaultHostInfo.phone);
    setValue('accountNumber', defaultHostInfo.accountNumber ? defaultHostInfo.accountNumber : null);
    setValue('bankName', defaultHostInfo.bankName ? defaultHostInfo.bankName : null);
    setBankText(defaultHostInfo.bankName ? defaultHostInfo.bankName : '은행 선택');
  }, [setValue, defaultHostInfo]);

  const [phoneChange, setPhoneChange] = useState(true);
  const [phoneErrorMsg, setPhoneErrorMsg] = useState('');
  const [isDragModalOpen, setIsDragModalOpen] = useState(false);
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);

  const handlePhoneValidate = async () => {
    const phone = getValues('phone');
    try {
      const res = await fetchValidatePhone(phone);
      if (res) {
        setPhoneChange(!phoneChange);
        setPhoneErrorMsg('');
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ValidateMemberError) setPhoneErrorMsg(error.message);
    }
  };

  const onSubmit = async (hostInfo: HostInfoForm) => {
    try {
      const res = await fetchHostUpdate(hostInfo);
      if (res) {
        setIsCheckModalOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalComponent isOpen={isCheckModalOpen} onClose={() => setIsCheckModalOpen(false)}>
        <p className="text-dark_gray">정보 변경이 완료됐습니다.</p>
        <button
          onClick={() => {
            setIsCheckModalOpen(false);
            router.push('/space');
          }}
          className="mt-3 w-full text-purple"
        >
          확인
        </button>
      </ModalComponent>
      <header className="flex flex-row bg-black">
        <div onClick={() => router.back()} className="cursor-pointer p-3">
          <Image src={IMAGES.ArrowBackWhite} alt="back" />
        </div>
        <p className="text-style-SUB3 grow py-3 text-center text-white">호스트 정보 수정</p>
        <button type="submit" className="px-5 text-white">
          완료
        </button>
      </header>
      <div className="text-style-CAP1 relative flex flex-col gap-6 px-5 py-8 text-dark_gray">
        <div className="flex flex-col gap-2">
          <p>{hostInfoConfig.name.display}</p>
          <InputComponent config={hostInfoConfig.name} control={control} />
        </div>
        <div className="flex flex-col gap-2">
          <p>{hostInfoConfig.email.display}</p>
          <input
            disabled={true}
            {...register('email')}
            className="h-11 w-full rounded-lg border border-light_gray px-4"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>{hostInfoConfig.phone.display}</p>
          <div className="flex flex-row items-center justify-center gap-2">
            <input
              {...register('phone')}
              disabled={phoneChange}
              className="h-11 w-full rounded-lg border border-light_gray px-4"
            />
            <button
              type="button"
              onClick={() => (phoneChange ? setPhoneChange(false) : handlePhoneValidate())}
              className="h-11 w-[135px] text-nowrap rounded-lg border border-light_gray text-center text-light_gray"
            >
              {phoneChange ? '번호 변경' : '중복 확인'}
            </button>
          </div>
          {phoneErrorMsg && <p className="text-style-CAP1 text-red">{phoneErrorMsg}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <p className="after:ml-0.5 after:text-red after:content-['*']">
            {hostInfoConfig.accountNumber.display}
          </p>
          <div className="relative flex flex-row">
            <input
              {...register('accountNumber', { required: '계좌번호를 입력해주세요' })}
              className="h-11 w-full rounded-lg border border-light_gray px-4"
              placeholder="계좌번호를 입력해주세요"
            />
            <div className="absolute right-0 flex flex-row items-center text-light_gray">
              <p>|</p>
              <button
                type="button"
                onClick={() => setIsDragModalOpen(true)}
                className="h-11 w-[118px]"
              >
                {bankText}
              </button>
              <DragModalComponent
                isOpen={isDragModalOpen}
                onClose={() => setIsDragModalOpen(false)}
              >
                <div className="px-5 py-6">
                  <p className="text-style-H2 text-black">금융 기관 선택</p>
                  <div className="text-style-SUB3 flex h-12 flex-row justify-center">
                    <div className="flex w-1/2 justify-center">
                      <button type="button" className="border-b-2 border-black">
                        은행
                      </button>
                    </div>
                    <div className="flex w-1/2 justify-center">
                      <button type="button">증권사</button>
                    </div>
                  </div>
                  <hr />
                  <div className="mt-6 grid grid-cols-3 gap-2 overflow-auto">
                    {BANK.map((bank, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setValue('bankName', bank.bankName);
                          setBankText(bank.bankName);
                          setIsDragModalOpen(false);
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
        <div className="flex flex-col gap-2">
          <p className="after:ml-0.5 after:text-red after:content-['*']">비밀번호</p>
          <InputComponent config={hostInfoConfig.password} control={control} />
          {errors.password && <p className="mt-2 text-red">{errors.password.message}</p>}
        </div>
        <button
          type="button"
          onClick={() => router.push('/my/pwUpdate')}
          className="mt-4 h-[52px] w-full rounded-lg border border-stroke text-medium_gray"
        >
          비밀번호 재설정
        </button>
      </div>
    </form>
  );
}
