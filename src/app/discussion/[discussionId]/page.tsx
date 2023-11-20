"use client";
import React from "react";
import { useSetRecoilState } from "recoil";

import RoomContents from "@/components/discussionDetail/RoomContents";
import DiscussionProgress from "@/components/discussionDetail/DiscussionProgress";
import Chat from "@/components/discussionDetail/chat/Chat";
import { discussionAtom } from "@/config/constants/atoms";
export interface params {
  params: {
    discussionId: string;
  };
}
const DiscussionDetailPage = ({ params: { discussionId } }: params) => {
  const setDisucssionId = useSetRecoilState(discussionAtom);
  React.useEffect(() => {
    setDisucssionId({ discussionId: +discussionId });
  }, [discussionId, setDisucssionId]);
  const chatRoomId = +discussionId;
  return (
    <div className="flex h-[95%]">
      <div className="flex flex-col justify-between mr-10 h-full">
        <RoomContents />
        <DiscussionProgress chatRoomId={chatRoomId} />
      </div>
      <Chat chatRoomId={chatRoomId} />
    </div>
  );
};

export default DiscussionDetailPage;
