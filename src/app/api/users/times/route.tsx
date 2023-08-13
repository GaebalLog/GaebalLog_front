import { NextResponse } from "next/server";

export const GET = async () => {
  const categories: timeOfLearning[] = [
    {
      category: "채팅방1",
      timespent: 1,
    },
    {
      category: "채팅방2",
      timespent: 2,
    },
    {
      category: "채팅방3",
      timespent: 3,
    },
  ];
  return NextResponse.json({ categories });
};
