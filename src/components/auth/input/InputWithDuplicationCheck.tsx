import React from "react";

import Button from "../../designSystem/Button";
import ValidationText from "../text/ValidationText";

import InputWithLabel from "./InputWithLabel";

interface InputWithDuplicationCheckProps {
  type: "email" | "nickname";
  inputValue: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  setDuplicated: React.Dispatch<React.SetStateAction<boolean | null>>;
  onClick: () => void;
  isDuplicated: boolean | null;
}

const InputWithDuplicationCheck: React.FC<InputWithDuplicationCheckProps> = ({
  type,
  inputValue,
  setDuplicated,
  onClick,
  isDuplicated,
}) => {
  const labelText = type === "email" ? "E-mail" : "Nickname";
  const inputType = type === "email" ? "email" : "text";
  const msgText = type === "email" ? "이메일" : "닉네임";

  return (
    <>
      <div className="flex">
        <div className="w-[574px]">
          <InputWithLabel
            label={labelText}
            type={inputType}
            value={inputValue.value}
            onChange={(e) => {
              inputValue.onChange(e);
              setDuplicated(null);
            }}
          />
        </div>
        <div className="mt-auto ml-6 mb-1">
          <Button
            data-testid={`${type}Check`}
            type="button"
            size="tab"
            color="white"
            onClick={onClick}
          >
            중복 확인
          </Button>
        </div>
      </div>
      {isDuplicated === false && (
        <ValidationText
          text={`사용 가능한 ${msgText} 입니다.`}
          type="success"
        />
      )}
      {isDuplicated && (
        <ValidationText
          text={`이미 존재하는 ${msgText}입니다.다른 ${msgText}을 입력해주세요.`}
          type="error"
        />
      )}
    </>
  );
};

export default InputWithDuplicationCheck;
