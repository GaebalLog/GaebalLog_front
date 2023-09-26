"use client";
import React from "react";

import Button from "@/components/designSystem/Button";
import useIcon from "@/hooks/useIcon";

interface props {
  liked?: boolean;
  like?: number;
  participants?: number;
  likeHandler?: () => void;
  option?: { absolute?: boolean };
}
const LikeParticipants: React.FC<props> = ({
  like,
  likeHandler,
  liked,
  participants,
  option,
}) => {
  const { getIcon } = useIcon();
  const likeIcon = getIcon("heart", 16, 14, "cursor hover");
  const checkedLikeIcon = getIcon("checked_heart", 16, 14, "cursor hover");
  const participantsIcon = getIcon("people", 18, 16);
  const btns = [
    {
      id: "like",
      icon: liked ? checkedLikeIcon : likeIcon,
      count: like,
      className: "excluded",
      onClick: likeHandler,
    },
    { id: "participants", icon: participantsIcon, count: participants },
  ];
  return (
    <div
      className={`${
        option?.absolute && "absolute"
      } flex gap-[20px] bottom-2 right-3`}
    >
      {btns.map((btn) => (
        <Button
          key={`${btn.id}View`}
          size="withIcon"
          color="background"
          rounded
          border
          className={`flex-wrap ${btn.className} cursor-default`}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            btn.onClick && btn.onClick();
          }}
        >
          {btn.icon}
          {btn.count}
        </Button>
      ))}
    </div>
  );
};

export default LikeParticipants;
