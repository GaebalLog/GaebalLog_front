import { NextResponse } from "next/server";

export const GET = async () => {
  const categories: timeOfLearning[] = [
    {
      category: "채팅방입니다1",
      timespent: 1,
    },
    {
      category: "채팅방2",
      timespent: 20000,
    },
    {
      category: "채팅방3",
      timespent: 3,
    },
    {
      category: "채팅방입니다1",
      timespent: 1,
    },
    {
      category: "채팅방2",
      timespent: 20000,
    },
    {
      category: "채팅방3",
      timespent: 3,
    },
    {
      category: "채팅방입니다1",
      timespent: 1,
    },
    {
      category: "채팅방2",
      timespent: 20000,
    },
    {
      category: "채팅방3",
      timespent: 3,
    },
    {
      category: "채팅방입니다1",
      timespent: 1,
    },
    {
      category: "채팅방2",
      timespent: 20000,
    },
    {
      category: "채팅방3",
      timespent: 3,
    },
    {
      category: "채팅방3",
      timespent: 3,
    },
    {
      category: "채팅방입니다1",
      timespent: 1,
    },
    {
      category: "채팅방2",
      timespent: 20000,
    },
    {
      category: "채팅방3",
      timespent: 3,
    },
    {
      category: "채팅방입니다1",
      timespent: 1,
    },
    {
      category: "채팅방2",
      timespent: 20000,
    },
    {
      category: "채팅방3",
      timespent: 3,
    },
  ];
  return NextResponse.json({ categories });
};
