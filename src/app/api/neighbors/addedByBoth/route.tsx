import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  const neighbors = [
    {
      userId: 1,
      nickname: "서로 이웃1",
      profileImage: null,
    },
    {
      userId: 2,
      nickname: "서로 이웃2",
      profileImage: null,
    },
    {
      userId: 3,
      nickname: "서로 이웃3",
      profileImage: null,
    },
    {
      userId: 4,
      nickname: "서로 이웃4",
      profileImage: null,
    },
    {
      userId: 5,
      nickname: "서로 이웃5",
      profileImage: null,
    },
    {
      userId: 6,
      nickname: "서로 이웃6",
      profileImage: null,
    },
    {
      userId: 7,
      nickname: "서로 이웃7",
      profileImage: null,
    },
    {
      userId: 8,
      nickname: "서로 이웃8",
      profileImage: null,
    },
    {
      userId: 9,
      nickname: "서로 이웃9",
      profileImage: null,
    },
    {
      userId: 10,
      nickname: "서로 이웃10",
      profileImage: null,
    },
  ];
  return NextResponse.json(neighbors);
};

export const POST = async (request: NextRequest) => {
  const userId = await request.json();
  const registers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  if (registers.includes(userId)) return NextResponse.json({ status: 200 });
};
