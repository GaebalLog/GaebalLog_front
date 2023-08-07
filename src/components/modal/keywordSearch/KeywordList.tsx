import Image from "next/image";
import React from "react";

import Button from "@/components/designSystem/Button";
import LoadingSpinner from "@/components/LoadingSpinner";

import close from "../../../../public/assets/images/common/close.png";

const style = {
  keywordList: `flex flex-wrap gap-[10px] mt-[22px]`,
  exceptionUI: `flex justify-center items-center w-full h-[130.5px] text-xl`,
};

interface keywordListProps {
  data: string[];
  type: "myCategory" | "trendCategory";
  noneIcon?: boolean;
  isLoading?: boolean;
}

const KeywordList: React.FC<keywordListProps> = ({
  data,
  type,
  noneIcon,
  isLoading,
}) => {
  if (isLoading)
    return (
      <div className={style.exceptionUI}>
        <LoadingSpinner />
      </div>
    );
  if (!data) return <div className={style.exceptionUI}>데이터 없음</div>;
  return (
    <ul className={style.keywordList}>
      {data?.map((category: string) => {
        return (
          <li
            key={`${type}_${category}`}
            data-testid={`${type}_${category}`}
            className="mb-[6px]"
          >
            <Button size="category" color="background" rounded withIcon>
              <span>#{category}</span>
              {noneIcon && (
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
        );
      })}
    </ul>
  );
};

export default KeywordList;
