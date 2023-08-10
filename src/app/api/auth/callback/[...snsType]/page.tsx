"use client";

import { notFound, redirect, useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { useCallback, useEffect } from "react";

import { authAPI } from "@/api/api";

interface Props {
  params: {
    snsType: string;
  };
}

const GoogleLogin = ({ params: { snsType } }: Props) => {
  const searchParams = useSearchParams();

  const fetchData = useCallback(async () => {
    if (searchParams) {
      const code = searchParams.get("code");
      const data = await authAPI.googleLogin(code);
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

  return <Link href="/home">메인 페이지로 다시 이동</Link>;
};

export default GoogleLogin;
