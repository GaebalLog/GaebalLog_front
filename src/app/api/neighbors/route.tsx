import { NextResponse } from "next/server";

export const GET = async () => {
  const neighbors = [
    {
      userId: 1,
      nickname: "no.1",
    },
    {
      userId: 2,
      nickname: "no.2",
    },
  ];
  return NextResponse.json(neighbors);
};

export const POST = async (userId: number) => {
  const registers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  if (registers.includes(userId)) return NextResponse.json({ status: 200 });
};
