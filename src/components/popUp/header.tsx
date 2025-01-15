import Image from "next/image";
import React from "react";
import HeaderBack from "@assets/popUp/headerBack.svg";
import PopUpSearch from "./popUpSearch";

export default function Header() {
  return (
    <div className="relative w-full h-full">
      {/* 이미지 사이즈 조절 필요 */}
      <Image
        className="absolute left-0"
        src={HeaderBack}
        layout="intrinsic"
        alt="배경 이미지"
      />
      <div className="space-y-2.5 absolute top-[63px] w-full px-5 border-stroke">
        <p className="font-H1 text-H1 text-white">
          팝업 공간과 지원공고를{<br />}쉽고 빠르게.
        </p>
        <PopUpSearch />
      </div>
    </div>
  );
}
