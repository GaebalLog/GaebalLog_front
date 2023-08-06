import React from "react";
import { useRecoilState } from "recoil";

import { BG_COLOR } from "@/constants/global/colors";
import { activeCommentIdAtom } from "@/constants/global/atoms";

import CommentCard from "./CommentCard";
import SubCommentForm from "./SubCommentForm";
import Arrow from "./icons/Arrow";
import ChildComment from "./ChildComment";

const styles = {
  commentAddButton: `flex justify-center items-center text-[#967AC3]`,
  plusIcon: `flex items-center px-[3px] h-5 mr-5 border-2 border-[#967AC3] font-bold`,
  line: `w-full h-[3px] mt-[63px] mb-8 ${BG_COLOR.general01}`,
  childCommentVisibleButton: `flex items-center gap-2 mb-[35px] text-[#967AC3]`,
  childCommentList: `grid grid-cols-[auto,1fr] pt-4 px-[55px] ${BG_COLOR.general01}`,
};

const CommentsList: React.FC<comment> = ({ ...comment }) => {
  const [isChildCommentVisible, setIsChildCommentVisible] =
    React.useState(true);
  const [activeCommentId, setActiveCommentId] =
    useRecoilState(activeCommentIdAtom);

  const { childComments } = comment;
  const hasChildComments = childComments && childComments?.length > 0;

  const onAddCommentClick = () => {
    if (activeCommentId === comment.commentId) {
      setActiveCommentId(null);
    } else {
      setActiveCommentId(comment.commentId);
    }
  };

  const HasChildLayout: React.FC = () => {
    return (
      <>
        <button
          className={styles.childCommentVisibleButton}
          onClick={() => setIsChildCommentVisible((prev) => !prev)}
        >
          <span>{`답글 ${childComments?.length}개 더보기 `}</span>
          <Arrow up={isChildCommentVisible} down={!isChildCommentVisible} />
        </button>
        {isChildCommentVisible && (
          <ul>
            {childComments?.map((comment) => (
              <li key={comment.commentId}>
                <ChildComment {...comment} />
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };
  const NonChildLayout: React.FC = () => {
    return (
      <>
        <button className={styles.commentAddButton} onClick={onAddCommentClick}>
          <span className={styles.plusIcon}>+</span>
          <span>답글 달기</span>
        </button>
      </>
    );
  };

  return (
    <div>
      <div>
        <CommentCard parentComment {...comment} />
        {hasChildComments ? <HasChildLayout /> : <NonChildLayout />}
      </div>
      {activeCommentId === comment.commentId && <SubCommentForm />}
      <hr className={styles.line} />
    </div>
  );
};

export default CommentsList;
