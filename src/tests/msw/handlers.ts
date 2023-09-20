import { authHandler } from "./authHandler";
import { myPageHandler } from "./myPageHandler";
import { postHandler } from "./postHanlder";
import { restHandler } from "./restHandler";

export const handlers = [
  ...postHandler,
  ...authHandler,
  ...myPageHandler,
  ...restHandler,
];
