import React from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";

import Button from "@/components/designSystem/Button";
import { discussionAPI } from "@/api/discussionAPI";
import { discussionAtom } from "@/constants/global/atoms";
import useModalController from "@/hooks/useModalController";

const VerifyDiscussionBtn = () => {
  const { allCloseModal } = useModalController();
  const router = useRouter();
  const { discussionId } = useRecoilValue(discussionAtom);
  const verifyDiscussionHandler = async () => {
    const result = await discussionAPI.verify(discussionId);
    if (result.status === 200) {
      allCloseModal();
      return router.push(`/discussion/update/${discussionId}`);
    }
  };

  return (
    <Button
      className={`w-full py-4 px-[30px]`}
      size="tab"
      color="white"
      onClick={verifyDiscussionHandler}
    >
      수정하기
    </Button>
  );
};

export default VerifyDiscussionBtn;
