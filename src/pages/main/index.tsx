import React, { useState } from "react";
import PopUpPage from "../popUp";
import MainLayout from "@layout/layout";

export default function MainPage() {
  const [pageType, setPageType] = useState<"popUp" | "recruit">("popUp");
  return <MainLayout>{pageType === "popUp" && <PopUpPage />}</MainLayout>;
}
