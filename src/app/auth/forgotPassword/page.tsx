"use client";

import React from "react";

import useInput from "@/hooks/useInput";
import { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import Button from "@/components/designSystem/Button";
import useValidation from "@/hooks/useValidation";
import CountdownText from "@/components/auth/text/CountdownText";
import { authAPI } from "@/api/authAPI";
import InputWithLabel from "@/components/auth/input/InputWithLabel";

const ForgotPassword = () => {
  const [isEmailSent, setIsEmailSent] = React.useState(false);
  const [resendClick, setResendClick] = React.useState(0);

  const emailInput = useInput();
  const verificationCode = useInput();
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

  const styles = {
    wrapper: `flex justify-center items-center w-[800px] h-[800px] ${BG_COLOR.general02}`,
    form: `flex flex-col gap-5`,
    title: `text-[32px] text-center font-hack`,
    checkDuplicateButton: `mt-auto ml-6 mb-1`,
    emailValidationMsg: `-mt-[10px] select-none ${
      isEmailValid || emailInput.value === ""
        ? "text-transparent"
        : TEXT_COLOR.error
    }`,
    pwdValidationMsg: `-mt-[10px] mb-2 select-none ${
      isPasswordValid || passwordInput.value === ""
        ? TEXT_COLOR.general07rev
        : TEXT_COLOR.error
    }`,
    pwdConfirmValidationMsg: `-mt-[10px] select-none ${
      passwordInput.value === passwordConfirmInput.value
        ? "text-transparent"
        : TEXT_COLOR.error
    }`,
    checkBoxDiv: `flex items-center -mt-[5px]`,
    checkBox: `flex items-center justify-center w-5 h-5 border-2 border-[#967AC3] bg-transparent text-[#967AC3] cursor-pointer`,
    createButton: `text-center mt-1`,
  };
  const sendMail = () => {
    authAPI.sendEmail(emailInput.value + "");
    if (!isEmailSent) setIsEmailSent(true);
    if (isEmailSent) setResendClick((prev) => prev + 1);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <h1 className={styles.title}>Forgot your password?</h1>
        <div className="flex">
          <div className="w-[511px]">
            <InputWithLabel
              label="E-mail"
              type="email"
              value={emailInput.value + ""}
              onChange={emailInput.onChange}
            />
          </div>
          <div className={styles.checkDuplicateButton}>
            <Button
              data-testid="sendEmail"
              type="button"
              size="sendEmail"
              color="white"
              onClick={sendMail}
            >
              {isEmailSent ? "인증번호 재 발송" : "인증번호 발송"}
            </Button>
          </div>
        </div>
        <p className={styles.emailValidationMsg}>
          입력한 이메일은 잘못 된 형식입니다.
        </p>
        <div className="flex">
          <div className="w-[511px]">
            <InputWithLabel
              className="w-[511px]"
              label="인증번호"
              type="text"
              value={verificationCode.value + ""}
              onChange={verificationCode.onChange}
            />
          </div>
          <div className={styles.checkDuplicateButton}>
            <Button
              data-testid="sendEmail"
              type="button"
              size="sendEmail"
              color="white"
              onClick={sendMail}
            >
              확인
            </Button>
          </div>
        </div>
        <CountdownText isEmailSent={isEmailSent} resendClick={resendClick} />
        <InputWithLabel
          className="w-[511px]"
          label="비밀번호 재설정"
          type="password"
          value={passwordInput.value + ""}
          onChange={passwordInput.onChange}
        />
        <p className={styles.pwdValidationMsg}>
          비밀번호는 8~20 자의 영문 소문자, 숫자, 특문 사용
        </p>
        <InputWithLabel
          className="w-[511px]"
          label="비밀번호 재확인"
          type="password"
          value={passwordConfirmInput.value + ""}
          onChange={passwordConfirmInput.onChange}
        />
        <p className={styles.pwdConfirmValidationMsg}>
          비밀번호와 일치시켜주세요.
        </p>
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
