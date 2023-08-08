import Image from "next/image";
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import Button from "@/components/designSystem/Button";
import LoadingSpinner from "@/components/LoadingSpinner";

import close from "../../../../public/assets/images/common/close.png";

const styles = {
  keywordList: `flex flex-wrap gap-[10px] mt-[22px]`,
  exceptionUI: `flex justify-center items-center w-full h-[130.5px] text-xl`,
};

interface keywordListProps {
  data: string[];
  type: "myCategory" | "trendCategory";
  nonIcon?: boolean;
  isLoading?: boolean;
  setMyCategories?: React.Dispatch<React.SetStateAction<string[]>>;
}

const KeywordList: React.FC<keywordListProps> = ({
  data,
  type,
  nonIcon,
  isLoading,
  setMyCategories,
}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (selectedCategory: string) =>
      axios.delete(`/api/usercategories/${selectedCategory}`),
    onSuccess: (_, selectedCategory) => {
      const myCategory = queryClient.getQueryData<{ data: string[] }>([
        "userCategories",
      ])?.data;

      const deletedResult = myCategory?.filter(
        (category) => category !== selectedCategory,
      );

      if (!deletedResult || !setMyCategories) return;

      setMyCategories(deletedResult);
      queryClient.setQueryData(["userCategories"], {
        data: deletedResult,
      });
    },
  });

  if (isLoading)
    return (
      <div className={styles.exceptionUI}>
        <LoadingSpinner />
      </div>
    );
  if (data.length === 0)
    return <div className={styles.exceptionUI}>데이터 없음</div>;

  return (
    <ul className={styles.keywordList}>
      {data?.map((category: string) => (
        <li key={`${type}_${category}`} className="mb-[6px]">
          <Button
            data-testid={`${type}_${category}`}
            size="category"
            color="background"
            rounded
            onClick={!nonIcon ? () => mutate(category) : undefined}
          >
            <span>#{category}</span>
            {!nonIcon && (
              <Image
                className="ml-[10px]"
                src={close}
                width={18}
                height={18}
                alt="삭제"
              />
            )}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default KeywordList;
