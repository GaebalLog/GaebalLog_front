import { rest } from "msw";

import type { postDataType } from "@/api/postAPI";

export const postHandler = [
  rest.get("/post/detail/:id", (req, res, ctx) => {
    const postId = req.params.id;
    if (postId == "37") {
      return res(
        ctx.status(200),
        ctx.json({
          post_id: 29,
          nickname: "chxxyx@naver.com",
          title: "update4",
          content: "update45",
          view: null,
          like: null,
          img: "test img update4",
          categories: ["jwt", "aws", "mysql"],
          created_at: "2023-08-28 17:08:22",
        }),
      );
    } else {
      return res(ctx.status(404));
    }
  }),

  rest.get("post/all/:sort", (req, res, ctx) => {
    const sort = req.params.sort;
    const page = req.url.searchParams.get("page");
    if (sort === "views" && page && page < "2") {
      return res(
        ctx.status(200),
        ctx.json({
          hasMore: true,
          posts: [
            {
              post_id: 30,
              nickname: "nickname",
              title: "title",
              content: "더",
              view: null,
              like: null,
              img: "img",
              categories: ["jwt", "aws", "mysql"],
              createdDt: "2023-08-28 17:08:22",
            },
          ],
        }),
      );
    } else if (sort === "views" && page && page === "2") {
      return res(
        ctx.status(200),
        ctx.json({
          hasMore: false,
          posts: [
            {
              post_id: 29,
              nickname: "nickname",
              title: "title",
              content: "마지막",
              view: null,
              like: null,
              img: "img",
              categories: ["jwt", "aws", "mysql"],
              createdDt: "2023-08-28 17:08:22",
            },
          ],
        }),
      );
    } else {
      return res(ctx.status(404));
    }
  }),

  rest.delete("/post/:id", (req, res, ctx) => {
    const postId = req.params.id;
    if (postId == "37") return res(ctx.status(200), ctx.json({ result: true }));
  }),

  rest.post("/post", (req, res, ctx) => {
    const isCreatePost = (data: postDataType) => {
      return (
        typeof data.user_id === "number" &&
        typeof data.title === "string" &&
        typeof data.content === "string" &&
        Array.isArray(data.categories) &&
        data.categories.every((cat: string) => typeof cat === "string") &&
        typeof data.img === "string"
      );
    };
    const postData = req.body as postDataType;
    if (isCreatePost(postData)) {
      return res(ctx.status(201));
    }
  }),
];
