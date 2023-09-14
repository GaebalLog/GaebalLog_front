import React from "react";
import { useRecoilValue } from "recoil";

import { openCommentEditorAtom } from "@/constants/global/atoms";

import GrandChildComment from "./GrandChildComment";
import SubCommentForm from "./textarea/SubCommentForm";
import DeletedComment from "./card/DeletedComment";
import ChildCommentCard from "./card/ChildCommentCard";

const ChildComment: React.FC<parentsComment> = ({ ...comment }) => {
  const editingId = useRecoilValue(openCommentEditorAtom);

  const { commentId, isDeleted, child } = comment;
  return (
    <>
      {isDeleted ? (
        <DeletedComment childComment />
      ) : (
        <ChildCommentCard deps="child" {...comment} />
      )}
      {editingId === commentId && <SubCommentForm parentId={commentId} />}
      <ul>
        {child?.map((comment: comment) => (
          <li key={comment.commentId}>
            <GrandChildComment {...comment} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChildComment;
