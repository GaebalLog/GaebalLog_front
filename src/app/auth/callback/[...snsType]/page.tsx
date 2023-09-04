"use client";

import React from "react";
import { notFound, redirect, useSearchParams } from "next/navigation";

import { authAPI } from "@/api/authAPI";
import useUserAuth from "@/hooks/useUserAuth";

interface snsTypeProps {
  params: {
    snsType: string;
  };
}

const SnsLogin = ({ params: { snsType } }: snsTypeProps) => {
  const searchParams = useSearchParams();
  const { fetchUserAuth } = useUserAuth();
  const acceptedTypes = ["google", "github", "kakao"];
  const isSocialParams = acceptedTypes.includes(snsType[0]);

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
        fetchUserAuth();
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
