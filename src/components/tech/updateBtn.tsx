import React from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/UI/buttons/base/Button";
import { postAPI } from "@/config/api/postAPI";

interface props {
  postId: number | undefined;
}
const UpdateBtn: React.FC<props> = ({ postId }) => {
  const router = useRouter();
  const onVerifyHandler = async () => {
    if (!postId) return alert("권한이 없습니다.");
    const result = await postAPI.verify(postId);
    if (result.status === 200) {
      router.push(`/tech/update/${postId}`);
    }
  };
  return (
    <Button size="tab" color="white" border onClick={onVerifyHandler}>
      글 수정
    </Button>
  );
};

export default UpdateBtn;
