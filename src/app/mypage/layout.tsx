import React from "react";
import type { Metadata } from "next";

import MyPageCategory from "@/components/mypage/MyPageCategory";

export const metadata: Metadata = {
  title: "마이 페이지",
  description: "개인 설정",
};

const MyPageLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main className="w-full h-full flex flex-col justify-center items-center">
      <MyPageCategory />
      {children}
    </main>
  );
};

export default MyPageLayout;
