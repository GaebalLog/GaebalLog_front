import { authHandler } from "./authHandler";
import { postHandler } from "./postHanlder";
import { restHandler } from "./restHandler";

export const handlers = [...postHandler, ...authHandler, ...restHandler];
