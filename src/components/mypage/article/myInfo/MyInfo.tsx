"use client";
import React from "react";

import MyProfileImage from "./elements/MyProfileImage";
import MyNicknameInput from "./elements/MyNicknameInput";
import WithdrawButton from "./WithdrawButton";

const MyInfo = () => {
  return (
    <React.Fragment>
      <MyProfileImage />
      <div className="h-[280px] flex flex-col gap-[38px]">
        <MyNicknameInput />
        <WithdrawButton />
      </div>
    </React.Fragment>
  );
};

export default MyInfo;
