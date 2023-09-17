import React from "react";
import { useSetRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { BG_COLOR } from "@/constants/global/colors";
import Button from "@/components/designSystem/Button";
import { modalAtom } from "@/constants/global/atoms";
import useIcon from "@/hooks/useIcon";
import usePagination from "@/hooks/usePagination";
import { authAPI } from "@/api/authAPI";
import { QUERY_KEYS } from "@/constants/global/querykeys";

import Modal from "../Modal";
import LiveSearchInput from "../../commonUI/LiveSearchInput";

import KeywordList from "./KeywordList";

const styles = {
  container: `flex justify-center w-[1330px] h-[700px] ${BG_COLOR.general02}`,
  widthWrapper: `flex flex-col items-center w-11/12`,
  title: `text-2xl mt-6 mb-8 font-hack`,
  keywordBox: `self-start w-full h-[155px]`,
  keywordBoxTitle: `text-[18px] leading-[22.5px] text-[#888888]`,
  line: `w-[1330px] h-[3px] bg-[#DCDCDC] mt-[30px] mb-5`,
  buttonBox: `self-end mt-[57px]`,
};

const KeywordSearch = () => {
  const setIsModal = useSetRecoilState(modalAtom);
  const [myCategories, setMyCategories] = React.useState<string[]>([]);
  const myCategoriesContainerRef = React.useRef<HTMLUListElement | null>(null);

  const { isLoading: myCategoriesLoading } = useQuery({
    queryKey: [QUERY_KEYS.KEYWORDLIST],
    queryFn: () => authAPI.myKeywords(),
    onSuccess: (data) => {
      setMyCategories(data?.data);
    },
  });

  const { data: trendCategories, isLoading: trendCategoriesLoading } = useQuery(
    {
      queryKey: ["trendCategories"],
      queryFn: () => axios.get("/api/trendCategories"),
    },
  );

  const {
    isFirstPage,
    isLastPage,
    handlePrev,
    handleNext,
    slicedMyCategories,
  } = usePagination(myCategories, myCategoriesContainerRef);

  const { getIcon } = useIcon();
  const prevBtn = getIcon("prevBtn", 48, 48, "cursor");
  const nextBtn = getIcon("nextBtn", 48, 48, "cursor");

  const addCategory = (selectedKeyword: string) => {
    if (!slicedMyCategories.includes(selectedKeyword)) {
      setMyCategories((prev: string[]) => [...prev, selectedKeyword]);
    }
  };

  const handleSubmit = () => {
    console.log(slicedMyCategories);
    // setIsModal((prev) => !prev);
  };

  return (
    <Modal isBgColor isFixed blockScroll>
      <div className={styles.container}>
        <div className={styles.widthWrapper}>
          <span className={styles.title}>Add my keywords</span>
          <LiveSearchInput
            type="keywordSearch"
            clickResultList={addCategory}
            placeholder="키워드를 추가하여 나만의 키워드를 만들어 보세요."
          />
          <div className={styles.keywordBox}>
            <span className={styles.keywordBoxTitle}>현재 나의 키워드</span>
            <div className="relative flex">
              {!isFirstPage && (
                <button
                  className="absolute top-12 -left-14"
                  onClick={handlePrev}
                >
                  {prevBtn}
                </button>
              )}
              {typeof slicedMyCategories && (
                <KeywordList
                  myCategoriesContainerRef={myCategoriesContainerRef}
                  data={slicedMyCategories}
                  type="keywordList"
                  isLoading={myCategoriesLoading}
                  setMyCategories={setMyCategories}
                />
              )}
              {!isLastPage && (
                <button
                  className="absolute top-12 -right-14"
                  onClick={handleNext}
                >
                  {nextBtn}
                </button>
              )}
            </div>
          </div>
          <hr className={styles.line} />
          <div className={styles.keywordBox}>
            <span className={styles.keywordBoxTitle}>실시간 인기 키워드</span>
            <KeywordList
              data={trendCategories?.data ?? []}
              type="trendCategory"
              nonIcon
              isLoading={trendCategoriesLoading}
            />
          </div>
          <div className={styles.buttonBox}>
            <Button
              className="mr-6"
              size="confirm"
              color="black"
              onClick={handleSubmit}
            >
              Ok
            </Button>
            <Button
              size="confirm"
              color="cancelButton"
              border
              onClick={() => setIsModal((prev) => !prev)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default KeywordSearch;
