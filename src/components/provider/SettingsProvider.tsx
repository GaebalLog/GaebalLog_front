import React from "react";

import useModalController from "@/hooks/useModalController";
import useUserAuth from "@/hooks/useUserAuth";
import { authAPI } from "@/api/authAPI";

interface props {
  children: React.ReactNode;
}
const SettingsProvider: React.FC<props> = ({ children }) => {
  const { allCloseModal } = useModalController();
  const { setUserInfo, logout } = useUserAuth();

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
      {children}
    </div>
  );
};

export default SettingsProvider;
