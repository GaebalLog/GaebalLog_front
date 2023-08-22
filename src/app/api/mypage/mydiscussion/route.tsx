import { NextResponse } from "next/server";

export const GET = async () => {
  const discussions: discussions = [
    {
      chatListId: 1,
      nickname: "나나",
      title: "제목1",
      categories: ["카테고리1", "카테고리2"],
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1689750423556-b246f05cd301?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
      remainingTime: 1,
      isparticipated: true,
    },
    {
      chatListId: 2,
      nickname: "나나",
      title: "제목1",
      categories: ["카테고리1", "카테고리2"],
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1689750423556-b246f05cd301?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
      remainingTime: 1,
      isparticipated: false,
    },
    {
      chatListId: 3,
      nickname: "나나",
      title: "제목1",
      categories: ["카테고리1", "카테고리2"],
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1689750423556-b246f05cd301?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
      remainingTime: 1,
      isparticipated: true,
    },
  ];
  return NextResponse.json({ discussions });
};
