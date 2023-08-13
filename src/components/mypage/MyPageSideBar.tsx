"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { BG_COLOR, BORDER_COLOR } from "@/constants/global/colors";

import TimeOfLearning from "./TimeOfLearning";

const MyPageSideBar = () => {
  const { data } = useQuery({
    queryKey: ["participatedlist"],
    queryFn: async () => await axios.get("/api/users/times"),
  });
  const participatedList = data?.data.categories as timeOfLearning[];
  return (
    <div
      className={`sticky top-[114px] ${BG_COLOR.general02} ${BORDER_COLOR.container} px-[16px] py-[24px] w-[380px] h-[940px] overflow-auto`}
    >
      <h1 className="font-hack text-[24px] mb-[32px]">My Keyword Total time</h1>
      <div className="flex gap-3 flex-wrap content-start">
        {participatedList?.map((category: timeOfLearning) => (
          <TimeOfLearning key={`${category.category}TOC`} category={category} />
        ))}
      </div>
    </div>
  );
};

export default MyPageSideBar;
