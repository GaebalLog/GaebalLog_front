import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  const neighbors = [
    {
      userId: 1,
      nickname: "no.4",
      profileImg: null,
    },
    {
      userId: 2,
      nickname: "no.7",
      profileImg: null,
    },
  ];
  return NextResponse.json(neighbors);
};

export const POST = async (request: NextRequest) => {
  const userId = await request.json();
  const registers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  if (registers.includes(userId)) return NextResponse.json({ status: 200 });
};