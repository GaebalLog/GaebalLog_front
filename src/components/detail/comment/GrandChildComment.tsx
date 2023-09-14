import React from "react";

import { BG_COLOR } from "@/constants/global/colors";

import ArrowInNestedComment from "../icons/ArrowInNestedComment";

import CommentCard from "./CommentCard";
import DeletedComment from "./DeletedComment";

const styles = {
  childCommentList: `grid grid-cols-[auto,1fr] pt-4 pl-[125px] pr-[55px] mb-6 ${BG_COLOR.purple}`,
};

const GrandChildComment: React.FC<comment> = ({ ...comment }) => {
  const { isDeleted } = comment;
  return (
    <>
      {isDeleted ? (
        <DeletedComment childComment />
      ) : (
        <div className={styles.childCommentList}>
          <ArrowInNestedComment className="mr-[22.6px]" />
          <CommentCard grandChildComment {...comment} />
        </div>
      )}
    </>
  );
};

export default GrandChildComment;
