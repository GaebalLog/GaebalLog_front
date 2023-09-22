import React from "react";
import { useRouter } from "next/navigation";

import { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import DateConvertor from "@/utils/util-dateConvertor";

import Button from "../../../designSystem/Button";

const MyDiscussionCard: React.FC<{ discussion: beforeDiscussion }> = ({
  discussion,
}) => {
  const router = useRouter();

  const dateConvertor = new DateConvertor(discussion.createdAt);

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
      className={`w-full h-[350px] relative flex items-center gap-20 px-[32px] ${BG_COLOR.primary} cursor-pointer`}
      onClick={onClickHandler}
      data-testid={`discussion${discussion.chatListId}`}
    >
      <div
        className={`absolute top-4 right-6 rounded-2xl py-1 ${
          discussion.isDone
            ? "px-4 bg-[#03A727] border-[#096B13]"
            : "px-[10px] bg-[#FFA800] border-[#B86E00]"
        }`}
      >
        {discussion.isDone ? "완료" : "진행 중"}
      </div>
      <div className="flex justify-between flex-col h-[280px] gap-[80px]">
        <div className="flex flex-col gap-[24px]">
          <div
            className={`flex items-center gap-[16px] ${TEXT_COLOR.general07rev}`}
          >
            <p className={`${TEXT_COLOR.general07rev} text-[20px]`}>
              {discussion.nickname}
            </p>
            <h2>{dateConvertor.formatWithLongDate()}</h2>
          </div>
          <h1 className={`${TEXT_COLOR.text} text-[24px] font-bold`}>
            {discussion.title}
          </h1>
          {!discussion.isDone && (
            <span>{`남은 시간 ${discussion.remainingTime}`}</span>
          )}
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

export default MyDiscussionCard;
