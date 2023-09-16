import type React from "react";
import { useRouter } from "next/navigation";

import { authAPI } from "@/api/authAPI";

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

  const handleSubmit = async (e: React.FormEvent) => {
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
          email: emailValue + "",
          password: passwordValue + "",
          nickname: nicknameValue + "",
        });
        setUserInfo(data);
        alert("회원가입 성공!");
        router.replace("/home");
      } catch (error) {
        console.log("회원가입 실패 ::", error);
      }
    } else {
      alert("항목들을 전부 확인해주세요!");
    }
  };

  return { handleSubmit };
};

export default useSignupSubmit;
