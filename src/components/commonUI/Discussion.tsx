import React from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";

import useIcon from "@/hooks/useIcon";
import { BG_COLOR, BORDER_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import { isLoggedInAtom } from "@/hooks/useUserAuth";

import Button from "../designSystem/Button";
import LikeParticipants from "../discussion/box/LikeParticipant";

const Discussion: React.FC<{
  discussion: discussion;
  likeHandler: (postId: number) => void;
}> = ({ discussion, likeHandler }) => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const router = useRouter();

  const { getIcon } = useIcon();
  const bookmark = getIcon("bookmark", 48, 80);
  const checkBookmark = getIcon("checkbook", 48, 80);

  const clickHeartHandler = () => {
    likeHandler(discussion.discussionId);
  };

  const onClickHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }
    if (e.target.closest(".excluded")) {
      return;
    }
    router.push(`/discussion/${discussion.discussionId}`);
  };

  return (
    <div
      data-testId={`discussion${discussion.discussionId}`}
      className={`w-[1200px] h-[408px] relative flex items-center gap-20 px-[32px] ${BG_COLOR.general02} ${BORDER_COLOR.container} cursor-pointer`}
      onClick={onClickHandler}
      data-testid={`discussion${discussion.discussionId}`}
    >
      <div className="w-[332px] h-[280px] overflow-hidden">
        <div
          className="w-[280px] thumbnail-box"
          dangerouslySetInnerHTML={{ __html: discussion.thumbnail }}
        />
      </div>
      <div className="flex justify-between flex-col h-[280px] gap-[80px]">
        <div className="flex flex-col gap-[24px]">
          <p className={`${TEXT_COLOR.general07rev} text-[20px]`}>
            <span className="font-bold">진행자 </span>
            {discussion.nickname}
          </p>
          <h1 className={`${TEXT_COLOR.text} text-[24px] font-bold`}>
            {discussion.title}
          </h1>
          <div className="flex items-center gap-[16px]">
            {discussion.category.map((category) => (
              <Button
                key={`${discussion.discussionId}${category}`}
                color="grey"
                size="tag"
              >
                # {category}
              </Button>
            ))}
          </div>
        </div>
        {isLoggedIn && (
          <div className="absolute top-0 right-[40px]">
            {discussion.participating ? checkBookmark : bookmark}
          </div>
        )}
        <p className={`${TEXT_COLOR.general07rev} text-[20px]`}>
          <span className="font-bold">남은시간 </span>
          {discussion.remainingTime}
        </p>
      </div>
      <div>
        <LikeParticipants
          like={discussion.like}
          likeHandler={clickHeartHandler}
          liked={discussion.liked}
          participants={discussion.participants}
          option={{ absolute: true }}
        />
      </div>
    </div>
  );
};

export default Discussion;
