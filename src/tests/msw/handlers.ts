import { authHandler } from "./authHandler";
import { myPageHandler } from "./myPageHandler";
import { postHandler } from "./postHanlder";
import { restHandler } from "./restHandler";
import { commentsHandler } from "./commentHandler";
import { discussionHandler } from "./discussionHandler";
export const handlers = [
  ...postHandler,
  ...authHandler,
  ...myPageHandler,
  ...restHandler,
  ...commentsHandler,
  ...discussionHandler,
];
