"use client";
import React from "react";

import Button from "@/components/designSystem/Button";
import { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import UserTech from "@/components/profile/article/UserTech";
import UserDiscussion from "@/components/profile/article/UserDiscussion";
import UserKeyword from "@/components/profile/article/UserKeyword";

const boxOption = `${BG_COLOR.general02} ${TEXT_COLOR.primary}`;

const profileeTab = ["Tech", "Discussion", "keyword"] as const;
const ProfilePage = () => {
  const [tab, setTab] = React.useState<(typeof profileeTab)[number]>("Tech");
  const renderPage = () => {
    switch (tab) {
      case "Tech":
        return <UserTech />;
      case "Discussion":
        return <UserDiscussion />;
      case "keyword":
        return <UserKeyword />;
    }
  };
  const render = renderPage();
  return (
    <div className="w-[1356px] flex flex-col mt-[20px]">
      <div className="flex p-[10px]">
        {profileeTab.map((item) => (
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
      <div
        className={`flex flex-col justify-start items-center w-[1356px] h-[902px] ${boxOption}`}
      >
        {render}
      </div>
    </div>
  );
};

export default ProfilePage;
