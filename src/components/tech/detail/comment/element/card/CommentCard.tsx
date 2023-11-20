import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import Button from "@/components/designSystem/Button";
import ProfileImage from "@/components/designSystem/ProfileImage";
import { openCommentEditorAtom } from "@/config/constants/atoms";
import { isLoggedInAtom, userAtom } from "@/hooks/useUserAuth";
import useUpdateComment from "@/hooks/commentAPI/useUpdateComment";
import useInput from "@/hooks/useInput";
import { BG_COLOR, BORDER_COLOR } from "@/config/constants/colors";
import DateConvertor from "@/utils/util-dateConvertor";
import { activatedModalIdAtom } from "@/hooks/useModalController";
import { mypageApi } from "@/config/api/mypageApi";

import BannedBtn from "../btn/BannedBtn";
import DeleteCommentBtn from "../btn/DeleteCommentBtn";
import NeighborBtn from "../btn/NeighborBtn";

const styles = {
  commentHeader: `flex justify-between`,
  metaInfoWrapper: `relative flex items-center`,
  profileBox: `flex items-center cursor-pointer`,
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
  userId,
}) => {
  const [isNeighbor, setIsNeighbor] = React.useState<boolean | null>(null);
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const [activatedId, setActivatedId] = useRecoilState(activatedModalIdAtom);
  const [editingId, seteditingId] = useRecoilState(openCommentEditorAtom);
  const { nickname: myNickname } = useRecoilValue(userAtom);
  const localISOString = new DateConvertor(createdAt).convertToLocalISOString();
  const dateConvertor = new DateConvertor(localISOString);

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

  const checkNeighbor = async () => {
    setActivatedId(commentId);
    try {
      const { data } = await mypageApi.checkNeighbor(userId);
      setIsNeighbor(data?.isNeighbor);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={isChildComment ? "mt-4" : ""}>
      <div className={styles.commentHeader}>
        <div className={styles.metaInfoWrapper}>
          <div className={styles.profileBox} onClick={checkNeighbor}>
            <ProfileImage idForModal={commentId} profileImage={profileImg} />
            <span className={styles.nickname}>
              {nickname}
              {`${myNickname}`}
            </span>
          </div>
          {activatedId === commentId && myNickname !== nickname && (
            <NeighborBtn userId={userId} isNeighbor={isNeighbor} />
          )}
          {isLoggedIn && (
            <>
              <BannedBtn nickname={nickname} userId={userId} />
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
        {myNickname === nickname && (
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
