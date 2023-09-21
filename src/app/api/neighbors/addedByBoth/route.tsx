import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  const neighbors = [
    {
      userId: 1,
      nickname: "서로 이웃1",
      profileImg: null,
    },
    {
      userId: 2,
      nickname: "서로 이웃2",
      profileImg: null,
    },
    {
      userId: 3,
      nickname: "서로 이웃3",
      profileImg: null,
    },
    {
      userId: 4,
      nickname: "서로 이웃4",
      profileImg: null,
    },
    {
      userId: 5,
      nickname: "서로 이웃5",
      profileImg: null,
    },
    {
      userId: 6,
      nickname: "서로 이웃6",
      profileImg: null,
    },
    {
      userId: 7,
      nickname: "서로 이웃7",
      profileImg: null,
    },
    {
      userId: 8,
      nickname: "서로 이웃8",
      profileImg: null,
    },
    {
      userId: 9,
      nickname: "서로 이웃9",
      profileImg: null,
    },
    {
      userId: 10,
      nickname: "서로 이웃10",
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
