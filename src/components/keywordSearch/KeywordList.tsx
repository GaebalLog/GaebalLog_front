import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Button from "@/components/UI/buttons/base/Button";
import LoadingSpinner from "@/components/UI/status/LoadingSpinner";
import useIcon from "@/hooks/useIcon";
import { authAPI } from "@/config/api/authAPI";
import { QUERY_KEYS } from "@/config/query_config";

const styles = {
  keywordList: `relative flex flex-wrap gap-[10px] h-[100px] px-1 mt-[22px] overflow-y-hidden`,
  exceptionUI: `flex justify-center items-center w-full h-[130.5px] text-xl`,
};

interface keywordListProps {
  data: { keyword: string }[];
  type: "keywordList" | "trendCategory";
  nonIcon?: boolean;
  isLoading?: boolean;
  myCategoriesContainerRef?: React.MutableRefObject<HTMLUListElement | null>;
}

const KeywordList: React.FC<keywordListProps> = ({
  data,
  type,
  nonIcon,
  isLoading,
  myCategoriesContainerRef,
}) => {
  const queryClient = useQueryClient();

  const { getIcon } = useIcon();
  const close = getIcon("close", 18, 18);

  const { mutate } = useMutation({
    mutationFn: (selectedKeyword: string) =>
      authAPI.deleteKeywords(selectedKeyword),
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEYS.KEYWORDLIST]);
    },
    onError() {
      alert("키워드 삭제 실패");
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
    <ul ref={myCategoriesContainerRef} className={styles.keywordList}>
      {data?.map(({ keyword }: { keyword: string }) => (
        <li key={`${type}_${keyword}`} className="category mb-[6px]">
          <Button
            className="flex items-center gap-[10px]"
            data-testid={`${type}_${keyword}`}
            size="category"
            color="category"
            rounded
            onClick={
              !nonIcon
                ? (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                    e.preventDefault();
                    mutate(keyword);
                  }
                : undefined
            }
          >
            <div className="max-w-[374px] truncate">
              <span>#{keyword}</span>
            </div>
            {!nonIcon && <div>{close}</div>}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default KeywordList;
