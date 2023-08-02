import { rest } from "msw";

export const handlers = [
  rest.get("/api/userCategories", (req, res, ctx) => {
    // const VALID_TOKEN = "your-valid-token";
    // const token = req.headers.get("Authorization");
    // if (!token || token !== `Bearer ${VALID_TOKEN}`) {
    //   return res(ctx.status(401), ctx.json({ error: "Unauthorized" }));
    // }
    return res(
      ctx.status(200),
      ctx.json([
        "개발자",
        "깃헙사용법정리",
        "깃허브",
        "코딩용어",
        "알고리즘",
        "Pascal",
        "Object",
        "IMP",
        "Javascript",
        "PEARL",
        "JASS",
        "PL/SQL",
        "Java",
        "Language",
      ]),
    );
  }),
  rest.get("/api/trendCategories", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
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
      ]),
    );
  }),
];
