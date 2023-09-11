import { useResetRecoilState } from "recoil";

import { darkAtom } from "@/constants/global/atoms";

import { activatedModalIdAtom } from "./useModalController";
import { isLoggedInAtom } from "./useUserAuth";

const useResetHandler = () => {
  const resetLoginedIn = useResetRecoilState(isLoggedInAtom);
  const resetDarkMode = useResetRecoilState(darkAtom);

  const resetModalId = useResetRecoilState(activatedModalIdAtom);

  const logoutHandler = () => {
    resetLoginedIn();
    resetDarkMode();
  };
  const resetAll = () => {
    logoutHandler();
    resetModalId();
  };
  return { logoutHandler, resetModalId, resetAll };
};

export default useResetHandler;
