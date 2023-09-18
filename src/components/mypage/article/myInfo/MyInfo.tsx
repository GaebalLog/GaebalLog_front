"use client";
import React from "react";

import { TEXT_COLOR } from "@/constants/global/colors";
import Button from "@/components/designSystem/Button";

import MyProfileImage from "./elements/MyProfileImage";
import MyNicknameInput from "./elements/MyNicknameInput";

const MyInfo = () => {
  return (
    <React.Fragment>
      <MyProfileImage />
      <div className="h-[280px] flex flex-col gap-[38px]">
        <MyNicknameInput />
        <div>
          <h1 className={`${TEXT_COLOR.general07rev} mb-[10px]`}>
            *회원 탈퇴 ( 회원 탈퇴 시 모든 데이터는 삭제되어 복구 되지
            않습니다.)
          </h1>
          <Button size="button" color="white" border>
            회원탈퇴
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyInfo;
