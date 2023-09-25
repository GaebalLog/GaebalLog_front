import React from "react";

import Button from "@/components/designSystem/Button";
import useModalController from "@/hooks/useModalController";

import DeleteDiscussionBtn from "../btn/DeleteDiscussionBtn";
import VerifyDiscussionBtn from "../btn/verifyDiscussionBtn";

interface props {
  isAuthor: boolean;
}
const AuthorContentBtn: React.FC<props> = ({ isAuthor }) => {
  const { openModal } = useModalController();
  const discussionExitHandler = () => {
    openModal("discussionExit");
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
    </>
  );
};
export default AuthorContentBtn;
