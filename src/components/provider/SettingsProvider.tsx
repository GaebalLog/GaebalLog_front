import React from "react";
import { atom } from "recoil";
// import axios from "axios";
// import { usePathname, useSearchParams } from "next/navigation";

import useModalController from "@/hooks/useModalController";
import { authAPI } from "@/api/authAPI";

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

  React.useEffect(() => {
    const authConfirm = async () => {
      try {
        const { data } = await authAPI.userAuth();
        console.log(data);
      } catch (error) {
        console.log("authConfirm :", error);
      }
    };

    authConfirm();
  }, []);

  return (
    <div className="flex flex-col items-center" onClick={allCloseModal}>
      {children}
    </div>
  );
};

export default SettingsProvider;
