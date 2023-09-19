import React from "react";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import axios from "axios";

import useIcon from "@/hooks/useIcon";
import { isLoggedInAtom } from "@/hooks/useUserAuth";

import Button from "../designSystem/Button";

const LoggedInBox = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);

  const { getIcon } = useIcon();
  const alarm = getIcon("alarm", 18, 22);
  const profile = getIcon("profile", 40, 40);

  const logoutHandler = async () => {
    try {
      await axios.post("/api/auth");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("logout error : ", error);
    }
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
