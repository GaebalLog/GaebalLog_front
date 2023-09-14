import { atom } from "recoil";

export const modalAtom = atom({
  key: "isModal",
  default: false,
});

export const darkAtom = atom({
  key: "dark",
  default: 0,
});

export const openCommentEditorAtom = atom<string | number | null>({
  key: "openCommentEditorId",
  default: null,
});

export const commentPageAtom = atom<number>({
  key: "commentPage",
  default: 1,
});
export const nicknameAtom = atom({
  key: "nickname",
  default: "",
});
