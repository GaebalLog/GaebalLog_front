"use client";
import React from "react";
import { useRecoilValue } from "recoil";

import { isLoggedInAtom } from "@/constants/global/atoms";

import SideBar from "../commonUI/SideBar";
import Button from "../designSystem/Button";
import { LoggedSideBar } from "../commonUI/LoggedSideBar";
import { NeighborArticleList } from "../commonUI/NeighborArticleList";

const TechSideBar = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  return (
    <div className="sticky top-[114px] h-[500px]">
      {isLoggedIn ? (
        <div className="flex flex-col gap-[16px]">
          <Button
            size="middleCreate"
            color="white"
            border
            className="rounded-[3px] w-[380px]"
          >
            + Create Article
          </Button>
          <LoggedSideBar position="top" />
          <NeighborArticleList />
        </div>
      ) : (
        <SideBar />
      )}
    </div>
  );
};

export default TechSideBar;
