import React from "react";
import { useRecoilValue } from "recoil";

import { BG_COLOR } from "@/constants/global/colors";
import { openCommentEditorAtom } from "@/constants/global/atoms";

import CommentCard from "./comment/CommentCard";
import SubCommentForm from "./form/SubCommentForm";
import DeletedComment from "./comment/DeletedComment";
import HasChildLayout from "./comment/HasChildLayout";

const styles = {
  commentAddButton: `flex justify-center items-center text-[#967AC3]`,
  plusIcon: `flex items-center pb-1 px-[3px] h-5 mr-5 border-2 border-[#967AC3] font-bold`,
  line: `w-full h-[3px] mt-[63px] mb-8 ${BG_COLOR.general01}`,
  childCommentVisibleButton: `flex items-center gap-2 mb-[35px] text-[#967AC3]`,
  childCommentList: `grid grid-cols-[auto,1fr] pt-4 px-[55px] ${BG_COLOR.general01}`,
};

const CommentsList: React.FC<grandParentsComment> = ({ ...comment }) => {
  const selectedCommentId = useRecoilValue(openCommentEditorAtom);
  const { commentId, postId, isDeleted, child } = comment;
  const hasChildComments = child && child?.length > 0;

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div>
        {isDeleted ? (
          <DeletedComment /> // 댓글 삭제되었을때
        ) : (
          <CommentCard parentComment {...comment} />
        )}
        {hasChildComments ? (
          <HasChildLayout {...comment} />
        ) : (
          selectedCommentId === commentId && (
            <SubCommentForm
              parentComment
              parentId={commentId}
              postId={postId}
            />
          )
        )}
      </div>
      <hr className={styles.line} />
    </div>
  );
};

export default CommentsList;
