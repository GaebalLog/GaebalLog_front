"use client";
import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import Input from "@/components/designSystem/Input";
import { BG_COLOR } from "@/constants/global/colors";
import useIcon from "@/hooks/useIcon";
import useInput from "@/hooks/useInput";
import useDebounce from "@/hooks/useDebounce";

import NonPortalModal from "../modal/NonPortalModal";

const typeStyles = {
  searchModal: {
    topLeft: { top: 50, left: 19.5 },
    modalWidth: "w-[1180px]",
  },
  header: {
    topLeft: { top: 48, left: 19.5 },
    modalWidth: "w-[360px]",
  },
};

interface liveSearchInputProps {
  addCategory?: (selectedKeyword: string) => void;
  type: "searchModal" | "header";
  isRouter?: boolean;
  voiceSearch?: string | null;
  placeholder?: string;
}

const LiveSearchInput: React.FC<liveSearchInputProps> = ({
  addCategory,
  type,
  isRouter,
  voiceSearch,
  placeholder,
}) => {
  const [isModal, setIsModal] = React.useState<boolean>(false);
  const [displayedResults, setDisplayedResults] = React.useState([]);
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
  const modalRef = React.useRef<HTMLUListElement | null>(null);
  const inputRef = React.useRef<HTMLLabelElement | null>(null);
  const router = useRouter();

  const { value, onChange, setValue } = useInput();
  const debouncedValue = useDebounce(value + "");
  const { data } = useQuery({
    queryKey: ["liveSearch", debouncedValue],
    queryFn: () => axios.get(`/api/liveSearch?value=${debouncedValue}`),
    onSuccess: (data) => setDisplayedResults(data.data),
  });

  const { getIcon } = useIcon();
  const search = getIcon("search", 18, 22);

  const styles = {
    searchUl: `${typeStyles[type].modalWidth} shadow-xl ${BG_COLOR.primary}`,
    searchList: `flex items-center w-full h-[60px] cursor-pointer`,
  };

  const modalOutsideClick = React.useCallback((event: MouseEvent) => {
    if (!(event.target instanceof Node)) return;
    const isClickInsideInput = inputRef.current?.contains(event.target);
    const isClickInsideModal = modalRef.current?.contains(event.target);
    if (!isClickInsideInput && !isClickInsideModal) {
      setFocusedIndex(null);
      setIsModal(false);
    }
  }, []);

  const searchKeywordClick = (selectedKeyword: string) => {
    addCategory && addCategory(selectedKeyword);
    setIsModal((prev) => !prev);
    setFocusedIndex(null);
    isRouter && router.push(`/tech?keyword=${selectedKeyword}`);
    if (type === "searchModal") return setValue("");
  };

  const keyboardHandler = (event: React.KeyboardEvent) => {
    const { key } = event;
    const maxIndex = (data?.data.length || 0) - 1;

    if (key === "ArrowDown") {
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
        focusedIndex !== null ? data?.data[focusedIndex] : value;
      return searchKeywordClick(selectedResult);
    }
  };

  React.useEffect(() => {
    if (focusedIndex !== null && data?.data) {
      setValue(data.data[focusedIndex]);
    }
  }, [focusedIndex, data, setValue]);

  React.useEffect(() => {
    if (voiceSearch) {
      setValue(voiceSearch);
      searchKeywordClick(voiceSearch);
    }
  }, [voiceSearch]);
  React.useEffect(() => {
    setIsModal(Boolean(value));
  }, [value]);

  React.useEffect(() => {
    document.addEventListener("mousedown", modalOutsideClick);
    return () => document.removeEventListener("mousedown", modalOutsideClick);
  }, [modalOutsideClick]);

  return (
    <div className="w-full" onKeyDown={keyboardHandler}>
      <label
        data-testid="realTimeInput"
        htmlFor="searchModal"
        className="relative"
        ref={inputRef}
      >
        <Input
          type={type}
          placeholder={placeholder}
          value={value + ""}
          onChange={onChange}
          onClick={searchKeywordClick}
        />
        {isModal && (
          <NonPortalModal topLeft={typeStyles[type].topLeft} nonBackdrop>
            <ul className={styles.searchUl} ref={modalRef}>
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
