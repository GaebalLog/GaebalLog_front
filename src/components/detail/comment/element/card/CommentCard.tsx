import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import utilConvertTime from "@/utils/util-datetime";
import Button from "@/components/designSystem/Button";
import ProfileImage from "@/components/designSystem/ProfileImage";
import { openCommentEditorAtom } from "@/constants/global/atoms";
import { isLoggedInAtom, userAtom } from "@/hooks/useUserAuth";

import BannedBtn from "../btn/BannedBtn";

const styles = {
  commentHeader: `flex justify-between`,
  metaInfoWrapper: `flex items-center`,
  nickname: `ml-4 text-xl font-bold`,
  buttonBox: `flex gap-4 ml-auto`,
  date: `mt-2 ml-14`,
  content: `mt-[38px] mb-[67px]`,
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
  profileImg,
  createdAt,
  content,
  grandChildComment,
}) => {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const [editingId, seteditingId] = useRecoilState(openCommentEditorAtom);
  const myNick = useRecoilValue(userAtom)?.nickname;
  const time = utilConvertTime(createdAt);

  const onAddCommentClick = () => {
    if (editingId === commentId) return seteditingId(null);
    return seteditingId(commentId);
  };
  console.log("닉네임", nickname, "내", myNick, nickname === myNick);
  return (
    <div className={isChildComment ? "mt-4" : ""}>
      <div className={styles.commentHeader}>
        <div className={styles.metaInfoWrapper}>
          <ProfileImage idForModal={commentId} profileImage={profileImg} />
          <span className={styles.nickname}>{nickname}</span>
          {isLoggedIn && (
            <>
              <BannedBtn nickname={nickname} />
              {!grandChildComment && (
                <button
                  data-testid={`addCommentButton_${commentId}`}
                  className="ml-10"
                  onClick={onAddCommentClick}
                >
                  답글쓰기
                </button>
              )}
            </>
          )}
        </div>
        {myNick === nickname && (
          <div className={styles.buttonBox}>
            <Button className="border" size="tab" color="white">
              수정
            </Button>
            <Button className="border" size="tab" color="white">
              삭제
            </Button>
          </div>
        )}
      </div>
      <span className={styles.date}>{time}</span>
      <div className={styles.content}>{content}</div>
    </div>
  );
};

export default CommentCard;
