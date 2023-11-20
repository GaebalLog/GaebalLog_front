import React from "react";

import { authAPI } from "@/config/api/authAPI";
import Button from "@/components/UI/buttons/base/Button";
import { utilErrorCase } from "@/utils/util-errorCase";

import ValidationText from "../text/ValidationText";

import InputWithLabel from "./InputWithLabel";

interface props {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  isEmailSent: boolean;
  isEmailValid: boolean;
  setIsEmailSent: React.Dispatch<React.SetStateAction<boolean>>;
  setResendClick: React.Dispatch<React.SetStateAction<number>>;
}

const InputWithSendEmail: React.FC<props> = ({
  value,
  onChange,
  isEmailSent,
  isEmailValid,
  setIsEmailSent,
  setResendClick,
}) => {
  const sendMail = async () => {
    try {
      await authAPI.sendEmail(value);
      if (!isEmailSent) setIsEmailSent(true);
      if (isEmailSent) setResendClick((prev) => prev + 1);
    } catch (error) {
      utilErrorCase((error as error).response.status);
    }
  };

  return (
    <div>
      <div className="flex">
        <div className="w-[511px]">
          <InputWithLabel
            label="E-mail"
            type="email"
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
            onClick={sendMail}
          >
            {isEmailSent ? "인증번호 재 발송" : "인증번호 발송"}
          </Button>
        </div>
      </div>
      {isEmailSent ? (
        <ValidationText
          text="이메일이 발송되었습니다."
          type="success"
          isHighlightColor={isEmailSent}
        />
      ) : (
        <ValidationText
          text="입력한 이메일은 잘못 된 형식입니다."
          type="default"
          isHighlightColor={!isEmailValid && value !== ""}
        />
      )}
    </div>
  );
};

export default InputWithSendEmail;
