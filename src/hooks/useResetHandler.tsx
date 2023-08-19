import { useResetRecoilState } from "recoil";

import { activeModalIdAtom, darkAtom } from "@/constants/global/atoms";
import { isLoggedInAtom } from "@/components/provider/SettingsProvider";

const useResetHandler = () => {
  const resetLoginedIn = useResetRecoilState(isLoggedInAtom);
  const resetDarkMode = useResetRecoilState(darkAtom);

  const resetModalId = useResetRecoilState(activeModalIdAtom);

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
