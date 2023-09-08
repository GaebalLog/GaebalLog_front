"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

import CommentsList from "@/components/detail/CommentsList";
import CommentForm from "@/components/detail/form/CommentForm";
import Contents from "@/components/detail/Contents";
import ConfirmModal from "@/components/modal/common/ConfirmModal";
import useModalController from "@/hooks/useModalController";
import { nicknameAtom } from "@/constants/global/atoms";
import { BG_COLOR } from "@/constants/global/colors";
import { postAPI } from "@/api/postAPI";
import utilConvertTime from "@/utils/util-datetime";
import Button from "@/components/designSystem/Button";
import DeleteConfirm from "@/components/modal/common/DeleteConfirm";
import { utilDecodeImg } from "@/utils/util-decodeImg";
import LikeView from "@/components/commonUI/LikeView";
import useToggleLike from "@/hooks/postAPI/useToggleLike";
import UpdateBtn from "@/hooks/featureBtn/updateBtn";

const styles = {
  contents: {
    wrapper: `flex flex-col items-center w-[1632px]`,
    innerContainer: `flex gap-[109px] w-[1632px] min-h-[880px]`,
    inner: `w-[909px] mt-[60px]`,
    category: `mt-[210px] w-[252px] ${BG_COLOR.general02} px-[16px] py-[24px] max-h-[256px]`,
    categoryTitle: `text-[24px] font-hack`,
  },
  line: `w-full h-[3px] mt-[63px] mb-8 ${BG_COLOR.general01}`,
  comment: {
    wrapper: `w-full`,
  },
};

export interface detailParams {
  params: {
    postId: number;
  };
}
// 기능 분리 필요 :: 컨텐츠 부분이랑 코멘트 부분
const Detail = ({ params: { postId } }: detailParams) => {
  const [detailData, setDetailData] = React.useState<postListAuthor>();
  const nickname = useRecoilValue(nicknameAtom);
  const { modal, openModal } = useModalController();
  useQuery({
    queryKey: ["detailContents", postId],
    queryFn: () => postAPI.getDetail(postId),
    onSuccess: (data) => {
      setDetailData(data.data);
    },
  });
  const { data: comments } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => axios.get("/api/comments"),
  });
  const toggleLikeHandler = () => {
    setDetailData((prev) => {
      if (!prev) return prev;
      const likedStatus = !prev.liked;
      return {
        ...prev,
        liked: likedStatus,
        like: likedStatus ? prev.like + 1 : prev.like - 1,
      };
    });
  };
  const { mutate: likeHandler } = useToggleLike({
    onToggle: toggleLikeHandler,
  });
  return (
    <div className={styles.contents.wrapper}>
      <div className={styles.contents.innerContainer}>
        <aside className={styles.contents.category}>
          <span className={styles.contents.categoryTitle}>Main Keywords</span>
          <ul className="flex flex-col gap-[16px] mt-[24px]">
            {detailData?.categories.map((category, i) => (
              <li key={`${detailData?.post_id}${category}${i}`}>
                <Button color="grey" size="tag">
                  # {category}
                </Button>
              </li>
            ))}
          </ul>
        </aside>
        <article className={styles.contents.inner}>
          <p className="text-[36px] text-center font-bold h-[80px]">
            {detailData?.title}
          </p>
          <div className="flex gap-[32px] justify-between items-center">
            <div className="flex gap-[16px] items-center">
              <span className="text-[20px]">{detailData?.nickname}</span>
              {detailData?.created_at && (
                <span>{utilConvertTime(detailData?.created_at)}</span>
              )}
              <div>
                <LikeView
                  like={detailData?.like}
                  likeHandler={() =>
                    detailData?.post_id && likeHandler(detailData.post_id)
                  }
                  liked={detailData?.liked}
                  view={detailData?.view}
                />
              </div>
            </div>
            {detailData?.isAuthor && (
              <div className="flex gap-[16px]">
                <UpdateBtn post_id={detailData?.post_id} />
                <Button
                  size="tab"
                  color="white"
                  border
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal("deleteModal");
                  }}
                >
                  글 삭제
                </Button>
              </div>
            )}
          </div>
          {modal.deleteModal && <DeleteConfirm mode="tech" postId={postId} />}
          <hr className={styles.line} />
          {detailData && (
            <Contents
              contents={utilDecodeImg(detailData?.content, detailData?.img)}
            />
          )}
        </article>
      </div>
      <hr className={styles.line} />
      <aside className={styles.comment.wrapper}>
        <CommentForm count={comments?.data.length} />
        <ul>
          {comments?.data.map((comment: comment) => (
            <li key={`comment_${comment.commentId}`}>
              <CommentsList {...comment} />
            </li>
          ))}
        </ul>
      </aside>
      {modal.defaultModal && (
        <ConfirmModal
          title={`${nickname} 님을 정말 차단하겠습니까?`}
          content={
            <>
              <p>이 사람이 작성한 댓글은 모두 숨겨지고</p>
              <p>이후 내 글에 댓글을 쓰거나 나와의 토의를 할 수 없게 됩니다.</p>
            </>
          }
          onNegativeClick={() => {}}
          onPositiveClick={() => {}}
        />
      )}
    </div>
  );
};

export default Detail;
