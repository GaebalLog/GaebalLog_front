"use client";
import React from "react";

import Input from "@/components/designSystem/Input";
import { BG_COLOR } from "@/constants/global/colors";
import useIcon from "@/hooks/useIcon";
import useModalController from "@/hooks/useModalController";
import useLiveSearchController from "@/hooks/liveSearch/useLiveSearchController";
import useLiveSearchList from "@/hooks/liveSearch/useLiveSearchList";

import NonPortalModal from "../modal/NonPortalModal";

const typeStyles = {
  keywordSearch: {
    topLeft: { top: 50, left: 19.5 },
    modalWidth: "w-[1180px]",
  },
  headerSearch: {
    topLeft: { top: 48, left: 19.5 },
    modalWidth: "w-[360px]",
  },
  mypageSearch: {
    topLeft: { top: 50, left: 19.5 },
    modalWidth: "w-[1280px]",
  },
};

interface liveSearchInputProps {
  type: "keywordSearch" | "headerSearch" | "mypageSearch";
  data?: string[];
  isRouter?: boolean;
  voiceSearch?: string | null;
  placeholder?: string;
  clickResultList?: (selectedKeyword: string) => void;
}

const LiveSearchInput: React.FC<liveSearchInputProps> = ({
  type,
  data,
  isRouter,
  voiceSearch,
  placeholder,
  clickResultList,
}) => {
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
  const [value, setValue] = React.useState("");

  const { modal } = useModalController();
  const { getIcon } = useIcon();
  const search = getIcon("search", 18, 22);

  const { displayedResults } = useLiveSearchList(type, value, data);
  const { handleInputChange, searchedKeywordClick, handleKeyboard } =
    useLiveSearchController(
      type,
      value,
      setValue,
      displayedResults,
      focusedIndex,
      setFocusedIndex,
      isRouter,
      voiceSearch,
      clickResultList,
    );

  const styles = {
    searchUl: `${typeStyles[type]?.modalWidth} ${
      type === "mypageSearch" && "max-h-[300px]"
    } shadow-xl overflow-y-auto ${BG_COLOR.primary}`,
    searchList: `flex items-center w-full h-[60px] cursor-pointer`,
  };

  return (
    <div className="w-full" onKeyDown={handleKeyboard}>
      <label
        data-testid="realTimeInput"
        htmlFor="keywordSearch"
        className="relative"
      >
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onClick={searchedKeywordClick}
          onChange={handleInputChange}
        />
        {modal[type] && (
          <NonPortalModal topLeft={typeStyles[type]?.topLeft} nonBackdrop>
            <ul className={styles.searchUl}>
              {displayedResults?.map((result: string, i: number) => {
                const bgColor =
                  focusedIndex === i ? BG_COLOR.general03 : BG_COLOR.primary;

                return (
                  <li
                    key={i}
                    data-testid={`item-${i}`}
                    className={`${styles.searchList} ${bgColor}`}
                    onClick={() => searchedKeywordClick(result)}
                    onMouseEnter={() => setFocusedIndex(i)}
                    onMouseLeave={() => setFocusedIndex(null)}
                  >
                    <div className="mx-5">{search}</div>
                    <span>{result}</span>
                  </li>
                );
              })}
            </ul>
          </NonPortalModal>
        )}
      </label>
    </div>
  );
};

export default LiveSearchInput;
