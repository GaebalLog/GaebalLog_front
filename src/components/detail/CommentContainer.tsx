import React from "react";

import useGetComments from "@/hooks/commentAPI/useGetComments";

import CommentForm from "./comment/element/textarea/CommentForm";
import CommentsList from "./comment/CommentsList";

const CommentContainer = ({ postId }: { postId: number }) => {
  const { data } = useGetComments({ postId });
  return (
    <aside className={`w-full`}>
      <CommentForm count={data?.totalResults} postId={postId} />
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
