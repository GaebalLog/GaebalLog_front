import React from "react";
import { useRecoilState } from "recoil";

import utilConvertTime from "@/utils/util-datetime";
import { activeCommentIdAtom } from "@/constants/global/atoms";
import Button from "@/components/designSystem/Button";

const style = {
  commentHeader: `flex justify-between`,
  metaInfoWrapper: `flex items-center`,
  profileImage: `w-[40px] h-[40px] rounded-full bg-[#D3D3D3]`,
  nickname: `ml-4 text-xl font-bold`,
  buttonBox: `flex gap-4 ml-auto`,
  date: `mt-2 ml-14`,
  contents: `mt-[38px] mb-[67px]`,
};

interface commentCardProps extends comment {
  isChildComment?: boolean;
  parentComment?: boolean;
}

const CommentCard: React.FC<commentCardProps> = ({
  isChildComment,
  commentId,
  nickname,
  // profileImage,
  createdAt,
  contents,
  childComments,
  parentComment,
}) => {
  const [activeCommentId, setActiveCommentId] =
    useRecoilState(activeCommentIdAtom);
  const time = utilConvertTime(createdAt?.toLocaleString());
  const hasChild = childComments && childComments?.length > 0;

  const onAddCommentClick = () => {
    if (activeCommentId === commentId) {
      setActiveCommentId(null);
    } else {
      setActiveCommentId(commentId);
    }
  };

  return (
    <div className={isChildComment ? "mt-4" : ""}>
      <div className={style.commentHeader}>
        <div className={style.metaInfoWrapper}>
          <div className={style.profileImage} />
          {/* <Image
      src={profileImage ?? ""}
      width={40}
      height={40}
      alt="프사"
    /> */}
          <span className={style.nickname}>{nickname}</span>
          <button className="ml-10">차단하기</button>
          {parentComment ? (
            hasChild && (
              <button className="ml-10" onClick={onAddCommentClick}>
                답글쓰기
              </button>
            )
          ) : (
            <button className="ml-10" onClick={onAddCommentClick}>
              답글쓰기
            </button>
          )}
        </div>
        <div className={style.buttonBox}>
          <Button className="border" size="tab" color="white">
            수정
          </Button>
          <Button className="border" size="tab" color="white">
            삭제
          </Button>
        </div>
      </div>
      <span className={style.date}>{time}</span>
      <div className={style.contents}>{contents}</div>
    </div>
  );
};

export default CommentCard;
