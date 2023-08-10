import { atom } from "recoil";

export const modalAtom = atom({
  key: "isModal",
  default: false,
});

export const darkAtom = atom({
  key: "dark",
  default: 0,
});

export const isLoggedInAtom = atom({
  key: "isLoggedIn",
  default: false,
});

export const activeModalIdAtom = atom<string | number | null>({
  key: "activeModalId",
  default: null,
});
