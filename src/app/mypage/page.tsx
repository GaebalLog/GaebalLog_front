"use client";
import React from "react";

import Button from "@/components/UI/buttons/base/Button";
import MyInfo from "@/components/mypage/article/myInfo/MyInfo";
import MySettings from "@/components/mypage/article/MySettings";
import MyWritten from "@/components/mypage/article/MyWritten/MyWritten";
import Mydiscussions from "@/components/mypage/article/MyDiscussion/Mydiscussions";
import { BG_COLOR, TEXT_COLOR } from "@/config/constants/colors";
import { MyNeighbors } from "@/components/mypage/article/neighbors/MyNeighbors";
import withAuth from "@/components/provider/withAuth";

const boxOption = `${BG_COLOR.general02} ${TEXT_COLOR.primary}`;

const mypageTab = [
  "내 정보",
  "글 관리",
  "이웃 관리",
  "토의 관리",
  "설정",
] as const;
const MyPagePage = withAuth(() => {
  const [tab, setTab] = React.useState<(typeof mypageTab)[number]>("내 정보");
  const renderPage = () => {
    switch (tab) {
      case "내 정보":
        return <MyInfo />;
      case "글 관리":
        return <MyWritten />;
      case "이웃 관리":
        return <MyNeighbors />;
      case "토의 관리":
        return <Mydiscussions />;
      case "설정":
        return <MySettings />;
    }
  };
  const render = renderPage();
  return (
    <div
      className="w-[1632px] flex flex-col mt-[20px]"
      data-testid="renderedMypage"
    >
      <div className="flex p-[10px]">
        {mypageTab.map((item) => (
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
      <div className={`flex items-center w-[1632px] h-[462px] ${boxOption}`}>
        {render}
      </div>
    </div>
  );
});

export default MyPagePage;
