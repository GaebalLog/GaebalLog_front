import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { BG_COLOR } from "@/constants/global/colors";
import useIcon from "@/hooks/useIcon";
import usePagination from "@/hooks/usePagination";
import { authAPI } from "@/api/authAPI";
import { QUERY_KEYS } from "@/constants/global/querykeys";

import Modal from "../Modal";
import LiveSearchInput from "../../commonUI/LiveSearchInput";

import KeywordList from "./KeywordList";
import OkCancelButton from "./elements/OkCancelButton";

const styles = {
  container: `flex justify-center w-[1330px] h-[700px] ${BG_COLOR.general02}`,
  widthWrapper: `flex flex-col items-center w-11/12`,
  title: `text-2xl mt-6 mb-8 font-hack`,
  keywordBox: `self-start w-full h-[155px]`,
  keywordBoxTitle: `text-[18px] leading-[22.5px] text-[#888888]`,
  line: `w-[1330px] h-[3px] bg-[#DCDCDC] mt-[30px] mb-5`,
};

const KeywordSearch = () => {
  const [myCategories, setMyCategories] = React.useState<{ keyword: string }[]>(
    [],
  );
  const myCategoriesContainerRef = React.useRef<HTMLUListElement | null>(null);
  const queryClient = useQueryClient();

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
      queryFn: async () => await authAPI.trendKeywords(),
    },
  );

  const { mutate } = useMutation({
    mutationFn: (selectedKeyword: string) =>
      authAPI.addKeywords(selectedKeyword),
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEYS.KEYWORDLIST]);
    },
    onError() {
      alert("키워드 추가 실패");
    },
  });

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

  return (
    <Modal isBgColor isFixed blockScroll>
      <div className={styles.container}>
        <div className={styles.widthWrapper}>
          <span className={styles.title}>Add my keywords</span>
          <LiveSearchInput
            type="keywordSearch"
            clickResultList={(selectedKeyword) => mutate(selectedKeyword)}
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
          <OkCancelButton />
        </div>
      </div>
    </Modal>
  );
};

export default KeywordSearch;
