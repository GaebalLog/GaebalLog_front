"use client";
import React from "react";

import useIcon from "@/hooks/useIcon";
import useModalController from "@/hooks/useModalController";

import Button from "../designSystem/Button";
import RequireLoginConfirm from "../modal/confirm/RequireLoginConfirm";
interface props {
  liked?: boolean;
  like?: number;
  view?: number;
  likeHandler?: () => void;
  option?: { absolute?: boolean };
}
const LikeView: React.FC<props> = ({
  like,
  likeHandler,
  liked,
  view,
  option,
}) => {
  const { modal } = useModalController();

  const { getIcon } = useIcon();
  const likeIcon = getIcon("heart", 16, 14, "cursor hover");
  const checkedLikeIcon = getIcon("checked_heart", 16, 14, "cursor hover");
  const viewIcon = getIcon("eye", 18, 16);
  const btns = [
    {
      id: "like",
      icon: liked ? checkedLikeIcon : likeIcon,
      count: like,
      className: "excluded",
      onClick: likeHandler,
    },
    { id: "search", icon: viewIcon, count: view },
  ];
  return (
    <div
      className={`${
        option?.absolute && "absolute"
      } flex gap-[20px] bottom-2 right-3`}
    >
      {btns.map((btn) => (
        <Button
          key={`${btn.id}likeView`}
          size="withIcon"
          color="background"
          rounded
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
      {modal.requiredLogin && <RequireLoginConfirm />}
    </div>
  );
};

export default LikeView;
