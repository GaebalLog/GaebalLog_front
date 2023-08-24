import React from "react";
import { useSetRecoilState } from "recoil";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { BG_COLOR } from "@/constants/global/colors";
import Button from "@/components/designSystem/Button";
import { modalAtom } from "@/constants/global/atoms";
import { scrollHandler } from "@/utils/util-scrollhandler";

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
  const [addedCategories, setAddedCategories] = React.useState<string[]>([]);
  const [myCategories, setMyCategories] = React.useState<string[]>([]);
  const setIsModal = useSetRecoilState(modalAtom);
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

  const categoryAddHandler = async (selectedKeyword: string) => {
    const addedResult = (prev: string[]) => [...prev, selectedKeyword];

    if (!addedCategories.includes(selectedKeyword)) {
      queryClient.setQueryData(["userCategories"], {
        data: [...myCategories, selectedKeyword],
      });
      setMyCategories(addedResult);
      setAddedCategories(addedResult);
    }
  };

  const addedCategorySubmitHandler = () => {
    setAddedCategories([]);
    setIsModal((prev) => !prev);
  };

  React.useEffect(() => {
    scrollHandler.disabledScroll();
    return () => scrollHandler.enabledScroll();
  }, []);

  return (
    <Modal isBgColor>
      <div className={styles.container}>
        <div className={styles.widthWrapper}>
          <span className={styles.title}>Add my keywords</span>
          <LiveSearchInput
            type="searchModal"
            categoryAddHandler={categoryAddHandler}
            placeholder="키워드를 추가하여 나만의 키워드를 만들어 보세요."
          />
          <div className={styles.keywordBox}>
            <span className={styles.keywordBoxTitle}>현재 나의 키워드</span>
            <KeywordList
              data={myCategories}
              type="myCategory"
              isLoading={myCategoriesLoading}
              setMyCategories={setMyCategories}
            />
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
              onClick={addedCategorySubmitHandler}
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
