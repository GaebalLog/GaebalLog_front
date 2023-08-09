"use client";
import React from "react";
import { useRecoilValue } from "recoil";

import { isLoggedInAtom } from "@/constants/global/atoms";

import LoggedSideBar from "../commonUI/LoggedSideBar";
import SideBar from "../commonUI/SideBar";

const TechSideBar = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  return (
    <div className="sticky top-[114px] h-[500px]">
      {isLoggedIn ? (
        <>
          <LoggedSideBar position="top" />
        </>
      ) : (
        <SideBar />
      )}
    </div>
  );
};

export default TechSideBar;
