import React from "react";

import Button from "@/components/designSystem/Button";
import { discussionAPI } from "@/api/discussionAPI";
interface props {
  discussionId: number;
}
const DeleteDiscussionBtn: React.FC<props> = ({ discussionId }) => {
  const deleteDiscussionHandler = async () => {
    const result = await discussionAPI.delete(discussionId);
    if (result.status === 200) {
      return alert("토의가 삭제되었습니다.");
    }
  };
  return (
    <Button
      className={`w-full py-4 px-[30px]`}
      size="tab"
      color="white"
      onClick={deleteDiscussionHandler}
    >
      토의삭제하기
    </Button>
  );
};

export default DeleteDiscussionBtn;