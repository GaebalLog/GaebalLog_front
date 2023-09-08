import React from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/designSystem/Button";
import { postAPI } from "@/api/postAPI";

interface props {
  post_id: number | undefined;
}
const UpdateBtn: React.FC<props> = ({ post_id }) => {
  const router = useRouter();
  const onVerifyHandler = async () => {
    if (!post_id) return alert("권한이 없습니다.");
    const result = await postAPI.verify(post_id);
    if (result.status === 200) {
      router.push(`/post/update/${post_id}`);
    }
  };
  return (
    <Button size="tab" color="white" border onClick={onVerifyHandler}>
      글 수정
    </Button>
  );
};

export default UpdateBtn;
