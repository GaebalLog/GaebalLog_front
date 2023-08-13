import React from "react";
import Link from "next/link";

import Button from "../designSystem/Button";

const NotLoggedInBox = () => {
  return (
    <>
      <li data-testid="sign-in">
        <Link href={"/auth/login"}>
          <Button size="login" color="lightGrey">
            Sign in
          </Button>
        </Link>
      </li>
      <li>
        <Link href={"/auth/signup"}>
          <Button size="login" color="black">
            Sign up
          </Button>
        </Link>
      </li>
    </>
  );
};

export default NotLoggedInBox;
