import { NextResponse } from "next/server";

export const GET = async () => {
  const discussionprogress =
    "<div>스타일 컴포넌트 : 반영 가능하지만 무거워서 싫다는 의견이 다수라서 제외</div>";
  return NextResponse.json(discussionprogress);
};
