import { NextResponse } from "next/server";

export const GET = async () => {
  const myinfo = {
    nickname: "닉네임",
    profileImg:
      "https://plus.unsplash.com/premium_photo-1689750423556-b246f05cd301?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
    postsno: 1,
    chatlistno: 3,
    alarm_reply: true,
    alarm_neighbors: true,
    alarm_discussion: false,
  };
  return NextResponse.json(myinfo);
};
