"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilState } from "recoil";

import { BG_COLOR, BORDER_COLOR } from "@/constants/global/colors";
import useIcon from "@/hooks/useIcon";
import Input from "@/components/designSystem/Input";
import { modalControlAtom } from "@/hooks/useModalController";
import usePagination from "@/hooks/usePagination";

import TimeOfLearning from "../TimeOfLearning";
import SearchCategory from "../SearchCategory";

const getDisplayedList = (data: string[], keyword: string) => {
  return data?.filter((item) => item.includes(keyword));
};

const MyPageCategory = () => {
  const [modal, setModal] = useRecoilState(modalControlAtom);
  const [keyword, setKeyword] = React.useState<string>("");
  const [index, setIndex] = React.useState<number | null>(null);
  const [participatedList, setParticipatedList] = React.useState<
    timeOfLearning[]
  >([]);
  const myCategoriesContainerRef = React.useRef<HTMLDivElement | null>(null);

  const { data } = useQuery({
    queryKey: ["participatedlist"],
    queryFn: async () => await axios.get("/api/users/times"),
    onSuccess: (data) => {
      setParticipatedList(data.data.categories);
    },
  });

  const fullList = data?.data.categories;

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

  const displayedResults = getDisplayedList(
    fullList?.map((item: timeOfLearning) => item.category),
    keyword,
  );
  const keywordHandler = (value: string) => {
    setKeyword(value);
  };

  const searchHandler = (searchkey: string) => {
    const selectedResult = fullList?.filter((item: timeOfLearning) =>
      item.category.includes(searchkey),
    );
    setParticipatedList(selectedResult);
    setModal((prev) => ({ ...prev, mypageSearch: false }));
    setIndex(null);
    setKeyword(searchkey);
  };

  const keyboardHandler = (event: React.KeyboardEvent) => {
    const { key } = event;
    const maxIndex = (displayedResults?.length || 0) - 1;

    if (key === "ArrowDown") {
      setModal((prev) => ({ ...prev, mypageSearch: true }));
      return setIndex((prev) =>
        prev !== null && prev < maxIndex ? prev + 1 : 0,
      );
    }
    if (key === "ArrowUp") {
      return setIndex((prev) =>
        prev !== null && prev > 0 ? prev - 1 : maxIndex,
      );
    }
    if (key === "Enter") {
      if (index === null) {
        searchHandler(keyword);
        return;
      } else {
        searchHandler(displayedResults[index]);
      }
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center py-[24px] w-[1632px] h-[400px] ${BG_COLOR.general02} ${BORDER_COLOR.container} mt-[20px]`}
      onKeyDown={keyboardHandler}
    >
      <h1 className="font-hack text-[24px] mb-[32px]">My Keyword Total time</h1>
      <div className="relative">
        <Input
          type="mypage"
          placeholder="내가 추가한 나만의 키워드를 검색해보세요."
          value={keyword}
          onChange={(e) => {
            e.target.value.length > 0
              ? setModal((prev) => ({ ...prev, mypageSearch: true }))
              : setModal((prev) => ({ ...prev, mypageSearch: false }));
            setKeyword(e.target.value);
          }}
        />
        {modal.mypageSearch && (
          <SearchCategory
            displayedResults={displayedResults}
            keywordHandler={keywordHandler}
            focusedIndex={index}
            setFocusedIndex={setIndex}
          />
        )}
      </div>
      <div
        className="relative flex h-[210px] gap-[16px] px-[150px] flex-wrap overflow-hidden content-start slide-right-enter-active"
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
