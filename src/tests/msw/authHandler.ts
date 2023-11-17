import { rest } from "msw";

export const authHandler = [
  //인증
  rest.get("/users/me", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ nickname: "카카오", image_url: "" }),
    );
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
    return res(ctx.status(409));
  }),
  rest.get("/users/name", (req, res, ctx) => {
    const nicknameValue = req.url.searchParams.get("value");
    if (nicknameValue === "테스트") {
      return res(ctx.status(200));
    }
    return res(ctx.status(409));
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

  // 유저 상세 페이지
  rest.get("/post/previews/:id", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          postId: "1",
          userId: "1",
          title: "이웃이 쓴 글1",
          content: "content",
          nickname: "hi",
          categories: ["tags", "tåg2"],
          like: 1,
          view: 1,
          isBookmarked: false,
          createdAt: "2021-08-10T14:00:00.000Z",
        },
      ]),
    );
  }),
  rest.get("/discussions/previews/1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          discussionId: "1",
          nickname: "안녕",
          title: "이웃이 쓴 토의1",
          content: "내용",
          status: "end",
          createdAt: "2023-08-28 17:08:22",
          userId: "1",
          categories: ["카테고리1", "카테고리2"],
        },
      ]),
    );
  }),
];
