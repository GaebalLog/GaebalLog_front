import { rest } from "msw";

export const authHandler = [
  //인증
  rest.get("/users/me", (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  //로컬
  rest.post("/users", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post("/auth/login", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get("/users/email", (req, res, ctx) => {
    const emailValue = req.url.searchParams.get("value");
    if (emailValue === "dddd@gmail.com") {
      return res(ctx.status(200));
    }
    return res(ctx.status(500));
  }),
  rest.get("/users/name", (req, res, ctx) => {
    const nicknameValue = req.url.searchParams.get("value");
    if (nicknameValue === "테스트") {
      return res(ctx.status(200));
    }
    return res(ctx.status(500));
  }),

  //마이페이지
  rest.patch("/users/name", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.patch("/users/image", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get("/api/users/times", (req, res, ctx) => {
    const categories: timeOfLearning[] = [
      {
        category: "리액트",
        timespent: 1,
      },
      {
        category: "Next",
        timespent: 20000,
      },
      {
        category: "Javascript",
        timespent: 3,
      },
    ];
    return res(ctx.status(200), ctx.json({ categories }));
  }),

  //소셜
  rest.post("/auth/google", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ nickname: "구글", image_url: "" }));
  }),
  rest.post("/auth/github", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ nickname: "깃허브", image_url: "" }),
    );
  }),
  rest.post("/auth/kakao", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ nickname: "카카오", image_url: "" }),
    );
  }),
];
