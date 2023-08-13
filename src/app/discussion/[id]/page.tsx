import React from "react";

import RoomContents from "@/components/discussionDetail/RoomContents";
import DiscussionProgress from "@/components/discussionDetail/DiscussionProgress";
import Chat from "@/components/discussionDetail/chat/Chat";

const ChatRoompage = () => {
  const chatRoomId = 1;

  return (
    <div className="flex h-[95%]">
      <div className="flex flex-col justify-between mr-10 h-full">
        <RoomContents chatRoomId={chatRoomId} />
        <DiscussionProgress chatRoomId={chatRoomId} />
      </div>
      <Chat chatRoomId={chatRoomId} />
    </div>
  );
};

export default ChatRoompage;
