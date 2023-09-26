import React from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";

import Button from "@/components/designSystem/Button";
import useModalController from "@/hooks/useModalController";
import ConfirmModal from "@/components/modal/common/ConfirmModal";
import { discussionAPI } from "@/api/discussionAPI";
import { discussionAtom } from "@/constants/global/atoms";
import { isLoggedInAtom } from "@/hooks/useUserAuth";

import DeleteDiscussionBtn from "../btn/DeleteDiscussionBtn";
import VerifyDiscussionBtn from "../btn/verifyDiscussionBtn";

interface props {
  isAuthor: boolean;
}
const AuthorContentBtn: React.FC<props> = ({ isAuthor }) => {
  const { discussionId } = useRecoilValue(discussionAtom);
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const { modal, openModal, closeModal } = useModalController();
  const router = useRouter();
  const discussionExitHandler = () => {
    if (!isLoggedIn) {
      return router.back();
    }
    openModal("discussionExit");
  };

  const okconfirmHanldler = async () => {
    const result = await discussionAPI.leftMyDiscussion(discussionId);
    if (result.status === 200) router.back();
    else {
      alert("토의 나가기에 실패했습니다.");
      closeModal("discussionExit");
    }
  };

  return (
    <>
      {isAuthor ? (
        <>
          <VerifyDiscussionBtn />
          <Button className={`w-full py-4 px-[30px]`} size="tab" color="white">
            토의진행종료
          </Button>
          <DeleteDiscussionBtn />
        </>
      ) : (
        <Button
          className={`py-4 px-[30px]`}
          size="tab"
          color="white"
          onClick={(e) => {
            e.stopPropagation();
            discussionExitHandler();
          }}
        >
          토의 나가기
        </Button>
      )}
      {modal.discussionExit && (
        <ConfirmModal
          title="이 토의에 대한 알림을 받으시겠습니까?"
          content="토의의 끝나는 내용을 공유 받으실 수 있습니다."
          onNegativeClick={() => router.back()}
          onPositiveClick={okconfirmHanldler}
        />
      )}
    </>
  );
};
export default AuthorContentBtn;
