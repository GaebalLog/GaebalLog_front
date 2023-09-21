import { authHandler } from "./authHandler";
import { postHandler } from "./postHanlder";
import { restHandler } from "./restHandler";
import { commentsHandler } from "./commentHandler";

export const handlers = [
  ...postHandler,
  ...authHandler,
  ...restHandler,
  ...commentsHandler,
];
