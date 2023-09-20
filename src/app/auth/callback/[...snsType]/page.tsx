"use client";

import React from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";

import { authAPI } from "@/api/authAPI";
import useUserAuth from "@/hooks/useUserAuth";

interface snsTypeProps {
  params: {
    snsType: string[];
  };
}

const SnsLoginpage = ({ params: { snsType } }: snsTypeProps) => {
  const { setUserInfo } = useUserAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const acceptedTypes = ["google", "github", "kakao", "local"];
  const isSocialParams = acceptedTypes.includes(snsType[0]);

  React.useEffect(() => {
    if (!isSocialParams) return notFound();
    const fetchSocialLogin = async () => {
      const code = searchParams.get("code");
      try {
        if (code) {
          if (snsType[0] === "google") {
            const { data } = await authAPI.googleLogin(code);
            setUserInfo(data);
          }
          if (snsType[0] === "github") {
            const { data } = await authAPI.githubLogin(code);
            setUserInfo(data);
          }
          if (snsType[0] === "kakao") {
            const { data } = await authAPI.kakaoLogin(code);
            setUserInfo(data);
          }
        }
      } catch (error) {
        console.log("소셜 로그인 실패 ::", error);
      }
    };
    fetchSocialLogin();
    router.back();
  }, []);

  return <></>;
};

export default SnsLoginpage;
