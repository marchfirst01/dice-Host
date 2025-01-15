import Header from "@components/popUp/header";
import PopUpItem from "@components/popUp/popUpItem";
import TopNavigation from "@components/topNavigation/topNavigation";
import React from "react";

export default function MainPage() {
  return (
    <div className="relative">
      <TopNavigation />
      <Header />
      <PopUpItem />
    </div>
  );
}
