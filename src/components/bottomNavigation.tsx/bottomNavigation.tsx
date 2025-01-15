import React from "react";
import Place from "@assets/bottomNavigation/place.svg";
import Recruit from "@assets/bottomNavigation/recruit.svg";
import My from "@assets/bottomNavigation/my.svg";
import Image from "next/image";

export default function BottomNavigationComponent() {
  return (
    <div className="fixed bottom-0 flex flex-row w-full max-w-[400px] py-2 justify-around border-t border-stroke">
      <div className="flex flex-col items-center gap-2">
        <Image className="size-6" src={Place} alt="place-cion" />
        <p>팝업공간</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Image className="size-6" src={Recruit} alt="recruit-icon" />
        <p>지원공고</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Image className="size-6" src={My} alt="my-icon" />
        <p>나의정보</p>
      </div>
    </div>
  );
}
