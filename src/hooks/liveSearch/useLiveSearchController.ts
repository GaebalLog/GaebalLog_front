import React from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";

import { searchSortAtom } from "@/constants/global/atoms";

import useModalController from "../useModalController";

const useLiveSearchController = (
  type: "keywordSearch" | "headerSearch" | "mypageSearch",
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  displayedResults: string[],
  focusedIndex: number | null,
  setFocusedIndex: React.Dispatch<React.SetStateAction<number | null>>,
  isRouter?: boolean,
  voiceSearch?: string | null,
  clickResultList?: (selectedKeyword: string) => void,
) => {
  const router = useRouter();
  const searchSort = useRecoilValue(searchSortAtom);
  const { modal, openModal, closeModal } = useModalController();

  const searchedKeywordClick = (selectedKeyword: string) => {
    clickResultList && clickResultList(selectedKeyword);
    closeModal(type);
    isRouter &&
      router.push(
        `/${
          searchSort === "기술" ? "tech" : "discussion"
        }?keyword=${selectedKeyword}`,
      );
    if (type === "keywordSearch") return setValue("");
    setValue(selectedKeyword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value.length > 0 ? openModal(type) : closeModal(type);
    setValue(e.target.value);
  };

  const handleKeyboard = (event: React.KeyboardEvent) => {
    const { key } = event;
    const maxIndex = (displayedResults?.length || 0) - 1;
    if (key === "ArrowDown") return handleArrowDown(maxIndex);
    if (key === "ArrowUp") return handleArrowUp(maxIndex);
    if (key === "Enter") return handleEnter();
  };
  const handleArrowDown = (maxIndex: number) => {
    openModal(type);
    setFocusedIndex((prev) =>
      prev !== null && prev < maxIndex ? prev + 1 : 0,
    );
  };
  const handleArrowUp = (maxIndex: number) => {
    setFocusedIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : maxIndex,
    );
  };
  const handleEnter = () => {
    const selectedResult =
      focusedIndex !== null ? displayedResults[focusedIndex] : value;
    closeModal(type);
    searchedKeywordClick(selectedResult);
  };

  React.useEffect(() => {
    if (modal[type] === false) setFocusedIndex(null);
  }, [modal]);

  React.useEffect(() => {
    if (voiceSearch) {
      setValue(voiceSearch);
      searchedKeywordClick(voiceSearch);
    }
  }, [voiceSearch]);

  return { handleInputChange, searchedKeywordClick, handleKeyboard };
};

export default useLiveSearchController;
