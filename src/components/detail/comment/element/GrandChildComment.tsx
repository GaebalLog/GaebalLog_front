import React from "react";

import DeletedComment from "./card/DeletedComment";
import ChildCommentCard from "./card/ChildCommentCard";

const GrandChildComment: React.FC<comment> = ({ ...comment }) => {
  const { isDeleted } = comment;
  return (
    <>
      {isDeleted ? (
        <DeletedComment childComment />
      ) : (
        <ChildCommentCard deps="grandchild" {...comment} />
      )}
    </>
  );
};

export default GrandChildComment;
