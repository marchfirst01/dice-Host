import Image from "next/image";
import React from "react";
import Logo from "@assets/home/logo.svg";
import Heart from "@assets/topNavigation/heart.svg";
import Chat from "@assets/topNavigation/chat.svg";
import { useRouter } from "next/router";

export default function TopNavigation() {
  const router = useRouter();

  return (
    <div className="flex flex-row justify-between py-4 px-5 items-center bg-black">
      <Image
        onClick={() => router.push("/")}
        className="cursor-pointer"
        src={Logo}
        alt="로고이미지"
        width={70}
        height={25}
      />
      <div className="flex flex-row gap-6">
        <Image
          onClick={() => console.log("좋아요 페이지 이동")}
          className="cursor-pointer"
          src={Heart}
          width={24}
          height={24}
          alt="좋아요 이미지"
        />
        <Image
          onClick={() => console.log("쪽지 페이지 이동")}
          className="cursor-pointer"
          src={Chat}
          width={24}
          height={24}
          alt="쪽지 이미지"
        />
      </div>
    </div>
  );
}
