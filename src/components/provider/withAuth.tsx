"use client";
import React from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";

import { isLoggedInAtom } from "@/hooks/useUserAuth";

const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
): React.ComponentType<P> => {
  const Auth: React.FunctionComponent<P> = (props) => {
    const isLoggedIn = useRecoilValue(isLoggedInAtom);
    const router = useRouter();

    React.useEffect(() => {
      if (isLoggedIn === false) {
        router.push("/auth/login");
      }
    }, [isLoggedIn, router]);

    if (!isLoggedIn) {
      return null;
    }

    return <Component {...props} />;
  };

  return Auth;
};
export default withAuth;
