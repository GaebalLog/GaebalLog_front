import React from "react";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";

import useIcon from "@/hooks/useIcon";
import { BG_COLOR, BORDER_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import { isLoggedInAtom } from "@/hooks/useUserAuth";

import Button from "../designSystem/Button";

const Discussion: React.FC<{ discussion: discussion }> = ({ discussion }) => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const router = useRouter();

  const { getIcon } = useIcon();
  const bookmark = getIcon("bookmark", 48, 80, "cursor hover");
  const checkBookmark = getIcon("checkbook", 48, 80, "cursor hover");

  const onClickHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    // 35번째 코드로 인한 타입 가드
    if (!(e.target instanceof HTMLElement)) {
      return;
    }
    if (e.target.closest(".excluded")) {
      return;
    }
    router.push(`/discussion/${discussion.chatListId}`);
  };

  const checkBookmarkHandler = () => {
    console.log("북마크 클릭시 처리");
  };

  return (
    <div
      className={`w-[1200px] h-[408px] relative flex items-center gap-20 px-[32px] ${BG_COLOR.general02} ${BORDER_COLOR.container} cursor-pointer`}
      onClick={onClickHandler}
      data-testid={`discussion${discussion.chatListId}`}
    >
      <div className="w-[332px] h-[280px] overflow-hidden">
        <Image
          src={discussion.thumbnail}
          width={332}
          height={280}
          alt={discussion.title}
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
        {isLoggedIn && (
          <div
            className="absolute top-0 right-[40px] excluded"
            onClick={checkBookmarkHandler}
          >
            {discussion.isparticipated ? checkBookmark : bookmark}
          </div>
        )}
        <p className={`${TEXT_COLOR.general07rev} text-[20px]`}>
          <span className="font-bold">남은시간 </span>
          {discussion.remainingTime}
        </p>
      </div>
    </div>
  );
};

export default Discussion;
