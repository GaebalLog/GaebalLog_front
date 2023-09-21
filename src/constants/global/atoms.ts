import { atom } from "recoil";

export const modalAtom = atom({
  key: "isModal",
  default: false,
});

export const openCommentEditorAtom = atom<string | number | null>({
  key: "openCommentEditorId",
  default: null,
});

export const commentAtom = atom<{ commentPage: number; postId: number }>({
  key: "comment",
  default: {
    commentPage: 1,
    postId: 0,
  },
});
