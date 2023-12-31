"use client";

import React from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";

import { authAPI } from "@/config/api/authAPI";
import useUserAuth from "@/hooks/useUserAuth";
import { utilErrorCase } from "@/utils/util-errorCase";

interface snsTypeProps {
  params: {
    snsType: string;
  };
}

const SnsLoginpage = ({ params: { snsType } }: snsTypeProps) => {
  const { setUserInfo } = useUserAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const acceptedTypes = ["google", "github", "kakao", "local"];
  const isSocialParams = acceptedTypes.includes(snsType);
  const prePath = sessionStorage.getItem("prePath");

  React.useEffect(() => {
    sessionStorage.removeItem("prePath");
    if (!isSocialParams) return notFound();
    const fetchSocialLogin = async () => {
      const code = searchParams.get("code");
      try {
        if (code) {
          if (snsType === "google") {
            const { data } = await authAPI.googleLogin(code);
            setUserInfo(data);
          }
          if (snsType === "github") {
            const { data } = await authAPI.githubLogin(code);
            setUserInfo(data);
          }
          if (snsType === "kakao") {
            const { data } = await authAPI.kakaoLogin(code);
            setUserInfo(data);
          }
        }
      } catch (error) {
        utilErrorCase((error as error).response.status);
      }
    };
    fetchSocialLogin();
    router.replace(prePath ?? "/home");
  }, []);

  return <></>;
};

export default SnsLoginpage;
