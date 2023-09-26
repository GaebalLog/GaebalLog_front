import React from "react";

import Button from "@/components/designSystem/Button";
import useCreateComment from "@/hooks/commentAPI/useCreateComment";
interface props extends commentRequest {
  size: "lg" | "md";
  onSuccess?: () => void;
}

const CreateCommentBtn: React.ComponentType<props> = ({
  parentId,
  content,
  size,
  onSuccess,
}) => {
  const { mutate: onSubmitHandler } = useCreateComment({
    parentId: parentId ?? null,
    content,
    onSuccess,
  });
  return (
    <Button
      size={size === "lg" ? "commentCreate" : "tab"}
      color="black"
      className="mt-4 self-end"
      onClick={() => onSubmitHandler()}
    >
      작성완료
    </Button>
  );
};

export default CreateCommentBtn;
