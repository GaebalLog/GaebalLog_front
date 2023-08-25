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

const styles = {
  contents: {
    wrapper: `flex flex-col items-center w-[1632px]`,
    inner: `w-[909px] mt-[60px]`,
  },
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

  const { data: detailContents } = useQuery({
    queryKey: ["detailContents", postId],
    queryFn: () => axios.get("/api/detailcontents"),
  });

  const { data: comments } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => axios.get("/api/comments"),
  });

  const { modal, allCloseModal } = useModalController();

  return (
    <div className={styles.contents.wrapper}>
      <article className={styles.contents.inner}>
        <Contents contents={detailContents?.data} />
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
          onNegativeClick={() => allCloseModal()}
          onPositiveClick={() => allCloseModal()}
        />
      )}
    </div>
  );
};

export default Detail;
