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

  return (
    <div className={styles}>
      <ArrowInNestedComment className="mr-[22.6px]" />
      <CommentCard {...comment} />
    </div>
  );
};

export default ChildCommentCard;
