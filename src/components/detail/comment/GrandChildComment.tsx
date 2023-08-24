import React from "react";
import { useRecoilValue } from "recoil";

import { BG_COLOR } from "@/constants/global/colors";
import { activeModalIdAtom } from "@/hooks/useModalController";

import ArrowInNestedComment from "../icons/ArrowInNestedComment";
import SubCommentForm from "../form/SubCommentForm";

import CommentCard from "./CommentCard";
import DeletedComment from "./DeletedComment";

const styles = {
  childCommentList: `grid grid-cols-[auto,1fr] pt-4 pl-[125px] pr-[55px] mb-6 ${BG_COLOR.general01}`,
};

const GrandChildComment: React.FC<comment> = ({ ...comment }) => {
  const activeCommentId = useRecoilValue(activeModalIdAtom);

  const { commentId, isDeleted } = comment;
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
      {activeCommentId === commentId && <SubCommentForm />}
    </>
  );
};

export default GrandChildComment;
