import React from "react";
import { useRecoilValue } from "recoil";

import useModalController from "@/hooks/useModalController";
import useUserAuth, { isLoggedInAtom } from "@/hooks/useUserAuth";
import { authAPI } from "@/api/authAPI";

import LoadingSpinner, { loadingAtom } from "../LoadingSpinner";

interface props {
  children: React.ReactNode;
}
const SettingsProvider: React.FC<props> = ({ children }) => {
  const { allCloseModal } = useModalController();
  const { setUserInfo, logout } = useUserAuth();
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const isVisible = useRecoilValue(loadingAtom);

  React.useEffect(() => {
    const fetchAuth = async () => {
      try {
        const { data } = await authAPI.userAuth();
        setUserInfo(data);
      } catch (error) {
        logout();
      }
    };

    fetchAuth();
  }, []);

  return (
    <div className="flex flex-col items-center" onClick={allCloseModal}>
      {isLoggedIn === null || isVisible ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <LoadingSpinner isSetTime />
          <p className="mt-5 text-lg font-bold">Loading</p>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default SettingsProvider;
