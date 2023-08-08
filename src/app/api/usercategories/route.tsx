import { NextResponse } from "next/server";

export const GET = async () => {
  const categories = ["Gitbhu", "Java", "Physon", "IMP", "C++", "C#"];
  return NextResponse.json(categories);
};
