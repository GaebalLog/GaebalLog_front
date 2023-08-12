import { NextResponse } from "next/server";

import type { chatItemAtSide } from "@/@types";

export const GET = async () => {
  const chatList: chatItemAtSide[] = [
    {
      chatListId: 1,
      title: "채팅방1",
    },
    {
      chatListId: 2,
      title: "채팅방2",
    },
    {
      chatListId: 3,
      title: "채팅방3",
    },
  ];
  return NextResponse.json({ chatList });
};
