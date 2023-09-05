"use client";

import React from "react";
import { notFound, redirect, useSearchParams } from "next/navigation";
import { useSetRecoilState } from "recoil";

import { authAPI } from "@/api/authAPI";
import { isLoggedInAtom } from "@/hooks/useUserAuth";

interface snsTypeProps {
  params: {
    snsType: string;
  };
}

const SnsLogin = ({ params: { snsType } }: snsTypeProps) => {
  const searchParams = useSearchParams();
  const acceptedTypes = ["google", "github", "kakao"];
  const isSocialParams = acceptedTypes.includes(snsType[0]);
  const setisLoggedIn = useSetRecoilState(isLoggedInAtom);

  React.useEffect(() => {
    if (!isSocialParams) return notFound();

    const fetchData = async () => {
      const code = searchParams.get("code");
      try {
        if (code) {
          if (snsType[0] === "google") {
            await authAPI.googleLogin(code);
          }
          if (snsType[0] === "github") {
            await authAPI.githubLogin(code);
          }
          if (snsType[0] === "kakao") {
            await authAPI.kakaoLogin(code);
          }
        }
        setisLoggedIn(true);
      } catch (error) {
        alert("로그인 실패");
      }
    };

    fetchData();
    redirect("/home");
  }, [snsType]);

  return <></>;
};

export default SnsLogin;
