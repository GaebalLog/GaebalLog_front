import { NextResponse } from "next/server";

export const GET = async () => {
  const result = {
    code: 200,
    message: "user logged in",
  };
  return NextResponse.json(result);
};

export const POST = async () => {
  const result = {
    code: 200,
    message: "user logged out",
  };
  return NextResponse.json(result);
};
