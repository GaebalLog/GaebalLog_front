import { rest } from "msw";

export const authHandler = [
  rest.post("/users", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post("/auth/login", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.patch("/users/name", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.patch("/users/image", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get("/users", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get("/users/email", (req, res, ctx) => {
    const emailValue = req.url.searchParams.get("value");
    if (emailValue === "dddd@gmail.com") {
      return res(ctx.status(200));
    }
    return res(ctx.status(400));
  }),
  rest.get("/users/nickname", (req, res, ctx) => {
    const nicknameValue = req.url.searchParams.get("value");
    if (nicknameValue === "dd") {
      return res(ctx.status(200));
    }
    return res(ctx.status(400));
  }),
];
