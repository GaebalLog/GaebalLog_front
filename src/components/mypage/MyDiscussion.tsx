import React from "react";
import { useRouter } from "next/navigation";

import { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import getTime from "@/utils/util-getTime";

import Button from "../designSystem/Button";

const MyDiscussion: React.FC<{ discussion: beforeDiscussion }> = ({
  discussion,
}) => {
  const router = useRouter();

  const onClickHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    } else if (e.target.closest(".excluded")) {
      return;
    }
    router.push(`/discussion/${discussion.chatListId}`);
  };

  return (
    <div
      className={`w-[368px] h-[350px] relative flex items-center gap-20 px-[32px] ${BG_COLOR.primary} cursor-pointer`}
      onClick={onClickHandler}
      data-testid={`discussion${discussion.chatListId}`}
    >
      <div className="flex justify-between flex-col h-[280px] gap-[80px]">
        <div className="flex flex-col gap-[24px]">
          <div
            className={`flex items-center gap-[16px] ${TEXT_COLOR.general07rev}`}
          >
            <p className={`${TEXT_COLOR.general07rev} text-[20px]`}>
              <span className="font-bold">진행자 </span>
              {discussion.nickname}
            </p>
            <h2>{getTime(discussion.remainingTime)}</h2>
          </div>
          <h1 className={`${TEXT_COLOR.text} text-[24px] font-bold`}>
            {discussion.title}
          </h1>
          <div className="flex items-center gap-[16px] absolute bottom-[24px]">
            {discussion.categories.map((category) => (
              <Button
                key={`${discussion.chatListId}${category}`}
                color="grey"
                size="tag"
              >
                # {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDiscussion;
