import React from "react";

import { discussionAPI } from "@/config/api/discussionAPI";

export interface params {
  params: {
    discussionId: string;
  };
}

export const generateMetadata = async ({
  params: { discussionId },
}: params) => {
  const discussionData = await discussionAPI.getDetail(+discussionId);
  const { title, content } = discussionData.data;
  return {
    title,
    describe: content,
  };
};

const ChatRoomLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main className="w-full h-[calc(100vh-94px)] flex justify-center items-center">
      {children}
    </main>
  );
};

export default ChatRoomLayout;
