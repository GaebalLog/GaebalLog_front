import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  const neighbors = [
    {
      userId: 1,
      nickname: "나를 추가한 이웃1",
      profileImg: null,
    },
    {
      userId: 2,
      nickname: "나를 추가한 이웃2",
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
