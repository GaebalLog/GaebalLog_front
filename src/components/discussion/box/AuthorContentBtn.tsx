import React from "react";
import Link from "next/link";

import Button from "@/components/designSystem/Button";
import useModalController from "@/hooks/useModalController";

import DeleteDiscussionBtn from "../btn/DeleteDiscussionBtn";

interface props {
  isAuthor: boolean;
  discussionId: number;
}
const AuthorContentBtn: React.FC<props> = ({ isAuthor, discussionId }) => {
  const { openModal, allCloseModal } = useModalController();
  const discussionExitHandler = () => {
    openModal("discussionExit");
  };

  return (
    <>
      {isAuthor ? (
        <>
          <Link
            className="text-center"
            href={"/discussion/create"}
            onClick={(e) => {
              e.stopPropagation();
              allCloseModal();
            }}
          >
            <Button
              className={`w-full py-4 px-[30px]`}
              size="tab"
              color="white"
            >
              수정하기
            </Button>
          </Link>
          <Button className={`w-full py-4 px-[30px]`} size="tab" color="white">
            토의진행종료
          </Button>
          <DeleteDiscussionBtn discussionId={discussionId} />
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
