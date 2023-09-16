"use client";
import React from "react";
import { useRouter } from "next/navigation";

import Input from "@/components/designSystem/Input";
import { BG_COLOR } from "@/constants/global/colors";
import useIcon from "@/hooks/useIcon";
import useInput from "@/hooks/useInput";
import useModalController from "@/hooks/useModalController";
import useLiveSearchList from "@/hooks/useLiveSearchList";

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
    modalWidth: "w-[1180px]",
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
  const { modal, openModal, closeModal } = useModalController();
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
  const router = useRouter();

  const { value, setValue } = useInput();

  const { displayedResults } = useLiveSearchList(type, value, data);

  const { getIcon } = useIcon();
  const search = getIcon("search", 18, 22);

  const styles = {
    searchUl: `${typeStyles[type]?.modalWidth} shadow-xl ${BG_COLOR.primary}`,
    searchList: `flex items-center w-full h-[60px] cursor-pointer`,
  };

  const searchKeywordClick = (selectedKeyword: string) => {
    clickResultList && clickResultList(selectedKeyword);
    closeModal(type);
    isRouter && router.push(`/tech?keyword=${selectedKeyword}`);
    if (type === "keywordSearch") return setValue("");
    setValue(selectedKeyword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      openModal(type);
    } else {
      closeModal(type);
    }
    setValue(e.target.value);
  };

  const handleKeyboard = (event: React.KeyboardEvent) => {
    const { key } = event;
    const maxIndex = (displayedResults?.length || 0) - 1;

    if (key === "ArrowDown") {
      openModal(type);
      return setFocusedIndex((prev) =>
        prev !== null && prev < maxIndex ? prev + 1 : 0,
      );
    }
    if (key === "ArrowUp") {
      return setFocusedIndex((prev) =>
        prev !== null && prev > 0 ? prev - 1 : maxIndex,
      );
    }
    if (key === "Enter") {
      const selectedResult =
        focusedIndex !== null ? displayedResults[focusedIndex] : value;
      closeModal(type);
      return searchKeywordClick(selectedResult + "");
    }
  };

  React.useEffect(() => {
    if (voiceSearch) {
      setValue(voiceSearch);
      searchKeywordClick(voiceSearch);
    }
  }, [voiceSearch]);

  React.useEffect(() => {
    if (modal[type] === false) setFocusedIndex(null);
  }, [modal]);

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
          value={value + ""}
          onClick={searchKeywordClick}
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
                    onClick={() => searchKeywordClick(result)}
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
