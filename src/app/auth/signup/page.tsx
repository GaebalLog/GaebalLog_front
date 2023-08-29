"use client";

import React from "react";
import { useRouter } from "next/navigation";

import InputWithLabel from "@/components/designSystem/InputWithLabel";
import Button from "@/components/designSystem/Button";
import { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import { authAPI } from "@/api/authAPI";
import useInput from "@/hooks/useInput";
import useValidation from "@/hooks/useValidation";

const Signuppage = () => {
  const [isConfirm, setIsConfirm] = React.useState(false);
  const router = useRouter();

  const emailInput = useInput();
  const nicknameInput = useInput();
  const passwordInput = useInput();
  const passwordConfirmInput = useInput();
  const { isPassed: isEmailValid } = useValidation(
    emailInput.value + "",
    "email",
  );
  const { isPassed: isPasswordValid } = useValidation(
    passwordInput.value + "",
    "password",
  );

  const emailCheckHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await authAPI.emailConfirm(emailInput.value + "");
    console.log("emailCheck ::", data);
  };
  const nicknameCheckHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await authAPI.nicknameConfirm(nicknameInput.value + "");
    console.log("nicknameCheck ::", data);
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      isEmailValid &&
      isPasswordValid &&
      nicknameInput.value &&
      passwordInput.value === passwordConfirmInput.value &&
      isConfirm
    ) {
      const { data } = await authAPI.localSignup({
        email: emailInput.value + "",
        password: passwordInput.value + "",
        nickname: nicknameInput.value + "",
      });
      console.log(data);
      alert("회원가입 성공!");
      router.replace("/home");
    } else {
      alert("항목들을 전부 확인해주세요!");
    }
  };

  return (
    <div
      className={`flex justify-center items-center w-[800px] h-[800px] ${BG_COLOR.general02}`}
    >
      <form className="flex flex-col gap-5" onSubmit={onSubmitHandler}>
        <h1 className="text-[32px] text-center font-hack">Sign up</h1>
        <div className="flex">
          <div className="w-[574px]">
            <InputWithLabel
              label="E-mail"
              type="email"
              value={emailInput.value + ""}
              onChange={emailInput.onChange}
            />
          </div>
          <div className="mt-auto ml-6 mb-1">
            <Button size="tab" color="white" onClick={emailCheckHandler}>
              중복 확인
            </Button>
          </div>
        </div>
        <p
          className={`-mt-[10px] ${
            isEmailValid || emailInput.value === ""
              ? "text-transparent"
              : TEXT_COLOR.error
          }`}
        >
          입력한 이메일은 잘못 된 형식입니다.
        </p>
        <div className="flex">
          <div className="w-[574px]">
            <InputWithLabel
              label="Nickname"
              value={nicknameInput.value + ""}
              onChange={nicknameInput.onChange}
            />
          </div>
          <div className="mt-auto ml-6 mb-1">
            <Button size="tab" color="white" onClick={nicknameCheckHandler}>
              중복 확인
            </Button>
          </div>
        </div>
        <p className={`-mt-[10px] mb-2 ${"text-transparent"}`}>
          사용 가능한 닉네임입니다.
        </p>
        <InputWithLabel
          className="w-[574px]"
          label="Password"
          type="password"
          value={passwordInput.value + ""}
          onChange={passwordInput.onChange}
        />
        <p
          className={`-mt-[10px] mb-2 ${
            isPasswordValid || passwordInput.value === ""
              ? TEXT_COLOR.general07rev
              : TEXT_COLOR.error
          }`}
        >
          비밀번호는 8~20 자의 영문 소문자 , 숫자 , 특문 사용
        </p>
        <InputWithLabel
          className="w-[574px]"
          label="Confirm Password"
          type="password"
          value={passwordConfirmInput.value + ""}
          onChange={passwordConfirmInput.onChange}
        />
        <p
          className={`-mt-[10px] ${
            passwordInput.value === passwordConfirmInput.value
              ? "text-transparent"
              : TEXT_COLOR.error
          }`}
        >
          비밀번호와 일치시켜주세요.
        </p>
        <div className="flex items-center -mt-[5px]">
          <input type="checkbox" id="agree" className="hidden" />
          <label
            htmlFor="agree"
            data-testid="agree"
            className="flex items-center justify-center w-5 h-5 border-2 border-[#967AC3] bg-transparent text-[#967AC3] cursor-pointer"
            onClick={() => setIsConfirm((prev) => !prev)}
          >
            <svg
              className="w-[14px] h-4 fill-current hidden"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
          </label>
          <span className="ml-2">회원가입에 동의 하겠습니까?</span>
        </div>
        <div className="text-center mt-1">
          <Button
            className="w-[465px] mt-[0px]"
            size="bigLogin"
            color="white"
            type="submit"
          >
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signuppage;
