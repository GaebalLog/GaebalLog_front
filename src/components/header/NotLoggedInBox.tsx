import React from "react";

import useIcon from "@/hooks/useIcon";

import Button from "../designSystem/Button";

const NotLoggedInBox = () => {
  const { getIcon } = useIcon();
  const alarm = getIcon("alarm", 18, 22);
  const profile = getIcon("profile", 40, 40);
  return (
    <>
      <li>{alarm}</li>
      <li>{profile}</li>
      <li>
        <Button size="login" color="black">
          Log out
        </Button>
      </li>
    </>
  );
};

export default NotLoggedInBox;
