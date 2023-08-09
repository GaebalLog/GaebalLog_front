import React from "react";

import RoomContents from "@/components/discussionDetail/RoomContents";
import DiscussionProgress from "@/components/discussionDetail/DiscussionProgress";

const ChatRoompage = () => {
  const chatRoomId = 1;

  return (
    <div className="flex h-[95%]">
      <div className="flex flex-col justify-between mr-10 h-full">
        <RoomContents chatRoomId={chatRoomId} />
        <DiscussionProgress chatRoomId={chatRoomId} />
      </div>
      <section className="w-[493px] h-full bg-slate-600">채팅</section>
    </div>
  );
};

export default ChatRoompage;
