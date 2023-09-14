import React from "react";
import { useRecoilValue } from "recoil";

import { nicknameAtom } from "@/constants/global/atoms";
import useModalController from "@/hooks/useModalController";
import useGetComments from "@/hooks/commentAPI/useGetComments";

import ConfirmModal from "../modal/common/ConfirmModal";

import CommentForm from "./form/CommentForm";
import CommentsList from "./CommentsList";

const CommentContainer = ({ postId }: { postId: number }) => {
  const { modal } = useModalController();
  const nickname = useRecoilValue(nicknameAtom);

  const { data } = useGetComments({ postId });
  return (
    <aside className={`w-full`}>
      <CommentForm count={data?.totalResults} postId={postId} />
      <ul>
        {data?.comment.map((comment: grandParentsComment) => (
          <li key={`comment_${comment.commentId}`}>
            <CommentsList {...comment} />
          </li>
        ))}
      </ul>
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
    </aside>
  );
};

export default CommentContainer;
