import React from "react";
import { useRouter } from "next/navigation";

import { postAPI } from "@/api/postAPI";

import ConfirmModal from "./ConfirmModal";

interface props {
  mode: "tech" | "discussion";
  postId: number;
}
const DeleteConfirm: React.FC<props> = ({ mode, postId }) => {
  const route = useRouter();
  const deleteHandler = async () => {
    if (mode === "tech") {
      const result = await postAPI.delete(postId);
      if (result?.status === 201) {
        route.push("/tech");
        alert("해당 글이 삭제되었습니다.");
      } else {
        alert("삭제에 실패하였습니다. 다시 시도해주세요.");
      }
    } else if (mode === "discussion") {
      alert("해당 토론글이 삭제되었습니다.");
    }
  };
  return (
    <div>
      <ConfirmModal
        title="정말로 삭제하시겠습니까?"
        content="삭제된 데이터는 복구할 수 없습니다."
        onPositiveClick={deleteHandler}
      />
    </div>
  );
};

export default DeleteConfirm;
