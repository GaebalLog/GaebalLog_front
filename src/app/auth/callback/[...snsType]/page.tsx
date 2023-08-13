"use client";

import { notFound, redirect, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

import { authAPI } from "@/api/api";

interface snsTypeProps {
  params: {
    snsType: string;
  };
}

const GoogleLogin = ({ params: { snsType } }: snsTypeProps) => {
  const searchParams = useSearchParams();

  const fetchData = useCallback(async () => {
    if (searchParams) {
      const code = searchParams.get("code");
      const { data } = await authAPI.googleLogin(code);
      console.log(data);
    }
  }, [searchParams]);

  useEffect(() => {
    const acceptedTypes = ["google", "github", "kakao"];
    if (!acceptedTypes.includes(snsType[0])) return notFound();
  }, [snsType]);

  useEffect(() => {
    fetchData();
    redirect("/home");
  }, [fetchData]);

  return;
};

export default GoogleLogin;
