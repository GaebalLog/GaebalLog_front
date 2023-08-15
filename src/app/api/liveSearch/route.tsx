import { NextResponse } from "next/server";

export const GET = async () => {
  const liveSearch = [
    "리액트네이티브",
    "리액트네이티브 ios",
    "리액트네이티브 애니메이션",
    "리액트네이티브 플러터 차이",
    "리액트네이티브 튜토리얼",
  ];
  return NextResponse.json(liveSearch);
};
