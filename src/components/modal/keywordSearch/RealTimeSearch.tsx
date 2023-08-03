import React from "react";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import Input from "@/components/designSystem/Input";
import { BG_COLOR } from "@/constants/global/colors";

import search from "../../../../public/assets/home/search.png";
import NonPortalModal from "../NonPortalModal";

interface realtimeSearchProps {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

const RealtimeSearch = ({ value, onChange }: realtimeSearchProps) => {
  const [isModal, setIsModal] = React.useState<boolean>(false);
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
  const modalRef = React.useRef<HTMLUListElement | null>(null);
  const inputRef = React.useRef<HTMLLabelElement | null>(null);

  const { data } = useQuery({
    queryKey: ["liveSearch"],
    queryFn: () => axios.get("/api/liveSearch"),
  });

  const modalOutsideClick = React.useCallback((event: MouseEvent) => {
    if (!(event.target instanceof Node)) return;
    const isClickInsideInput = inputRef.current?.contains(event.target);
    const isClickInsideModal = modalRef.current?.contains(event.target);
    if (!isClickInsideInput && !isClickInsideModal) setIsModal(false);
  }, []);

  const searchKeywordClick = () => {
    setIsModal((prev) => !prev);
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
    if (key === "Enter" && focusedIndex !== null) {
      return searchKeywordClick();
    }
  };

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
          type="searchModal"
          placeholder="키워드를 추가하여 나만의 키워드를 만들어 보세요."
          value={value}
          onChange={onChange}
        />
        {isModal && (
          <NonPortalModal topLeft={{ top: 50, left: 19.5 }} noneBackdrop>
            <ul className="w-[1180px] shadow-xl" ref={modalRef}>
              {data?.data.map((result: string, i: number) => {
                const bgColor =
                  focusedIndex === i ? "bg-gray-200" : BG_COLOR.primary;

                return (
                  <li
                    key={i}
                    data-testid={`item-${i}`}
                    tabIndex={0}
                    className={`flex items-center w-full h-[60px] ${bgColor} cursor-pointer hover:bg-gray-200`}
                    onClick={searchKeywordClick}
                  >
                    <Image
                      className="px-6"
                      src={search}
                      width={18}
                      height={18}
                      alt="돋보기"
                    />
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

export default RealtimeSearch;
