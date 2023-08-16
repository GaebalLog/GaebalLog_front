import React from "react";
import Link from "next/link";
import { useSetRecoilState } from "recoil";

import useIcon from "@/hooks/useIcon";
import { isLoggedInAtom } from "@/constants/global/atoms";

import Button from "../designSystem/Button";

const LoggedInBox = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);

  const { getIcon } = useIcon();
  const alarm = getIcon("alarm", 18, 22);
  const profile = getIcon("profile", 40, 40);

  const logoutHandler = () => {
    setIsLoggedIn((prev) => !prev);
  };

  return (
    <>
      <li data-testid="logout">{alarm}</li>
      <li>
        <Link href="/mypage">{profile}</Link>
      </li>
      <li>
        <Button size="login" color="black" onClick={logoutHandler}>
          Log out
        </Button>
      </li>
    </>
  );
};

export default LoggedInBox;
