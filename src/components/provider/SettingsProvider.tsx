import React from "react";

import useModalController from "@/hooks/useModalController";
import useUserAuth from "@/hooks/useUserAuth";

interface props {
  children: React.ReactNode;
}
const SettingsProvider: React.FC<props> = ({ children }) => {
  const { allCloseModal } = useModalController();
  const { fetchUserAuth } = useUserAuth();

  React.useEffect(() => {
    fetchUserAuth();
  }, []);

  return (
    <div className="flex flex-col items-center" onClick={allCloseModal}>
      {children}
    </div>
  );
};

export default SettingsProvider;
