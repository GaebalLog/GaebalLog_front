import React from "react";

import Button from "../designSystem/Button";

const LoggedInBox = () => {
  return (
    <>
      <li>
        <Button size="login" color="lightGrey">
          Sign in
        </Button>
      </li>
      <li>
        <Button size="login" color="black">
          Sign up
        </Button>
      </li>
    </>
  );
};

export default LoggedInBox;
