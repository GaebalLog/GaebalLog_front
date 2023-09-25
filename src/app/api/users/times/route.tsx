import { NextResponse } from "next/server";

export const GET = async () => {
  const categories: timeOfLearning[] = [
    {
      category: "리액트",
      timespent: 1,
    },
    {
      category: "Next",
      timespent: 20000,
    },
    {
      category: "Javascript",
      timespent: 3,
    },
  ];
  return NextResponse.json({ categories });
};
