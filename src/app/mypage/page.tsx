"use client";
import React from "react";

import MyInfo from "@/components/mypage/MyInfo";
import Button from "@/components/designSystem/Button";

const sortTab = [
  "내 정보",
  "내가 쓴 글",
  "내가 추가한 이웃",
  "참여중인 토의",
  "설정",
] as const;
const MyPagePage = () => {
  const [tab, setTab] = React.useState<(typeof sortTab)[number]>("내 정보");
  const renderPage = () => {
    switch (tab) {
      case "내 정보":
        return <MyInfo />;
      case "내가 쓴 글":
        return <div>내가 쓴 글</div>;
      case "내가 추가한 이웃":
        return <div>내가 추가한 이웃</div>;
      case "참여중인 토의":
        return <div>참여중인 토의</div>;
      case "설정":
        return <div>설정</div>;
    }
  };
  const render = renderPage();
  return (
    <div className="w-[1632px] flex flex-col mt-[20px]">
      <div className="flex p-[10px]">
        {sortTab.map((item) => (
          <div key={`${item}tab`} className="px-[40px] pb-[16px]">
            <Button
              size="subTab"
              color={tab === item ? "checkTab" : "cancelButton"}
              onClick={() => setTab(item)}
            >
              {item}
            </Button>
          </div>
        ))}
      </div>
      {render}
    </div>
  );
};

export default MyPagePage;
