import React from "react";
import { useRecoilValue } from "recoil";

import { BG_COLOR } from "@/constants/global/colors";
import { openCommentEditorAtom } from "@/constants/global/atoms";

import Arrow from "../icons/Arrow";

import SubCommentForm from "./textarea/SubCommentForm";
import ChildComment from "./ChildComment";

const styles = {
  commentAddButton: `flex justify-center items-center text-[#967AC3]`,
  plusIcon: `flex items-center pb-1 px-[3px] h-5 mr-5 border-2 border-[#967AC3] font-bold`,
  line: `w-full h-[3px] mt-[63px] mb-8 ${BG_COLOR.general01}`,
  childCommentVisibleButton: `flex items-center gap-2 mb-[35px] text-[#967AC3]`,
  childCommentList: `grid grid-cols-[auto,1fr] pt-4 px-[55px] ${BG_COLOR.general01}`,
};

const HasChildLayout: React.FC<grandParentsComment> = ({ ...comment }) => {
  const [isChildCommentVisible, setIsChildCommentVisible] =
    React.useState(true);
  const editingId = useRecoilValue(openCommentEditorAtom);

  const { commentId, postId, isDeleted, child } = comment;

  return (
    <>
      <button
        className={`${styles.childCommentVisibleButton} ${
          isDeleted && `-mt-6`
        }`}
        onClick={() => setIsChildCommentVisible((prev) => !prev)}
      >
        <span>{`답글 ${child?.length}개 더보기 `}</span>
        <Arrow up={isChildCommentVisible} down={!isChildCommentVisible} />
      </button>
      {editingId === commentId && (
        <SubCommentForm parentComment parentId={commentId} postId={postId} />
      )}
      {isChildCommentVisible && (
        <ul>
          {child?.map((comment) => (
            <li key={comment.commentId}>
              <ChildComment {...comment} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default HasChildLayout;
