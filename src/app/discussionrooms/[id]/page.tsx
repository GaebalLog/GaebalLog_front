import React from "react";

import RoomContents from "@/components/discussionDetail/RoomContents";

const ChatRoompage = () => {
  return (
    <div className="flex h-[95%]">
      <div className="flex flex-col justify-between mr-10 h-full">
        <RoomContents chatRoomId={1} />
        <section className="w-[1100px] h-[33%] bg-slate-600">
          토의 진행 현황
        </section>
      </div>
      <section className="w-[493px] h-full bg-slate-600">채팅</section>
    </div>
  );
};

export default ChatRoompage;
