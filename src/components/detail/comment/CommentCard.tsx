import React from "react";
import { useRecoilState } from "recoil";

import utilConvertTime from "@/utils/util-datetime";
import Button from "@/components/designSystem/Button";
import { activatedModalIdAtom } from "@/hooks/useModalController";
import ProfileImage from "@/components/designSystem/ProfileImage";

const styles = {
  commentHeader: `flex justify-between`,
  metaInfoWrapper: `flex items-center`,
  nickname: `ml-4 text-xl font-bold`,
  buttonBox: `flex gap-4 ml-auto`,
  date: `mt-2 ml-14`,
  contents: `mt-[38px] mb-[67px]`,
};

interface commentCardProps extends comment {
  isChildComment?: boolean;
  parentComment?: boolean;
  grandChildComment?: boolean;
}

const CommentCard: React.FC<commentCardProps> = ({
  isChildComment,
  commentId,
  nickname,
  profileImage,
  createdAt,
  contents,
  grandChildComment,
}) => {
  const [activeCommentId, setActiveCommentId] =
    useRecoilState(activatedModalIdAtom);
  const time = utilConvertTime(createdAt);

  const onAddCommentClick = () => {
    if (activeCommentId === commentId) {
      setActiveCommentId(null);
    } else {
      setActiveCommentId(commentId);
    }
  };

  return (
    <div className={isChildComment ? "mt-4" : ""}>
      <div className={styles.commentHeader}>
        <div className={styles.metaInfoWrapper}>
          <ProfileImage idForModal={commentId} profileImage={profileImage} />
          <span className={styles.nickname}>{nickname}</span>
          <button className="ml-10">차단하기</button>
          {!grandChildComment && (
            <button
              data-testid={`smallAddComment_${commentId}`}
              className="ml-10"
              onClick={onAddCommentClick}
            >
              답글쓰기
            </button>
          )}
        </div>
        <div className={styles.buttonBox}>
          <Button className="border" size="tab" color="white">
            수정
          </Button>
          <Button className="border" size="tab" color="white">
            삭제
          </Button>
        </div>
      </div>
      <span className={styles.date}>{time}</span>
      <div className={styles.contents}>{contents}</div>
    </div>
  );
};

export default CommentCard;
