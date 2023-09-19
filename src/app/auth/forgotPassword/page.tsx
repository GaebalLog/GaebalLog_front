"use client";

import React from "react";

import useInput from "@/hooks/useInput";
import { BG_COLOR } from "@/constants/global/colors";
import Button from "@/components/designSystem/Button";
import useValidation from "@/hooks/useValidation";
import CountdownText from "@/components/auth/text/CountdownText";
import { authAPI } from "@/api/authAPI";
import InputWithLabel from "@/components/auth/input/InputWithLabel";
import ValidationText from "@/components/auth/text/ValidationText";
import InputWithSendEmail from "@/components/auth/input/InputWithSendEmail";
import InputEmailCodeCheck from "@/components/auth/input/inputEmailCodeCheck";

const styles = {
  wrapper: `flex justify-center items-center w-[800px] h-[800px] ${BG_COLOR.general02}`,
  form: `flex flex-col gap-5`,
  title: `text-[32px] text-center font-hack`,
  checkDuplicateButton: `mt-auto ml-6 mb-1`,
  checkBoxDiv: `flex items-center -mt-[5px]`,
  checkBox: `flex items-center justify-center w-5 h-5 border-2 border-[#967AC3] bg-transparent text-[#967AC3] cursor-pointer`,
  createButton: `text-center mt-1`,
};

const ForgotPassword = () => {
  const [isEmailSent, setIsEmailSent] = React.useState(false);
  const [resendClick, setResendClick] = React.useState(0);

  const emailInput = useInput();
  const verificationCode = useInput();
  const passwordInput = useInput();
  const passwordConfirmInput = useInput();

  const { isEmailValid, isPasswordValid } = useValidation(
    emailInput.value + "",
    passwordInput.value + "",
  );

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    await authAPI.changePassword({
      email: emailInput.value + "",
      password: passwordInput.value + "",
    });
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={changePassword}>
        <h1 className={styles.title}>Forgot your password?</h1>
        <InputWithSendEmail
          isEmailSent={isEmailSent}
          isEmailValid={isEmailValid}
          setIsEmailSent={setIsEmailSent}
          setResendClick={setResendClick}
          {...emailInput}
        />
        <InputEmailCodeCheck
          isEmailSent={isEmailSent}
          resendClick={resendClick}
          setIsEmailSent={setIsEmailSent}
          {...verificationCode}
        />
        <div>
          <InputWithLabel
            className="w-[511px]"
            label="비밀번호 재설정"
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
            className="w-[511px]"
            label="비밀번호 재확인"
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
        <div className={styles.createButton}>
          <Button
            className="w-[465px] mt-[0px]"
            size="bigLogin"
            color="white"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
