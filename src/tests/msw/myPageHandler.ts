import { rest } from "msw";

export const myPageHandler = [
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
  rest.get("/api/mypage/mywritten", (req, res, ctx) => {
    const posts: posts = [
      {
        postId: 1,
        title: "title",
        content: "content",
        categories: ["tags", "tåg2"],
        like: 1,
        count: 1,
        nickname: "hi",
        thumbnail:
          "https://plus.unsplash.com/premium_photo-1689750423556-b246f05cd301?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
        isBookmarked: true,
        createdAt: new Date(),
      },
      {
        postId: 2,
        title: "title",
        content: "content",
        categories: ["tags"],
        like: 1,
        count: 1,
        nickname: "hi",
        thumbnail:
          "https://plus.unsplash.com/premium_photo-1689750423556-b246f05cd301?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
        isBookmarked: false,
        createdAt: new Date(),
      },
      {
        postId: 3,
        title: "title",
        content: "content",
        categories: ["tags"],
        like: 1,
        count: 1,
        nickname: "hi",
        thumbnail:
          "https://plus.unsplash.com/premium_photo-1689750423556-b246f05cd301?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
        isBookmarked: true,
        createdAt: new Date(),
      },
    ];
    return res(ctx.status(200), ctx.json({ posts }));
  }),
];
