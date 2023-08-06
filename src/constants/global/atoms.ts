import { atom } from "recoil";

export const modalAtom = atom({
  key: "isModal",
  default: false,
});

export const darkAtom = atom({
  key: "dark",
  default: false,
});

export const activeCommentIdAtom = atom<string | null>({
  key: "activCommentId",
  default: null,
});
