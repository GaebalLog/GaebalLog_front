import { atom } from "recoil";

export const modalAtom = atom({
  key: "isModal",
  default: false,
});

export const openCommentEditorAtom = atom<string | number | null>({
  key: "openCommentEditorId",
  default: null,
});

export const postAtom = atom<{ commentPage: number; postId: number }>({
  key: "post",
  default: {
    commentPage: 1,
    postId: 0,
  },
});
export const discussionAtom = atom<{ discussionId: number }>({
  key: "discussion",
  default: {
    discussionId: 0,
  },
});
