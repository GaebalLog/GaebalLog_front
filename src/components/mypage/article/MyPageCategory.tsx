"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { BG_COLOR, BORDER_COLOR } from "@/constants/global/colors";
import { utilResizeArray } from "@/utils/util-resizeArray";
import useIcon from "@/hooks/useIcon";
import Input from "@/components/designSystem/Input";

import TimeOfLearning from "../TimeOfLearning";

const MyPageCategory = () => {
  const [page, setPage] = React.useState<number>(0);
  const [keyword, setKeyword] = React.useState<string>("");
  const { data } = useQuery({
    queryKey: ["participatedlist"],
    queryFn: async () => await axios.get("/api/users/times"),
  });
  const participatedList = data?.data.categories as timeOfLearning[];
  const devidedList = utilResizeArray(
    participatedList,
    12,
  ) as timeOfLearning[][];

  const { getIcon } = useIcon();
  const prevBtn = getIcon("prevBtn", 48, 48, "cursor");
  const nextBtn = getIcon("nextBtn", 48, 48, "cursor");
  const prevBtnHandler = () => {
    if (page === 0) return;
    setPage((prev) => prev - 1);
  };
  const nextBtnHandler = () => {
    if (page === devidedList.length - 1) return;
    setPage((prev) => prev + 1);
  };

  return (
    <div
      className={`relative flex flex-col items-center py-[24px] w-[1632px] h-[400px] ${BG_COLOR.general02} ${BORDER_COLOR.container} overflow-hidden mt-[20px]`}
    >
      <h1 className="font-hack text-[24px] mb-[32px] ml-[150px]">
        My Keyword Total time
      </h1>
      <Input
        type="mypage"
        placeholder="Search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <div
        className="flex gap-[16px] px-[150px] flex-wrap content-start slide-right-enter-active"
        key={page}
      >
        {devidedList[page]?.map((category: timeOfLearning, i: number) => (
          <TimeOfLearning
            key={`${category.category}${i}TOC`}
            category={category}
          />
        ))}
      </div>
      {page !== 0 && (
        <button
          className="absolute top-[240px] left-0"
          onClick={prevBtnHandler}
        >
          {prevBtn}
        </button>
      )}
      {page < devidedList.length - 1 && (
        <button
          className="absolute top-[240px] right-0"
          onClick={nextBtnHandler}
        >
          {nextBtn}
        </button>
      )}
    </div>
  );
};

export default MyPageCategory;
