import React from "react";

import useGetComments from "@/hooks/commentAPI/useGetComments";

import CommentForm from "./comment/element/textarea/CommentForm";
import CommentsList from "./comment/CommentsList";

// 페이지네이션 기능 구현
const CommentContainer = () => {
  const { data } = useGetComments();
  return (
    <aside className={`w-full`}>
      <CommentForm count={data?.totalResults} />
      <ul>
        {data?.comment.map((comment: grandParentsComment) => (
          <li key={`comment_${comment.commentId}`}>
            <CommentsList {...comment} />
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CommentContainer;
