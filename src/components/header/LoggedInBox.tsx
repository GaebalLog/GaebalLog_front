import React from "react";
import Link from "next/link";
import { useRecoilValue, useSetRecoilState } from "recoil";

import useIcon from "@/hooks/useIcon";
import { isLoggedInAtom, userAtom } from "@/hooks/useUserAuth";
import { authAPI } from "@/config/api/authAPI";

import Button from "../UI/buttons/base/Button";
import ProfileImage from "../UI/common/ProfileImage";

const LoggedInBox = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const { profileImg } = useRecoilValue(userAtom);

  const { getIcon } = useIcon();
  const alarm = getIcon("alarm", 18, 22);

  const logoutHandler = async () => {
    try {
      await authAPI.logout();
      setIsLoggedIn(false);
    } catch (error) {
      console.log("logout error : ", error);
    }
  };

  return (
    <>
      <li data-testid="logout">{alarm}</li>
      <li>
        <Link href="/mypage">
          <ProfileImage idForModal="myProfile" profileImage={profileImg} />
        </Link>
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
