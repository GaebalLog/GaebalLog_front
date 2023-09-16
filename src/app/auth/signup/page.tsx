"use client";

import React from "react";

import Button from "@/components/designSystem/Button";
import { BG_COLOR } from "@/constants/global/colors";
import CheckBox from "@/components/auth/signup/CheckBox";
import InputWithCheck from "@/components/auth/input/InputWithCheck";
import InputWithLabel from "@/components/auth/input/InputWithLabel";
import ValidationText from "@/components/auth/text/ValidationText";
import Title from "@/components/auth/text/Title";
import useCheckDuplicacy from "@/hooks/authAPI/useCheckDuplicacy";
import useInput from "@/hooks/useInput";
import useSignupSubmit from "@/hooks/authAPI/useSignupSubmit";
import useValidation from "@/hooks/useValidation";

const styles = {
  wrapper: `flex justify-center items-center w-[800px] h-[800px] ${BG_COLOR.general02}`,
  form: `flex flex-col gap-5`,
  spaceDiv: `text-transparent mt-[10px] select-none`,
  createButton: `text-center mt-1`,
};

const Signuppage = () => {
  const [isConfirm, setIsConfirm] = React.useState(false);

  const emailInput = useInput();
  const nicknameInput = useInput();
  const passwordInput = useInput();
  const passwordConfirmInput = useInput();

  const { isEmailValid, isPasswordValid } = useValidation(
    emailInput.value + "",
    passwordInput.value + "",
  );

  const {
    isEmailDuplicated,
    isNicknameDuplicated,
    setIsEmailDuplicated,
    isNicknameEmpty,
    setIsNicknameDuplicated,
    emailCheckHandler,
    nicknameCheckHandler,
  } = useCheckDuplicacy(emailInput.value + "", nicknameInput.value + "");

  const { handleSubmit } = useSignupSubmit(
    isEmailValid,
    isEmailDuplicated,
    isNicknameDuplicated,
    isPasswordValid,
    emailInput.value + "",
    nicknameInput.value + "",
    passwordInput.value + "",
    passwordConfirmInput.value + "",
    isConfirm,
  );

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Title>Sign up</Title>
        <div>
          <InputWithCheck
            type="email"
            inputValue={emailInput}
            setDuplicated={setIsEmailDuplicated}
            onClick={emailCheckHandler}
            isDuplicated={isEmailDuplicated}
          />
          {isEmailDuplicated === null && (
            <ValidationText
              text="입력한 이메일은 잘못 된 형식입니다."
              type="default"
              isHighlightColor={!isEmailValid && emailInput.value !== ""}
            />
          )}
        </div>
        <div>
          <InputWithCheck
            type="nickname"
            inputValue={nicknameInput}
            setDuplicated={setIsNicknameDuplicated}
            onClick={nicknameCheckHandler}
            isDuplicated={isNicknameDuplicated}
          />
          {isNicknameDuplicated === null && (
            <ValidationText
              text="닉네임을 입력해주세요."
              type="default"
              isHighlightColor={isNicknameEmpty && nicknameInput.value === ""}
            />
          )}
        </div>
        <div>
          <InputWithLabel
            className="w-[574px]"
            label="Password"
            type="password"
            value={passwordInput.value + ""}
            onChange={passwordInput.onChange}
          />
          <ValidationText
            text="비밀번호는 8~20 자의 영문 소문자, 숫자, 특문 사용"
            type="password"
            isHighlightColor={!isPasswordValid && passwordInput.value !== ""}
          />
        </div>
        <div>
          <InputWithLabel
            className="w-[574px]"
            label="Confirm Password"
            type="password"
            value={passwordConfirmInput.value + ""}
            onChange={passwordConfirmInput.onChange}
          />
          <ValidationText
            text="비밀번호와 일치시켜주세요."
            type="default"
            isHighlightColor={
              passwordInput.value !== passwordConfirmInput.value
            }
          />
        </div>
        <CheckBox setIsConfirm={setIsConfirm} />
        <div className={styles.createButton}>
          <Button className="w-[465px] mt-[0px]" size="bigLogin" color="white">
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signuppage;
