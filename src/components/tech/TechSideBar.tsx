"use client";
import React from "react";
import { useRecoilValue } from "recoil";

import { isLoggedInAtom } from "@/constants/global/atoms";

import LoggedSideBar from "../commonUI/LoggedSideBar";
import SideBar from "../commonUI/SideBar";

const TechSideBar = () => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  return <div>{isLoggedIn ? <LoggedSideBar /> : <SideBar />}</div>;
};

export default TechSideBar;
