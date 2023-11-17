import type React from "react";
import { useRouter } from "next/navigation";

import { authAPI } from "@/api/authAPI";
import { utilErrorCase } from "@/utils/util-errorCase";

import useUserAuth from "../useUserAuth";

const useLoginSubmit = (
  email: string,
  password: string,
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const { setUserInfo } = useUserAuth();
  const router = useRouter();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await authAPI.localLogin({
        email: email,
        password: password,
      });
      setUserInfo(data);
      router.replace("/auth/callback/local");
    } catch (error) {
      setIsError(true);
      utilErrorCase((error as error).response.status);
    }
  };

  return { handleLoginSubmit };
};

export default useLoginSubmit;
