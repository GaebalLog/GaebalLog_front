import React from "react";

import useModalController from "@/hooks/useModalController";

interface props {
  children: React.ReactNode;
}
const SettingsProvider: React.FC<props> = ({ children }) => {
  const { allCloseModal } = useModalController();
  return <div onClick={allCloseModal}>{children}</div>;
};

export default SettingsProvider;
