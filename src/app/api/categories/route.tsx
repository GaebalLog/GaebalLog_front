import { NextResponse } from "next/server";

export const GET = async () => {
  const categories = ["비로그인", "로그인 싫어", "혼술"];
  return NextResponse.json(categories);
};
