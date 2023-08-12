"use client";

import React from "react";

import InputWithLabel from "@/components/designSystem/InputWithLabel";
import Button from "@/components/designSystem/Button";
import { BG_COLOR } from "@/constants/global/colors";
import { authAPI } from "@/api/api";
import useInput from "@/hooks/useInput";

const Signuppage = () => {
  const [file, setFile] = React.useState<File>();
  const emailInput = useInput();
  const nicknameInput = useInput();
  const passwordInput = useInput();
  const passwordConfirmInput = useInput();

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

    const formData = new FormData();

    if (!file) return;

    formData.append("file", file);
    formData.append("email", emailInput.value);
    formData.append("nickname", nicknameInput.value);
    formData.append("password", passwordInput.value);

    const { data } = await authAPI.localSignup(formData);
    console.log("회원가입::", data);
  };

  return (
    <div
      className={`flex justify-center items-center w-[800px] h-[800px] ${BG_COLOR.general02}`}
    >
      <form className="flex flex-col gap-5" onSubmit={onSubmitHandler}>
        <input
          name="input"
          id="input-upload"
          type="file"
          accept="image/*"
          className="mb-5"
          onChange={imageUpLoadHandler}
        />
        <div>
          <InputWithLabel label="이메일" type="email" {...emailInput} />
          <Button size="tab" color="black" onClick={emailCheckHandler}>
            중복확인
          </Button>
        </div>
        <div>
          <InputWithLabel label="닉네임" {...nicknameInput} />
          <Button size="tab" color="black" onClick={nicknameCheckHandler}>
            중복확인
          </Button>
        </div>
        <InputWithLabel label="비밀번호" type="password" {...passwordInput} />
        <InputWithLabel
          label="비밀번호 재확인"
          type="password"
          {...passwordConfirmInput}
        />
        <Button size="tab" color="black" type="submit">
          회원가입
        </Button>
      </form>
    </div>
  );
};

export default Signuppage;
