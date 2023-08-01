import { atom } from "recoil";

export const modalAtom = atom({
  key: "isModal",
  default: false,
});

export const darkAtom = atom<0 | 1>({
  key: "dark",
  default: 0,
});
