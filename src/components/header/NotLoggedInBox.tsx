import React from "react";

import useIcon from "@/hooks/useIcon";
import Button from "../designSystem/Button";

const NotLoggedInBox = () => {
  const { getIcon } = useIcon();
  const Alarm = getIcon("alarm", 18, 22);
  const Profile = getIcon("profile", 40, 40);
  return (
    <>
      <li>{Alarm}</li>
      <li>{Profile}</li>
      <li>
        <Button size="login" color="black">
          Log out
        </Button>
      </li>
    </>
  );
};

export default NotLoggedInBox;
