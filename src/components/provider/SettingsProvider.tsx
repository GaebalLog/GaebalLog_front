import React from "react";
import { atom } from "recoil";
// import axios from "axios";
// import { usePathname, useSearchParams } from "next/navigation";

import useModalController from "@/hooks/useModalController";

export const isLoggedInAtom = atom({
  key: "isLoggedIn",
  default: true,
});

interface props {
  children: React.ReactNode;
}
const SettingsProvider: React.FC<props> = ({ children }) => {
  // const searchParams = useSearchParams();
  // const setisLoggedIn = useSetRecoilState(isLoggedInAtom);
  const { allCloseModal } = useModalController();

  // const authConfirm = React.useCallback(async () => {
  //   try {
  //     const { data } = await axios.get("/api/auth");
  //     const { code } = data;
  //     if (code === 200) return setisLoggedIn(true);
  //     if (code === 201) return setisLoggedIn(false);
  //   } catch (error) {
  //     console.log("authConfirm :", error);
  //   }
  // }, [setisLoggedIn]);

  // React.useEffect(() => {
  //   authConfirm();
  // }, [authConfirm, searchParams]);

  return (
    <div className="flex flex-col items-center" onClick={allCloseModal}>
      {children}
    </div>
  );
};

export default SettingsProvider;
