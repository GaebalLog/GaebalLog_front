import React from "react";

import { BG_COLOR } from "@/constants/global/colors";
import useIcon from "@/hooks/useIcon";

import NonPortalModal from "../modal/NonPortalModal";

const modalPosition = {
  topLeft: { top: 50, left: 19.5 },
  modalWidth: "w-[1180px]",
};
const styles = {
  searchUl: `w-[1261px] shadow-xl ${BG_COLOR.primary} overflow-y-scroll max-h-[300px]`,
  searchList: `flex items-center px-[24px] w-full gap-[20px] h-[60px] cursor-pointer`,
};

interface props {
  displayedResults: string[];
  focusedIndex: number | null;
  setFocusedIndex: (index: number) => void;
  keywordHandler: (value: string) => void;
}
const SearchCategory: React.FC<props> = ({
  displayedResults,
  keywordHandler,
  focusedIndex,
  setFocusedIndex,
}) => {
  const { getIcon } = useIcon();
  const search = getIcon("search", 18, 22);

  return (
    <NonPortalModal topLeft={modalPosition.topLeft} nonBackdrop>
      <ul className={styles.searchUl}>
        {displayedResults?.length !== 0 &&
          displayedResults?.map((result: string, i: number) => {
            const bgColor =
              focusedIndex === i ? BG_COLOR.general03 : BG_COLOR.primary;
            return (
              <li
                key={i}
                data-testid={`item-${i}`}
                className={`${styles.searchList} ${bgColor}`}
                onClick={() => keywordHandler(result)}
                onMouseEnter={() => setFocusedIndex(i)}
              >
                {search}
                <span className="px-[5px]">{result}</span>
              </li>
            );
          })}
        {displayedResults?.length === 0 && <p>검색결과가 없습니다.</p>}
      </ul>
    </NonPortalModal>
  );
};

export default SearchCategory;
