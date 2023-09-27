import React from "react";

import Button from "@/components/designSystem/Button";
import { authAPI } from "@/api/authAPI";

import CountdownText from "../text/CountdownText";

import InputWithLabel from "./InputWithLabel";

interface props {
  email: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  isEmailSent: boolean;
  resendClick: number;
  setIsEmailSent: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputEmailCodeCheck: React.FC<props> = ({
  email,
  value,
  onChange,
  isEmailSent,
  resendClick,
  setIsEmailSent,
}) => {
  const checkVerificationCode = async () => {
    if (!isEmailSent) return;
    try {
      await authAPI.checkCode(value, email);
      alert("인증 성공");
      setIsEmailSent(false);
    } catch (error) {
      alert("인증 실패");
    }
  };

  return (
    <>
      <div className="flex">
        <div className="w-[511px]">
          <InputWithLabel
            className="w-[511px]"
            label="인증번호"
            type="text"
            value={value}
            onChange={onChange}
          />
        </div>
        <div className="mt-auto ml-6 mb-1">
          <Button
            data-testid="sendEmail"
            type="button"
            size="sendEmail"
            color="white"
            onClick={checkVerificationCode}
          >
            확인
          </Button>
        </div>
      </div>
      <CountdownText isEmailSent={isEmailSent} resendClick={resendClick} />
    </>
  );
};

export default InputEmailCodeCheck;
