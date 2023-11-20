import React from "react";

import Button from "@/components/UI/buttons/base/Button";
import useDeleteComment from "@/hooks/commentAPI/useDeleteComment";
import ConfirmModal from "@/components/UI/modals/default/ConfirmModal";

const DeleteCommentBtn = ({ commentId }: { commentId: number }) => {
  const [modal, openModal] = React.useState(false);

  const { mutate: deleteHandler } = useDeleteComment({ commentId });
  const modalHandler = () => {
    modal ? openModal(false) : openModal(true);
  };
  return (
    <>
      <Button
        className="border"
        size="tab"
        color="white"
        onClick={modalHandler}
      >
        삭제
      </Button>
      {modal && (
        <ConfirmModal
          title="댓글을 정말 삭제하겠습니까?"
          content="한번 삭제한 댓글은 복구할 수 없습니다."
          onNegativeClick={() => {
            modalHandler();
          }}
          onPositiveClick={() => {
            deleteHandler();
            modalHandler();
          }}
        />
      )}
    </>
  );
};

export default DeleteCommentBtn;
