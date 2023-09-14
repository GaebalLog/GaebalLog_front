import React from "react";

import { BG_COLOR } from "@/constants/global/colors";

import ArrowInNestedComment from "../../icons/ArrowInNestedComment";

import CommentCard from "./CommentCard";

const ChildCommentCard: React.FC<
  parentsComment & { deps: "child" | "grandchild" }
> = ({ deps, ...comment }) => {
  const styles =
    deps === "child"
      ? `grid grid-cols-[auto,1fr] pt-4 px-[55px] mb-6 ${BG_COLOR.general01}`
      : `grid grid-cols-[auto,1fr] pt-4 pl-[125px] pr-[55px] mb-6 ${BG_COLOR.purple}`;
  const color = deps === "grandchild" ? "#888888" : "#D3D3D3";
  return (
    <div className={styles}>
      <ArrowInNestedComment className="mr-[22.6px]" color={color} />
      <CommentCard {...comment} grandChildComment={deps === "grandchild"} />
    </div>
  );
};

export default ChildCommentCard;
