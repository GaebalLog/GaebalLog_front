import { rest } from "msw";
const serverURL = process.env.NEXT_PUBLIC_MAIN_SERVER;

export const authHandler = [
  rest.post(`${serverURL}/users`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post(`${serverURL}/auth/login`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post(`${serverURL}/auth/googlelogin`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
