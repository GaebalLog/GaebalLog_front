"use client";

import React from "react";
import { useRouter } from "next/navigation";

import InputWithLabel from "@/components/designSystem/InputWithLabel";
import Button from "@/components/designSystem/Button";
import { BG_COLOR, TEXT_COLOR } from "@/constants/global/colors";
import { authAPI } from "@/api/authAPI";
import useInput from "@/hooks/useInput";
import useValidation from "@/hooks/useValidation";
import InputWithCheck from "@/components/signup/InputWitHCheck";
import useUserAuth from "@/hooks/useUserAuth";

const Signuppage = () => {
  const [isConfirm, setIsConfirm] = React.useState(false);
  const [isEmailDuplicated, setIsEmailDuplicated] = React.useState<
    boolean | null
  >(null);
  const [isNicknameDuplicated, setIsNicknameDuplicated] = React.useState<
    boolean | null
  >(null);
  const router = useRouter();

  const { setUserInfo } = useUserAuth();
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

  const styles = {
    wrapper: `flex justify-center items-center w-[800px] h-[800px] ${BG_COLOR.general02}`,
    form: `flex flex-col gap-5`,
    title: `text-[32px] text-center font-hack`,
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

  const emailCheckHandler = async () => {
    if (!isEmailValid) return;
    try {
      await authAPI.emailConfirm(emailInput.value + "");
      setIsEmailDuplicated(false);
    } catch (error) {
      setIsEmailDuplicated(true);
    }
  };
  const nicknameCheckHandler = async () => {
    if (nicknameInput.value === "") return;
    try {
      await authAPI.nicknameConfirm(nicknameInput.value + "");
      setIsNicknameDuplicated(false);
    } catch (error) {
      setIsNicknameDuplicated(true);
    }
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      isEmailValid &&
      isEmailDuplicated === false &&
      nicknameInput.value !== "" &&
      isNicknameDuplicated === false &&
      isPasswordValid &&
      passwordInput.value === passwordConfirmInput.value &&
      isConfirm
    ) {
      try {
        const { data } = await authAPI.localSignup({
          email: emailInput.value + "",
          password: passwordInput.value + "",
          nickname: nicknameInput.value + "",
        });
        setUserInfo(data);
        alert("회원가입 성공!");
        router.replace("/home");
      } catch (error) {
        throw new Error("회원가입 실패");
      }
    } else {
      alert("항목들을 전부 확인해주세요!");
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <h1 className={styles.title}>Sign up</h1>
        <InputWithCheck
          type="email"
          inputValue={emailInput}
          setDuplicated={setIsEmailDuplicated}
          onClick={emailCheckHandler}
          isDuplicated={isEmailDuplicated}
        />
        {isEmailDuplicated === null && (
          <p className={styles.emailValidationMsg}>
            입력한 이메일은 잘못 된 형식입니다.
          </p>
        )}
        <InputWithCheck
          type="nickname"
          inputValue={nicknameInput}
          setDuplicated={setIsNicknameDuplicated}
          onClick={nicknameCheckHandler}
          isDuplicated={isNicknameDuplicated}
        />
        <InputWithLabel
          className="w-[574px]"
          label="Password"
          type="password"
          value={passwordInput.value + ""}
          onChange={passwordInput.onChange}
        />
        <p className={styles.pwdValidationMsg}>
          비밀번호는 8~20 자의 영문 소문자 , 숫자 , 특문 사용
        </p>
        <InputWithLabel
          className="w-[574px]"
          label="Confirm Password"
          type="password"
          value={passwordConfirmInput.value + ""}
          onChange={passwordConfirmInput.onChange}
        />
        <p className={styles.pwdConfirmValidationMsg}>
          비밀번호와 일치시켜주세요.
        </p>
        <div className={styles.checkBoxDiv}>
          <input type="checkbox" id="agree" className="hidden" />
          <label
            htmlFor="agree"
            data-testid="agree"
            className={styles.checkBox}
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
        <div className={styles.createButton}>
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
