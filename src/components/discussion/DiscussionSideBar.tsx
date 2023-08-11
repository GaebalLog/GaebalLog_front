"use client";
import React from "react";
import { useRecoilValue } from "recoil";

import { isLoggedInAtom } from "@/constants/global/atoms";

import LoggedSideBar from "../commonUI/LoggedSideBar";
import SideBar from "../commonUI/SideBar";
import Button from "../designSystem/Button";

const DiscussionSideBar = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  return (
    <div className="sticky top-[114px] h-[500px]">
      {isLoggedIn ? (
        <>
          <Button
            size="middleCreate"
            color="white"
            border
            className="rounded-[3px] w-[380px] mb-[16px]"
          >
            + Create Discussion
          </Button>
          <LoggedSideBar position="top" />
        </>
      ) : (
        <SideBar />
      )}
    </div>
  );
};

export default DiscussionSideBar;
