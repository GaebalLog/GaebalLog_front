import React from "react";
import { useSetRecoilState } from "recoil";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { BG_COLOR } from "@/constants/global/colors";
import Button from "@/components/designSystem/Button";
import { modalAtom } from "@/constants/global/atoms";
import useIcon from "@/hooks/useIcon";

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
  const [addedCategories, setAddedCategories] = React.useState<string[]>([]);
  const [myCategories, setMyCategories] = React.useState<string[]>([]);
  const [remainingCategoryCount, setRemainingCategoryCount] = React.useState(0);
  const [startIndex, setStartIndex] = React.useState(0);
  const [renderedItemCount, setRenderedItemCount] = React.useState(0);
  const [renderedItemCountArray, setRenderedItemCountArray] = React.useState<
    number[]
  >([]);
  const myCategoriesContainerRef = React.useRef<HTMLUListElement | null>(null);
  const queryClient = useQueryClient();

  const { isLoading: myCategoriesLoading } = useQuery({
    queryKey: ["userCategories"],
    queryFn: () => axios.get("/api/usercategories"),
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

  const { getIcon } = useIcon();
  const prevBtn = getIcon("prevBtn", 35, 35, "cursor");
  const nextBtn = getIcon("nextBtn", 35, 35, "cursor");
  const slicedMyCategories = myCategories.slice(startIndex);
  const isFirsPage = remainingCategoryCount === myCategories.length;
  const isLastPage = startIndex + renderedItemCount < myCategories.length;

  const handleNext = () => {
    setStartIndex((prev) => prev + renderedItemCount);
    setRemainingCategoryCount((prev) =>
      prev > 0 ? prev - renderedItemCount : 0,
    );
    setRenderedItemCountArray((prev) => [...prev, renderedItemCount]);
  };

  const handlePrev = () => {
    const lastRenderedItemCount =
      renderedItemCountArray[renderedItemCountArray.length - 1];
    setStartIndex((prev) => prev - lastRenderedItemCount);
    setRemainingCategoryCount((prev) => prev + lastRenderedItemCount);
    setRenderedItemCountArray((prev) => {
      prev.pop();
      return prev;
    });
  };

  const addCategory = (selectedKeyword: string) => {
    const addedResult = (prev: string[]) => [...prev, selectedKeyword];

    if (!addedCategories.includes(selectedKeyword)) {
      queryClient.setQueryData(["userCategories"], {
        data: [...myCategories, selectedKeyword],
      });
      setMyCategories(addedResult);
      setAddedCategories(addedResult);
    }
  };

  const handleSubmit = () => {
    setAddedCategories([]);
    setIsModal((prev) => !prev);
  };

  React.useEffect(() => {
    const container = myCategoriesContainerRef.current;
    if (container) {
      const totalMyCategories = Array.from(
        container.getElementsByClassName("category"),
      ) as HTMLDivElement[];
      const renderedItems = totalMyCategories.filter(
        (item) => item.offsetTop < container.clientHeight,
      );
      setRenderedItemCount(renderedItems.length);
    }
  }, [myCategories, startIndex]);

  React.useEffect(() => {
    setRemainingCategoryCount(myCategories.length);
  }, [myCategories]);

  return (
    <Modal isBgColor isFixed blockScroll>
      <div className={styles.container}>
        <div className={styles.widthWrapper}>
          <span className={styles.title}>Add my keywords</span>
          <LiveSearchInput
            type="searchModal"
            addCategory={addCategory}
            placeholder="키워드를 추가하여 나만의 키워드를 만들어 보세요."
          />
          <div className={styles.keywordBox}>
            <span className={styles.keywordBoxTitle}>현재 나의 키워드</span>
            <div className="relative flex">
              {!isFirsPage && (
                <button
                  className="absolute top-12 -left-10"
                  onClick={handlePrev}
                >
                  {prevBtn}
                </button>
              )}
              <KeywordList
                myCategoriesContainerRef={myCategoriesContainerRef}
                data={isFirsPage ? myCategories : slicedMyCategories}
                type="myCategory"
                isLoading={myCategoriesLoading}
                setMyCategories={setMyCategories}
              />
              {isLastPage && (
                <button
                  className="absolute top-12 -right-10"
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
