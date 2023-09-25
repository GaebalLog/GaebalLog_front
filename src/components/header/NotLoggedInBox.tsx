import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import Button from "../designSystem/Button";

const NotLoggedInBox = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const decodedSearchParams = decodeURIComponent(searchParams.toString());

  const url = `${pathname}${
    searchParams.toString().length > 0 ? "?" : ""
  }${decodedSearchParams}`;

  const saveCurrentPath = () => {
    if (url.includes("auth")) return;
    sessionStorage.setItem("prePath", url);
  };

  return (
    <>
      <li data-testid="sign-in">
        <Link href={"/auth/login"} replace>
          <Button size="login" color="lightGrey" onClick={saveCurrentPath}>
            Sign in
          </Button>
        </Link>
      </li>
      <li>
        <Link href={"/auth/signup"} replace>
          <Button size="login" color="black" onClick={saveCurrentPath}>
            Sign up
          </Button>
        </Link>
      </li>
    </>
  );
};

export default NotLoggedInBox;
