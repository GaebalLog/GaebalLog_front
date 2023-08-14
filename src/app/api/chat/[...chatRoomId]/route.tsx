import { NextResponse } from "next/server";

export const GET = async () => {
  const chat = [
    {
      chatId: 1,
      userId: 2,
      nickname: "쿠쿠다스",
      profileImage:
        "https://images.unsplash.com/photo-1691349168679-9eed7373321a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8dG93SlpGc2twR2d8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      content: "안녕하세요",
    },
    {
      chatId: 2,
      userId: 1,
      nickname: "최지현",
      profileImage:
        "https://images.unsplash.com/photo-1690552820653-fab322051836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=675&q=80",
      content: "where are you form?",
    },
    {
      chatId: 3,
      userId: 1,
      nickname: "최지현",
      profileImage:
        "https://images.unsplash.com/photo-1690552820653-fab322051836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=675&q=80",
      content: "from",
    },
    {
      chatId: 4,
      userId: 2,
      nickname: "쿠쿠다스",
      profileImage:
        "https://images.unsplash.com/photo-1691349168679-9eed7373321a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8dG93SlpGc2twR2d8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      content: "저 한국사람인데요",
    },
    {
      chatId: 5,
      userId: 1,
      nickname: "최지현",
      profileImage:
        "https://images.unsplash.com/photo-1690552820653-fab322051836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=675&q=80",
      content: "아하",
    },
  ];
  return NextResponse.json(chat);
};
