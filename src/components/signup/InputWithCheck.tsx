import React from "react";

import { TEXT_COLOR } from "@/constants/global/colors";

import InputWithLabel from "../designSystem/InputWithLabel";
import Button from "../designSystem/Button";

const styles = {
  checkDuplicateButton: `mt-auto ml-6 mb-1`,
  duplicationMsg: `-mt-[10px] select-none`,
};

interface InputWithCheckProps {
  type: "email" | "nickname";
  inputValue: {
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  setDuplicated: React.Dispatch<React.SetStateAction<boolean | null>>;
  onClick: () => void;
  isDuplicated: boolean | null;
}

const InputWithCheck: React.FC<InputWithCheckProps> = ({
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
            value={inputValue.value + ""}
            onChange={(e) => {
              inputValue.onChange(e);
              setDuplicated(null);
            }}
          />
        </div>
        <div className={styles.checkDuplicateButton}>
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
        <p className={`${styles.duplicationMsg} ${TEXT_COLOR.success}`}>
          {`사용 가능한 ${msgText} 입니다.`}
        </p>
      )}
      {isDuplicated && (
        <p className={`${styles.duplicationMsg} ${TEXT_COLOR.error}`}>
          {`이미 존재하는 ${msgText}입니다.다른 ${msgText}을 입력해주세요.`}
        </p>
      )}
    </>
  );
};

export default InputWithCheck;
