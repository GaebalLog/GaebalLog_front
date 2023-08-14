import { NextResponse } from "next/server";

export const GET = async () => {
  const trendCategories = [
    "Github",
    "Java",
    "Physon",
    "IMP",
    "Language",
    "ALGOL",
    "Javascript",
    "PEARL",
    "Object",
    "PL/SQL",
    "Pascal",
    "JASS",
  ];
  return NextResponse.json(trendCategories);
};
