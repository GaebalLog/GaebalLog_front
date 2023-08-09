import React from "react";

import useIcon from "@/hooks/useIcon";

import Button from "../designSystem/Button";

const LoggedInBox = () => {
  const { getIcon } = useIcon();
  const alarm = getIcon("alarm", 18, 22);
  const profile = getIcon("profile", 40, 40);
  return (
    <>
      <li data-testid="logout">{alarm}</li>
      <li>{profile}</li>
      <li>
        <Button size="login" color="black">
          Log out
        </Button>
      </li>
    </>
  );
};

export default LoggedInBox;
