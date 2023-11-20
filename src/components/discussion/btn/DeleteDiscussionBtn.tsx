import React from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";

import Button from "@/components/UI/buttons/base/Button";
import { discussionAPI } from "@/config/api/discussionAPI";
import { discussionAtom } from "@/config/constants/atoms";

const DeleteDiscussionBtn = () => {
  const { discussionId } = useRecoilValue(discussionAtom);
  const router = useRouter();

  const deleteDiscussionHandler = async () => {
    const result = await discussionAPI.delete(discussionId);
    if (result.status === 200) {
      alert("토의가 삭제되었습니다.");
      return router.push("/discussion");
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
