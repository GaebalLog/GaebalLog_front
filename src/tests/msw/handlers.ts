import { authHandler } from "./authHandler";
import { postHandler } from "./postHanlder";
import { restHandler } from "./restHandler";
export const serverURL = process.env.NEXT_PUBLIC_MAIN_SERVER;

export const handlers = [...postHandler, ...authHandler, ...restHandler];
