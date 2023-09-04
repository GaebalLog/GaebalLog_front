"use client";

import React from "react";
import { notFound, redirect, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

import { authAPI } from "@/api/authAPI";

interface snsTypeProps {
  params: {
    snsType: string;
  };
}

const SnsLogin = ({ params: { snsType } }: snsTypeProps) => {
  const searchParams = useSearchParams();

  const fetchData = useCallback(async () => {
    const code = searchParams.get("code");
    if (code) {
      if (snsType[0] === "google") {
        const { data } = await authAPI.googleLogin(code);
        console.log(data);
      }
      if (snsType[0] === "github") {
        const { data } = await authAPI.githubLogin(code);
        console.log(data);
      }
      if (snsType[0] === "kakao") {
        const { data } = await authAPI.kakaoLogin(code);
        console.log(data);
      }
    }
  }, [searchParams, snsType]);

  useEffect(() => {
    const acceptedTypes = ["google", "github", "kakao"];
    if (!acceptedTypes.includes(snsType[0])) return notFound();
  }, [snsType]);

  useEffect(() => {
    fetchData();
    redirect("/home");
  }, [fetchData]);

  return <></>;
};

export default SnsLogin;
