import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import Button from "@/components/designSystem/Button";
import ProfileImage from "@/components/designSystem/ProfileImage";
import { openCommentEditorAtom } from "@/constants/global/atoms";
import { isLoggedInAtom, userAtom } from "@/hooks/useUserAuth";
import useUpdateComment from "@/hooks/commentAPI/useUpdateComment";
import useInput from "@/hooks/useInput";
import { BG_COLOR, BORDER_COLOR } from "@/constants/global/colors";
import DateConvertor from "@/utils/util-dateConvertor";

import BannedBtn from "../btn/BannedBtn";
import DeleteCommentBtn from "../btn/DeleteCommentBtn";

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
  const dateConvertor = new DateConvertor(createdAt);

  const [updateComment, setUpdateComment] = React.useState<boolean>(false);
  const { value, onChange } = useInput(content);

  const onAddCommentClick = () => {
    if (editingId === commentId) return seteditingId(null);
    return seteditingId(commentId);
  };
  const { mutate: updateHandler } = useUpdateComment({
    commentId,
    content: value as string,
    onSuccess: () => setUpdateComment(false),
  });

  return (
    <div className={isChildComment ? "mt-4" : ""}>
      <div className={styles.commentHeader}>
        <div className={styles.metaInfoWrapper}>
          <ProfileImage idForModal={commentId} profileImage={profileImg} />
          <span className={styles.nickname}>
            {nickname}
            {`${myNick}`}
          </span>
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
            {updateComment ? (
              <>
                <Button
                  className="border"
                  size="tab"
                  color="white"
                  onClick={() => updateHandler()}
                >
                  완료
                </Button>
                <Button
                  className="border"
                  size="tab"
                  color="white"
                  onClick={() => setUpdateComment(false)}
                >
                  취소
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="border hi"
                  size="tab"
                  color="white"
                  onClick={() => setUpdateComment(true)}
                >
                  수정
                </Button>
                <DeleteCommentBtn commentId={commentId} />
              </>
            )}
          </div>
        )}
      </div>
      <div>
        {updateComment ? (
          <textarea
            className={`w-full h-[130px] my-[20px] ${BG_COLOR.general01} ${BORDER_COLOR.container}`}
            value={value}
            onChange={onChange}
          />
        ) : (
          <>
            <span className={styles.date}>
              {dateConvertor.formatWithLongDate()}
            </span>
            <p className={styles.content}>{content}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
