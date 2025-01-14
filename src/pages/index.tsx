import Logo from "@/assets/home/logo.svg";
import Dice from "@/assets/home/dice.svg";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="space-y-4">
        <Image src={Logo} alt="로고 이미지" />
        <p className="text-center text-SUB2 font-SUB2">
          팝업 운영 올인원 솔루션
        </p>
      </div>

      <div className="fixed bottom-[34px] pb-5 pt-4 space-y-[11px]">
        <button
          onClick={() => router.push(`/register`)}
          className="bg-white p-4 w-full rounded-lg flex flex-row space-x-2 items-center justify-center"
        >
          <Image src={Dice} alt="주사위" />
          <p className="text-BTN1 font-BTN1 text-black">
            다이스 아이디로 로그인
          </p>
        </button>

        <div className="flex flex-row justify-center items-center">
          <button className="text-BTN1 font-BTN1 text-medium_gray underline px-4 py-2.5">
            회원으로 가입하기
          </button>
          <p className="text-BTN1 font-BTN1 text-medium_gray">|</p>
          <button className="text-BTN1 font-BTN1 text-medium_gray underline px-4 py-2.5">
            비회원으로 둘러보기
          </button>
        </div>
      </div>
    </div>
  );
}
