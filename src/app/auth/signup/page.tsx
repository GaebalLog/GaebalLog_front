"use client";

import React from "react";
import { useRouter } from "next/navigation";

import InputWithLabel from "@/components/designSystem/InputWithLabel";
import Button from "@/components/designSystem/Button";
import { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import { authAPI } from "@/api/api";
import useInput from "@/hooks/useInput";
import useValidation from "@/hooks/useValidation";

const Signuppage = () => {
  const [file, setFile] = React.useState<File>();
  const router = useRouter();

  const emailInput = useInput();
  const nicknameInput = useInput();
  const passwordInput = useInput();
  const passwordConfirmInput = useInput();
  const { isPassed: isEmailValid } = useValidation(emailInput.value, "email");
  const { isPassed: isPasswordValid } = useValidation(
    passwordInput.value,
    "password",
  );

  const imageUpLoadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const emailCheckHandler = async () => {
    const { data } = await authAPI.emailConfirm(emailInput.value);
    console.log("emailCheck ::", data);
  };
  const nicknameCheckHandler = async () => {
    const { data } = await authAPI.nicknameConfirm(nicknameInput.value);
    console.log("nicknameCheck ::", data);
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      isEmailValid &&
      isPasswordValid &&
      file &&
      nicknameInput.value &&
      passwordInput.value === passwordConfirmInput.value
    ) {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("email", emailInput.value);
      formData.append("nickname", nicknameInput.value);
      formData.append("password", passwordInput.value);

      const { data } = await authAPI.localSignup(formData);
      console.log(data);
      alert("회원가입 성공!");
      router.replace("/home");
    } else {
      alert("회원가입 실패!");
    }
  };

  return (
    <div
      className={`flex justify-center items-center w-[800px] h-[800px] ${BG_COLOR.general02}`}
    >
      <form className="flex flex-col gap-5" onSubmit={onSubmitHandler}>
        <h1 className="text-[32px] text-center font-hack">Sign up</h1>
        <div className="text-center">
          <input
            name="input"
            data-testid="input-upload"
            type="file"
            accept="image/*"
            className="mb-5"
            onChange={imageUpLoadHandler}
          />
        </div>
        <div className="flex">
          <div>
            <InputWithLabel
              className="w-[574px]"
              label="E-mail"
              type="email"
              {...emailInput}
            />
          </div>
          <div className="mt-auto ml-6 mb-1">
            <Button size="tab" color="white" onClick={emailCheckHandler}>
              중복 확인
            </Button>
          </div>
        </div>
        <div className="flex">
          <div>
            <InputWithLabel
              className="w-[574px]"
              label="Nickname"
              {...nicknameInput}
            />
          </div>
          <div className="mt-auto ml-6 mb-1">
            <Button size="tab" color="white" onClick={nicknameCheckHandler}>
              중복 확인
            </Button>
          </div>
        </div>
        <InputWithLabel
          className="w-[574px]"
          label="Password"
          type="password"
          {...passwordInput}
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
          {...passwordConfirmInput}
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
        <div className="text-center">
          <Button
            className="w-[465px] mt-[75px]"
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
