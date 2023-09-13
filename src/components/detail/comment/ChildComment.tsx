import React from "react";
import { useRecoilValue } from "recoil";

import { BG_COLOR } from "@/constants/global/colors";
import { openCommentEditorAtom } from "@/constants/global/atoms";

import ArrowInNestedComment from "../icons/ArrowInNestedComment";
import SubCommentForm from "../form/SubCommentForm";

import CommentCard from "./CommentCard";
import GrandChildComment from "./GrandChildComment";
import DeletedComment from "./DeletedComment";

const styles = {
  childCommentList: `grid grid-cols-[auto,1fr] pt-4 px-[55px] mb-6 ${BG_COLOR.general01}`,
};

const ChildComment: React.FC<parentsComment> = ({ ...comment }) => {
  const selectedCommentId = useRecoilValue(openCommentEditorAtom);

  const { commentId, isDeleted, childComments } = comment;
  return (
    <>
      {isDeleted ? (
        <DeletedComment childComment />
      ) : (
        <div className={styles.childCommentList}>
          <ArrowInNestedComment className="mr-[22.6px]" />
          <CommentCard {...comment} />
        </div>
      )}
      {selectedCommentId === commentId && <SubCommentForm />}
      <ul>
        {childComments?.map((comment: comment) => (
          <li key={comment.commentId}>
            <GrandChildComment {...comment} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChildComment;
