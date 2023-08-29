import { rest } from "msw";

import type { createPost } from "@/api/postAPI";

export const postHandler = [
  rest.get("/post", (req, res, ctx) => {
    const postId = req.url.searchParams.get("id");

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
          createdDt: "2023-08-28 17:08:22",
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
    const isCreatePost = (data: createPost) => {
      return (
        typeof data.user_id === "number" &&
        typeof data.title === "string" &&
        typeof data.content === "string" &&
        Array.isArray(data.categories) &&
        data.categories.every((cat: string) => typeof cat === "string") &&
        typeof data.img === "string"
      );
    };
    const postData = req.body as createPost;
    if (isCreatePost(postData)) {
      return res(ctx.status(201));
    }
  }),
];
