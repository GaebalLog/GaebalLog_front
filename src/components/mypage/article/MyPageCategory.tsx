"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { BG_COLOR, BORDER_COLOR } from "@/constants/global/colors";
import useIcon from "@/hooks/useIcon";
import usePagination from "@/hooks/usePagination";
import LiveSearchInput from "@/components/commonUI/LiveSearchInput";
import mypageLiveSearchData from "@/utils/util-mypageLiveSearchData";
import { QUERY_KEYS } from "@/constants/global/querykeys";

import TimeOfLearning from "../TimeOfLearning";

const MyPageCategory = () => {
  const [participatedList, setParticipatedList] = React.useState<
    timeOfLearning[]
  >([]);
  const myCategoriesContainerRef = React.useRef<HTMLDivElement | null>(null);

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.PARTICIPATEDLIST],
    queryFn: async () => await axios.get("/api/users/times"),
    onSuccess: (data) => {
      setParticipatedList(data.data.categories);
    },
  });

  const {
    isFirstPage,
    isLastPage,
    handlePrev,
    handleNext,
    slicedMyCategories,
  } = usePagination(participatedList, myCategoriesContainerRef);

  const { getIcon } = useIcon();
  const prevBtn = getIcon("prevBtn", 48, 48, "cursor");
  const nextBtn = getIcon("nextBtn", 48, 48, "cursor");

  const { timelessCategories, filterCategories } = mypageLiveSearchData(
    data?.data?.categories,
    setParticipatedList,
  );

  return (
    <div
      className={`relative flex flex-col items-center py-[24px] w-[1632px] h-[400px] ${BG_COLOR.general02} ${BORDER_COLOR.container} mt-[20px]`}
    >
      <h1 className="font-hack text-[24px] mb-[32px]">My Keyword Total time</h1>
      <div className="relative">
        <LiveSearchInput
          type="mypageSearch"
          data={timelessCategories}
          placeholder="내가 추가한 나만의 키워드를 검색해보세요."
          clickResultList={filterCategories}
        />
      </div>
      <div
        className="relative flex self-start h-[210px] gap-[16px] px-[150px] flex-wrap overflow-hidden content-start slide-right-enter-active"
        ref={myCategoriesContainerRef}
      >
        {slicedMyCategories?.map((category: timeOfLearning, i: number) => (
          <TimeOfLearning
            key={`${category.category}${i}TOC`}
            category={category}
          />
        ))}
      </div>
      {!isFirstPage && (
        <button className="absolute top-[240px] left-0" onClick={handlePrev}>
          {prevBtn}
        </button>
      )}
      {!isLastPage && (
        <button className="absolute top-[240px] right-0" onClick={handleNext}>
          {nextBtn}
        </button>
      )}
    </div>
  );
};

export default MyPageCategory;
