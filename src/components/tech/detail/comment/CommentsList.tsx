import React from "react";
import { useRecoilValue } from "recoil";

import { BG_COLOR } from "@/config/constants/colors";
import { openCommentEditorAtom } from "@/config/constants/atoms";

import CommentCard from "./element/card/CommentCard";
import SubCommentForm from "./element/textarea/SubCommentForm";
import DeletedComment from "./element/card/DeletedComment";
import HasChildLayout from "./element/HasChildLayout";

const styles = {
  commentAddButton: `flex justify-center items-center text-[#967AC3]`,
  plusIcon: `flex items-center pb-1 px-[3px] h-5 mr-5 border-2 border-[#967AC3] font-bold`,
  line: `w-full h-[3px] mt-[63px] mb-8 ${BG_COLOR.general01}`,
  childCommentVisibleButton: `flex items-center gap-2 mb-[35px] text-[#967AC3]`,
  childCommentList: `grid grid-cols-[auto,1fr] pt-4 px-[55px] ${BG_COLOR.general01}`,
};

const CommentsList: React.FC<grandParentsComment> = ({ ...comment }) => {
  const editingId = useRecoilValue(openCommentEditorAtom);
  const { commentId, isDeleted, child } = comment;
  const hasChildComments = child && child?.length > 0;

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div>
        {isDeleted ? (
          <DeletedComment />
        ) : (
          <CommentCard parentComment {...comment} />
        )}
        {hasChildComments ? (
          <HasChildLayout {...comment} />
        ) : (
          editingId === commentId && (
            <SubCommentForm parentComment parentId={commentId} />
          )
        )}
      </div>
      <hr className={styles.line} />
    </div>
  );
};

export default CommentsList;
