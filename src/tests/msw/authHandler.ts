import { rest } from "msw";

export const authHandler = [
  rest.post("/users", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post("/auth/login", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post("/auth/googlelogin", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
