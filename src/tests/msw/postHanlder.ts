import { rest } from "msw";

import type { postDataType } from "@/api/postAPI";

const posts = [
  {
    postId: 30,
    nickname: "nickname",
    title: "title",
    content: "더",
    view: null,
    like: null,
    img: ["img"],
    categories: ["jwt", "aws", "mysql"],
    createdDt: "2023-08-28 17:08:22",
  },
];
const postList = [
  {
    postId: 37,
    nickname: "카카오",
    title: "디테일 페이지 제목",
    content: "디테일 페이지 내용",
    view: null,
    like: null,
    img: "test img update4",
    categories: ["jwt", "aws", "mysql"],
    isAuthor: true,
    createdAt: "2023-08-28 17:08:22",
  },
  {
    postId: 29,
    nickname: "카카오1",
    title: "디테일 페이지 제목",
    content: "디테일 페이지 내용",
    view: null,
    like: null,
    img: "test img update4",
    categories: ["jwt", "aws", "mysql"],
    isAuthor: false,
    createdAt: "2023-08-28 17:08:22",
  },
];
export const postHandler = [
  rest.get("/post/detail/:id", (req, res, ctx) => {
    const postId = req.params.id;
    const post = postList.find((post) => post.postId == +postId);
    return res(ctx.status(200), ctx.json(post));
  }),

  rest.get("post/all/:sort", (req, res, ctx) => {
    const sort = req.params.sort;
    const page = req.url.searchParams.get("page");
    if (sort === "views" && page && page < "2") {
      return res(
        ctx.status(200),
        ctx.json({
          hasMore: true,
          posts: posts,
        }),
      );
    } else if (sort === "views" && page && page === "2") {
      return res(
        ctx.status(200),
        ctx.json({
          hasMore: false,
          posts: {
            postId: 37,
            nickname: "nickname",
            title: "title",
            content: "마지막",
            view: null,
            like: null,
            img: ["img"],
            categories: ["jwt", "aws", "mysql"],
            createdDt: "2023-08-28 17:08:22",
          },
        }),
      );
    } else {
      return res(ctx.status(500));
    }
  }),

  rest.delete("/post/:id", (req, res, ctx) => {
    const postId = req.params.id;
    if (postId == "37") return res(ctx.status(201), ctx.json({ result: true }));
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
      posts.push({
        postId: 38,
        nickname: "글 작성",
        title: postData.title,
        content: postData.content,
        view: null,
        like: null,
        img: postData.img,
        categories: postData.categories,
        createdDt: "2023-08-28 17:08:22",
      });
      return res(ctx.status(201));
    }
  }),

  rest.get("/post/:id/verification", (req, res, ctx) => {
    const postId = req.params.id;
    if (postId == "37") {
      return res(ctx.status(200), ctx.json({ result: true }));
    } else {
      return res(ctx.status(200), ctx.json({ result: false }));
    }
  }),
];
