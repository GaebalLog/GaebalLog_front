import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import Button from "@/components/designSystem/Button";
import LoadingSpinner from "@/components/LoadingSpinner";
import useIcon from "@/hooks/useIcon";

const styles = {
  keywordList: `relative flex flex-wrap gap-[10px] h-[100px] mt-[22px] overflow-y-hidden`,
  exceptionUI: `flex justify-center items-center w-full h-[130.5px] text-xl`,
};

interface keywordListProps {
  data: string[];
  type: "myCategory" | "trendCategory";
  nonIcon?: boolean;
  isLoading?: boolean;
  setMyCategories?: React.Dispatch<React.SetStateAction<string[]>>;
  myCategoriesContainerRef?: React.MutableRefObject<HTMLUListElement | null>;
}

const KeywordList: React.FC<keywordListProps> = ({
  data,
  type,
  nonIcon,
  isLoading,
  setMyCategories,
  myCategoriesContainerRef,
}) => {
  const queryClient = useQueryClient();

  const cachedMyCategory = queryClient.getQueryData<{ data: string[] }>([
    "userCategories",
  ])?.data;

  const { getIcon } = useIcon();
  const close = getIcon("close", 18, 18);

  const { mutate } = useMutation({
    mutationFn: (selectedCategory: string) =>
      axios.delete(`/api/usercategories/${selectedCategory}`),
    onSuccess: (_, selectedCategory) => {
      const deletedResult = cachedMyCategory?.filter(
        (category) => category !== selectedCategory,
      );

      replaceMyCategories(deletedResult ?? []);
    },
  });

  const replaceMyCategories = (deletedResult: string[]) => {
    if (!deletedResult || !setMyCategories) return;
    setMyCategories(deletedResult);
    queryClient.setQueryData(["userCategories"], {
      data: deletedResult,
    });
  };

  if (isLoading)
    return (
      <div className={styles.exceptionUI}>
        <LoadingSpinner />
      </div>
    );
  if (data.length === 0)
    return <div className={styles.exceptionUI}>데이터 없음</div>;

  return (
    <ul ref={myCategoriesContainerRef} className={styles.keywordList}>
      {data?.map((category: string) => (
        <li key={`${type}_${category}`} className="category mb-[6px]">
          <Button
            className="flex items-center gap-[10px]"
            data-testid={`${type}_${category}`}
            size="category"
            color="background"
            rounded
            onClick={!nonIcon ? () => mutate(category) : undefined}
          >
            <div className="max-w-[374px] truncate">
              <span>#{category}</span>
            </div>
            {!nonIcon && <div>{close}</div>}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default KeywordList;
