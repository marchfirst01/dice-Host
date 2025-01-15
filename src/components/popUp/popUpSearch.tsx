import React from "react";
import Search from "@assets/popUp/search.svg";
import Image from "next/image";

export default function PopUpSearch() {
  return (
    <div className="relative">
      <input
        className="w-full h-[51px] px-[41px] rounded-lg text-medium_gray border"
        placeholder="원하시는 팝업 위치를 검색해보세요"
      />
      <Image
        className="absolute top-1/2 -translate-y-1/2 left-[13px]"
        src={Search}
        alt="검색 이미지"
      />
    </div>
  );
}
