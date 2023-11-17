import type React from "react";
import { useRouter } from "next/navigation";

import { authAPI } from "@/api/authAPI";
import { utilErrorCase } from "@/utils/util-errorCase";

import useUserAuth from "../useUserAuth";

const useSignupSubmit = (
  isEmailValid: boolean,
  isEmailDuplicated: boolean | null,
  isNicknameDuplicated: boolean | null,
  isPasswordValid: boolean,
  emailValue: string,
  nicknameValue: string,
  passwordValue: string,
  passwordConfirmValue: string,
  isConfirm: boolean,
) => {
  const router = useRouter();

  const { setUserInfo } = useUserAuth();

  const handleSignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      isEmailValid &&
      isEmailDuplicated === false &&
      nicknameValue !== "" &&
      isNicknameDuplicated === false &&
      isPasswordValid &&
      passwordValue === passwordConfirmValue &&
      isConfirm
    ) {
      try {
        const { data } = await authAPI.localSignup({
          email: emailValue,
          password: passwordValue,
          nickname: nicknameValue,
        });
        setUserInfo(data);
        alert("회원가입 성공!");
        router.replace("/auth/callback/local");
      } catch (error) {
        utilErrorCase((error as error).response.status);
      }
    } else {
      alert("항목들을 전부 확인해주세요!");
    }
  };

  return { handleSignSubmit };
};

export default useSignupSubmit;
