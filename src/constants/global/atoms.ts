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

export const commentAtom = atom<{ commentPage: number; postId: number }>({
  key: "comment",
  default: {
    commentPage: 1,
    postId: 1,
  },
});
