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
];
