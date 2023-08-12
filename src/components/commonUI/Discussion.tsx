import React from "react";
import Image from "next/image";
import { useRecoilValue } from "recoil";

import useIcon from "@/hooks/useIcon";
import { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import { isLoggedInAtom } from "@/constants/global/atoms";

import Button from "../designSystem/Button";

const Discussion: React.FC<{ discussion: discussion }> = ({ discussion }) => {
  const { getIcon } = useIcon();
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const bookmark = getIcon("bookmark", 48, 80);
  const checkBookmark = getIcon("checkbook", 48, 80);

  return (
    <div
      className={`w-[1200px] h-[408px] relative flex items-center gap-20 px-[32px] ${BG_COLOR.general02}`}
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
          <h2 className={`${TEXT_COLOR.general07rev} text-[20px]`}>
            {discussion.nickname}
          </h2>
          <h1 className={`${TEXT_COLOR.text} text-[24px] font-bold`}>
            {discussion.title}
          </h1>
        </div>
        {isLoggedIn && (
          <div className="absolute top-0 right-[40px]">
            {discussion.isparticipated ? checkBookmark : bookmark}
          </div>
        )}
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
    </div>
  );
};

export default Discussion;
