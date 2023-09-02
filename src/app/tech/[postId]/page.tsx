"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";

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

const styles = {
  contents: {
    wrapper: `flex flex-col items-center w-[1632px]`,
    inner: `w-[909px] mt-[60px]`,
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

const Detail = ({ params: { postId } }: detailParams) => {
  const nickname = useRecoilValue(nicknameAtom);
  const router = useRouter();
  const { modal, openModal } = useModalController();
  const { data: detailContents } = useQuery({
    queryKey: ["detailContents", postId],
    queryFn: () => postAPI.getDetail(postId),
  });
  const detailData = detailContents?.data as postDetail;
  const { data: comments } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => axios.get("/api/comments"),
  });

  return (
    <div className={styles.contents.wrapper}>
      <article className={styles.contents.inner}>
        <p className="text-[36px] text-center font-bold">{detailData?.title}</p>
        <div className="flex gap-[32px] justify-between items-center">
          <div className="flex gap-[16px]">
            <span className="text-[20px]">{detailData?.nickname}</span>
            {detailData?.created_at && (
              <span>{utilConvertTime(detailData?.created_at)}</span>
            )}
          </div>
          <div className="flex gap-[16px]">
            <Button
              size="tab"
              color="white"
              border
              onClick={() =>
                router.push(`/post/update/${detailContents?.data.post_id}`)
              }
            >
              글 수정
            </Button>
            <Button
              size="tab"
              color="white"
              onClick={(e) => {
                e.stopPropagation();
                openModal("deleteModal");
              }}
              border
            >
              글 삭제
            </Button>
          </div>
        </div>
        {modal.deleteModal && <DeleteConfirm mode="tech" postId={postId} />}
        <hr className={styles.line} />
        {detailData && (
          <Contents
            contents={utilDecodeImg(detailData?.content, detailData?.img)}
          />
        )}
      </article>
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
