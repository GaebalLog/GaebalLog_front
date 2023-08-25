"use client";
import React from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";

import { isLoggedInAtom } from "./SettingsProvider";

/** pivate route 기능 구현 */
const withAuth = (Component: React.FC) => {
  const Auth = () => {
    const isLoggedIn = useRecoilValue(isLoggedInAtom);
    const router = useRouter();

    React.useEffect(() => {
      if (!isLoggedIn) {
        router.push("/auth/login");
      }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) {
      return;
    }

    return <Component />;
  };
  return Auth;
};

export default withAuth;
